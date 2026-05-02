import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/client";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }

    const order = await client.fetch(
      `*[_type == "order" && orderId == $orderId][0]{
        orderId,
        customerInfo,
        deliveryInfo,
        items,
        pricing,
        payment,
        deliveryStatus,
        confirmation,
        customerNotes,
        adminNotes,
        createdAt,
        updatedAt,
        deliveredAt,
        accessToken
      }`,
      { orderId }
    );

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const token = request.nextUrl.searchParams.get("token");
    const { userId } = await auth();

    const ownsByAuth =
      userId && order.customerInfo?.userId && userId === order.customerInfo.userId;
    const ownsByToken =
      order.accessToken && token && token === order.accessToken;

    if (!ownsByAuth && !ownsByToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { accessToken: _accessToken, ...safeOrder } = order;

    return NextResponse.json(safeOrder);
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { error: "Failed to fetch order details" },
      { status: 500 }
    );
  }
}
