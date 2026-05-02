import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { auth } from "@clerk/nextjs/server";
import crypto from "crypto";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
});

type IncomingBody = {
  intentId?: string;
  paystackReference?: string;
  customerInfo?: {
    fullName?: string;
    phone?: string;
    email?: string;
  };
  deliveryInfo?: {
    region?: string;
    city?: string;
    address?: string;
  };
};

type IntentItem = {
  productId: string;
  quantity: number;
  color?: string | null;
  size?: string | null;
  priceAtPurchase: number;
  productSnapshot: {
    name: string;
    price: number;
    discountPrice?: number | null;
    mainImageUrl?: string | null;
  };
};

type Intent = {
  _id: string;
  _rev: string;
  intentId: string;
  status: "open" | "consumed";
  items: IntentItem[];
  total: number;
  currency: string;
  expiresAt: string;
  paystackReference?: string;
  consumedByOrderId?: string;
};

const generateKey = () =>
  `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;

const generateOrderId = () =>
  `ORD-${Date.now()}-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;

const docIdForReference = (reference: string) =>
  `order-${reference.replace(/[^a-zA-Z0-9_-]/g, "-").toLowerCase()}`;

const fail = (status: number, message: string) =>
  NextResponse.json({ success: false, message }, { status });

type FailureContext = {
  docId: string;
  orderId: string;
  reference: string;
  customerInfo: {
    fullName: string;
    phone: string;
    email: string;
  };
  deliveryInfo: {
    region: string;
    city: string;
    address: string;
  };
  authUserId: string | null;
  paidAmount: number | null;
};

async function recordFailure(
  ctx: FailureContext,
  reason: string,
  details: Record<string, unknown> = {},
) {
  try {
    await client.createIfNotExists({
      _id: ctx.docId,
      _type: "order",
      orderId: ctx.orderId,
      customerInfo: {
        fullName: ctx.customerInfo.fullName,
        phone: ctx.customerInfo.phone,
        email: ctx.customerInfo.email,
        userId: ctx.authUserId,
      },
      deliveryInfo: ctx.deliveryInfo,
      items: [],
      pricing: {
        subtotal: 0,
        total: ctx.paidAmount ?? 0,
      },
      payment: {
        method: "paystack",
        status: "paid",
        paystackReference: ctx.reference,
        amount: ctx.paidAmount ?? 0,
        paidAt: new Date().toISOString(),
      },
      deliveryStatus: "payment_failed",
      failureReason: `${reason}: ${JSON.stringify(details)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Failed to persist payment failure record", {
      reference: ctx.reference,
      reason,
      err: err instanceof Error ? err.message : err,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as IncomingBody;

    const intentId = body.intentId;
    const customerInfo = body.customerInfo;
    const deliveryInfo = body.deliveryInfo;
    const reference = body.paystackReference;

    if (!intentId || typeof intentId !== "string") {
      return fail(400, "Missing checkout intent");
    }

    if (
      !customerInfo?.fullName?.trim() ||
      !customerInfo?.phone?.trim() ||
      !deliveryInfo?.region?.trim() ||
      !deliveryInfo?.city?.trim() ||
      !deliveryInfo?.address?.trim()
    ) {
      return fail(400, "Missing customer or delivery information");
    }

    if (!reference || typeof reference !== "string") {
      return fail(400, "Missing payment reference");
    }

    const intentQuery = `*[_type == "checkoutIntent" && intentId == $intentId][0]{
      _id,
      _rev,
      intentId,
      status,
      items,
      total,
      currency,
      expiresAt,
      paystackReference,
      consumedByOrderId
    }`;

    // First-pass intent read — used to validate currency / reference binding /
    // expiry up front. The authoritative state is re-read inside the retry
    // loop with _rev so the consume patch has a guard.
    const intentInitial = await client.fetch<Intent | null>(intentQuery, {
      intentId,
    });
    if (!intentInitial) {
      return fail(404, "Checkout intent not found");
    }

    if (intentInitial.paystackReference !== reference) {
      // Init binds a single reference per intent. If the callback's reference
      // doesn't match, this is exactly the substitution attack the binding
      // exists to block.
      return fail(403, "Payment reference does not match this checkout");
    }

    const docId = docIdForReference(reference);

    // Idempotent retry: if we already wrote the order doc for this Paystack
    // reference, return it (or its failure response) verbatim.
    const existing = await client.fetch<
      | {
          orderId?: string;
          accessToken?: string;
          deliveryStatus?: string;
        }
      | null
    >(`*[_id == $docId][0]{ orderId, accessToken, deliveryStatus }`, { docId });
    if (existing) {
      if (existing.deliveryStatus === "payment_failed") {
        return NextResponse.json(
          {
            success: false,
            message:
              "This payment could not be finalised. Please contact support with your payment reference.",
            paystackReference: reference,
          },
          { status: 409 },
        );
      }
      return NextResponse.json({
        success: true,
        orderId: existing.orderId,
        accessToken: existing.accessToken,
      });
    }

    if (intentInitial.status === "consumed") {
      // Same reference (we just verified above) but no order doc exists. That
      // shouldn't happen since the consume + create are in one transaction,
      // but if it does, the deterministic-_id create on retry will collapse.
      // Don't bail here — fall through.
    }

    // expiresAt is a soft TTL for cleaning up abandoned intents — it does NOT
    // gate finalisation. Once Paystack confirms payment for the bound
    // reference, the intent's invariants (price-locked, items-locked, ref-
    // bound) still hold and we owe the customer their order. Refusing here
    // would charge them with no Sanity record.

    if (intentInitial.currency !== "GHS") {
      return fail(500, "Checkout currency mismatch");
    }

    if (
      !Array.isArray(intentInitial.items) ||
      intentInitial.items.length === 0
    ) {
      return fail(500, "Checkout intent has no items");
    }

    // Verify the Paystack transaction server-side
    const paystackKey = process.env.PAYSTACK_SECRET_KEY;
    if (!paystackKey) {
      console.error("PAYSTACK_SECRET_KEY is not configured");
      return fail(500, "Payment verification unavailable");
    }

    const paystackRes = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${paystackKey}`,
          "Content-Type": "application/json",
        },
      },
    );
    const paystackJson = await paystackRes.json().catch(() => null);
    if (
      !paystackRes.ok ||
      !paystackJson?.data ||
      paystackJson.data.status !== "success"
    ) {
      return fail(402, "Payment was not successful");
    }
    const paidPesewas: number = paystackJson.data.amount;
    const paidCurrency: string = paystackJson.data.currency;
    const paidAt: string | null = paystackJson.data.paid_at ?? null;

    const { userId: authUserId } = await auth();

    const orderId = generateOrderId();
    const failureCtx: FailureContext = {
      docId,
      orderId,
      reference,
      customerInfo: {
        fullName: customerInfo.fullName.trim(),
        phone: customerInfo.phone.trim(),
        email: customerInfo.email?.trim() || "",
      },
      deliveryInfo: {
        region: deliveryInfo.region.trim(),
        city: deliveryInfo.city.trim(),
        address: deliveryInfo.address.trim(),
      },
      authUserId: authUserId ?? null,
      paidAmount: paidPesewas / 100,
    };

    if (paidCurrency !== "GHS") {
      console.error("Paystack currency mismatch", {
        intentId,
        reference,
        paidCurrency,
      });
      await recordFailure(failureCtx, "currency_mismatch", { paidCurrency });
      return fail(402, "Payment currency does not match order");
    }

    const expectedPesewas = Math.round(intentInitial.total * 100);
    if (Math.abs(paidPesewas - expectedPesewas) > 1) {
      console.error("Paystack amount does not match intent", {
        intentId,
        reference,
        paidPesewas,
        expectedPesewas,
      });
      await recordFailure(failureCtx, "amount_mismatch", {
        paidPesewas,
        expectedPesewas,
      });
      return fail(402, "Payment amount does not match order total");
    }

    // Stock validation against the intent's locked items, with bounded retry
    // on revision conflicts (intent OR product).
    const productIds = Array.from(
      new Set(intentInitial.items.map((i) => i.productId)),
    );
    type SanityProduct = { _id: string; _rev: string; name: string; stockQuantity: number };
    const productQuery = `*[_type == "product" && _id in $ids]{ _id, _rev, name, stockQuantity }`;

    const accessToken = crypto.randomBytes(24).toString("base64url");
    const now = new Date().toISOString();

    const MAX_TX_ATTEMPTS = 3;
    let lastTxError: unknown = null;

    for (let attempt = 1; attempt <= MAX_TX_ATTEMPTS; attempt++) {
      // Re-read intent each attempt so the consume patch can guard with the
      // freshest _rev. This is the gate that stops a second concurrent
      // callback (with a different reference) from also consuming.
      const intentLatest = await client.fetch<Intent | null>(intentQuery, {
        intentId,
      });
      if (!intentLatest) {
        return fail(404, "Checkout intent disappeared");
      }
      if (intentLatest.paystackReference !== reference) {
        // A different request bound this intent in between — refuse.
        return fail(403, "Checkout intent is bound to a different payment");
      }
      if (
        intentLatest.status === "consumed" &&
        intentLatest.consumedByOrderId &&
        intentLatest.consumedByOrderId !== orderId
      ) {
        // Another flow already finalised this intent. The deterministic
        // _id check above usually catches retries, but if we got here it
        // means a concurrent caller won — surface their order if we can.
        const winner = await client.fetch<
          {
            orderId?: string;
            accessToken?: string;
            deliveryStatus?: string;
          } | null
        >(`*[_id == $docId][0]{ orderId, accessToken, deliveryStatus }`, {
          docId,
        });
        if (winner && winner.deliveryStatus !== "payment_failed") {
          return NextResponse.json({
            success: true,
            orderId: winner.orderId,
            accessToken: winner.accessToken,
          });
        }
        return fail(409, "This checkout has already been used");
      }

      const products = await client.fetch<SanityProduct[]>(productQuery, {
        ids: productIds,
      });
      const productMap = new Map(products.map((p) => [p._id, p]));

      const missing: string[] = [];
      for (const productId of productIds) {
        if (!productMap.has(productId)) missing.push(productId);
      }
      if (missing.length > 0) {
        console.error("Product missing for paid order", {
          orderId,
          intentId,
          reference,
          missing,
        });
        await recordFailure(failureCtx, "product_missing", { missing });
        return fail(409, "One or more products in your order no longer exist");
      }

      // Aggregate quantities per productId (the intent may legitimately list
      // the same SKU on multiple lines for different color/size variants).
      const stockDecrements = new Map<
        string,
        { rev: string; quantity: number }
      >();
      for (const item of intentLatest.items) {
        const product = productMap.get(item.productId);
        if (!product) continue;
        const existing = stockDecrements.get(item.productId);
        if (existing) {
          existing.quantity += item.quantity;
        } else {
          stockDecrements.set(item.productId, {
            rev: product._rev,
            quantity: item.quantity,
          });
        }
      }

      const oversold: string[] = [];
      for (const [productId, { quantity }] of stockDecrements) {
        const product = productMap.get(productId);
        if (product && quantity > product.stockQuantity) {
          oversold.push(product.name);
        }
      }

      if (oversold.length > 0) {
        console.error("Stock insufficient for paid order", {
          orderId,
          intentId,
          reference,
          oversold,
        });
        await recordFailure(failureCtx, "oversold", { items: oversold });
        return NextResponse.json(
          {
            success: false,
            message:
              "Some items in your order ran out of stock during checkout. Your payment cleared — please contact support to arrange a refund or replacement.",
            oversold,
          },
          { status: 409 },
        );
      }

      const orderItems = intentLatest.items.map((item) => ({
        _key: generateKey(),
        product: { _ref: item.productId, _type: "reference" as const },
        productSnapshot: {
          name: item.productSnapshot.name,
          price: item.productSnapshot.price,
          discountPrice: item.productSnapshot.discountPrice ?? null,
          mainImageUrl: item.productSnapshot.mainImageUrl ?? null,
          color: item.color ?? null,
          size: item.size ?? null,
        },
        quantity: item.quantity,
        priceAtPurchase: item.priceAtPurchase,
      }));

      const orderDoc = {
        _id: docId,
        _type: "order" as const,
        orderId,
        customerInfo: {
          ...failureCtx.customerInfo,
          userId: authUserId ?? null,
        },
        deliveryInfo: failureCtx.deliveryInfo,
        items: orderItems,
        pricing: {
          subtotal: intentLatest.total,
          total: intentLatest.total,
        },
        payment: {
          method: "paystack",
          status: "paid",
          paystackReference: reference,
          amount: intentLatest.total,
          paidAt: paidAt ?? now,
        },
        deliveryStatus: "payment_received",
        accessToken,
        createdAt: now,
        updatedAt: now,
      };

      const transaction = client
        .transaction()
        .create(orderDoc)
        .patch(intentLatest._id, (patch) =>
          patch
            .ifRevisionId(intentLatest._rev)
            .set({
              status: "consumed",
              consumedByOrderId: orderId,
              consumedAt: now,
            }),
        );
      for (const [productId, { rev, quantity }] of stockDecrements) {
        transaction.patch(productId, (patch) =>
          patch.ifRevisionId(rev).dec({ stockQuantity: quantity }),
        );
      }

      try {
        await transaction.commit();
        return NextResponse.json({
          success: true,
          orderId,
          accessToken,
        });
      } catch (txError) {
        lastTxError = txError;

        const winner = await client.fetch<
          | {
              orderId?: string;
              accessToken?: string;
              deliveryStatus?: string;
            }
          | null
        >(`*[_id == $docId][0]{ orderId, accessToken, deliveryStatus }`, {
          docId,
        });
        if (winner && winner.deliveryStatus !== "payment_failed") {
          return NextResponse.json({
            success: true,
            orderId: winner.orderId,
            accessToken: winner.accessToken,
          });
        }

        console.warn("Order transaction attempt failed; will retry", {
          orderId,
          intentId,
          reference,
          attempt,
          error: txError instanceof Error ? txError.message : txError,
        });
      }
    }

    const message =
      lastTxError instanceof Error ? lastTxError.message : String(lastTxError);
    console.error("Order transaction failed after retries", {
      orderId,
      intentId,
      reference,
      attempts: MAX_TX_ATTEMPTS,
      error: message,
    });
    await recordFailure(failureCtx, "transaction_failed", {
      attempts: MAX_TX_ATTEMPTS,
      message,
    });
    return NextResponse.json(
      {
        success: false,
        message:
          "Payment cleared but we could not finalise your order. Please contact support with the payment reference.",
        paystackReference: reference,
      },
      { status: 500 },
    );
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create order",
      },
      { status: 500 },
    );
  }
}
