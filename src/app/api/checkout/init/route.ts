import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import crypto from "crypto";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
});

const INTENT_TTL_MINUTES = 30;

type IncomingItem = {
  productId: string;
  quantity: number;
  color?: string | null;
  size?: string | null;
};

const fail = (status: number, message: string) =>
  NextResponse.json({ success: false, message }, { status });

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { items?: IncomingItem[] };
    const items = body.items;

    if (!Array.isArray(items) || items.length === 0) {
      return fail(400, "Cart is empty");
    }
    for (const item of items) {
      if (!item.productId || typeof item.productId !== "string") {
        return fail(400, "Invalid product in cart");
      }
      if (!Number.isInteger(item.quantity) || item.quantity < 1) {
        return fail(400, "Invalid quantity in cart");
      }
    }

    const productIds = Array.from(new Set(items.map((i) => i.productId)));
    type SanityProduct = {
      _id: string;
      name: string;
      price: number;
      discountPrice?: number | null;
      mainImageUrl?: string | null;
      stockQuantity: number;
    };
    const products = await client.fetch<SanityProduct[]>(
      `*[_type == "product" && _id in $ids]{
        _id,
        name,
        price,
        discountPrice,
        "mainImageUrl": mainImage.asset->url,
        stockQuantity
      }`,
      { ids: productIds },
    );
    const productMap = new Map(products.map((p) => [p._id, p]));

    const missing: string[] = [];
    const lockedItems = items.map((item) => {
      const product = productMap.get(item.productId);
      if (!product) {
        missing.push(item.productId);
        return null;
      }
      const unitPrice =
        product.discountPrice &&
        product.discountPrice > 0 &&
        product.discountPrice < product.price
          ? product.discountPrice
          : product.price;
      return {
        productId: product._id,
        quantity: item.quantity,
        color: item.color ?? null,
        size: item.size ?? null,
        priceAtPurchase: unitPrice,
        productSnapshot: {
          name: product.name,
          price: product.price,
          discountPrice: product.discountPrice ?? null,
          mainImageUrl: product.mainImageUrl ?? null,
        },
      };
    });

    if (missing.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "One or more products in your cart no longer exist",
          missing,
        },
        { status: 409 },
      );
    }

    // Stock check at intent time — refuse to issue a payable intent for a
    // cart that's already oversold, so the customer is warned before paying.
    // The hard check still runs at order-creation time after payment with
    // optimistic concurrency, since stock can change between init and create.
    const aggregated = new Map<string, number>();
    for (const item of lockedItems) {
      if (!item) continue;
      aggregated.set(
        item.productId,
        (aggregated.get(item.productId) ?? 0) + item.quantity,
      );
    }
    const oversold: string[] = [];
    for (const [productId, qty] of aggregated) {
      const product = productMap.get(productId);
      if (product && qty > product.stockQuantity) {
        oversold.push(product.name);
      }
    }
    if (oversold.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Some items in your cart are out of stock",
          oversold,
        },
        { status: 409 },
      );
    }

    const subtotal = lockedItems.reduce(
      (sum, it) => sum + (it ? it.priceAtPurchase * it.quantity : 0),
      0,
    );
    const total = subtotal;

    const intentId = crypto.randomBytes(16).toString("base64url");
    // Reference is server-issued and bound to the intent here. /api/orders/create
    // later requires the callback's reference to match this exact value, so a
    // leftover successful Paystack reference can't consume some other intent.
    const paystackReference = `PSK-${Date.now()}-${crypto
      .randomBytes(6)
      .toString("hex")
      .toUpperCase()}`;
    const now = new Date();
    const expiresAt = new Date(now.getTime() + INTENT_TTL_MINUTES * 60 * 1000);

    await client.create({
      _id: `intent-${intentId.toLowerCase().replace(/[^a-z0-9_-]/g, "-")}`,
      _type: "checkoutIntent",
      intentId,
      status: "open",
      items: lockedItems,
      subtotal,
      total,
      currency: "GHS",
      paystackReference,
      expiresAt: expiresAt.toISOString(),
      createdAt: now.toISOString(),
    });

    return NextResponse.json({
      success: true,
      intentId,
      paystackReference,
      total,
      currency: "GHS",
      expiresAt: expiresAt.toISOString(),
    });
  } catch (error) {
    console.error("Checkout init error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to start checkout" },
      { status: 500 },
    );
  }
}
