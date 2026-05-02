// @ts-nocheck

import { defineType, defineField } from "sanity";

export const order = defineType({
  name: "order",
  title: "Orders",
  type: "document",

  fields: [
    // 🆔 Order ID
    defineField({
      name: "orderId",
      title: "Order ID",
      type: "string",
      validation: (Rule) => Rule.required(),
      readOnly: true,
    }),

    // 👤 Customer Information
    defineField({
      name: "customerInfo",
      title: "Customer Information",
      type: "object",
      fields: [
        {
          name: "fullName",
          title: "Full Name",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "phone",
          title: "Phone Number",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "email",
          title: "Email",
          type: "string",
        },
        {
          name: "userId",
          title: "User ID (Clerk)",
          type: "string",
        },
      ],
    }),

    // 📍 Delivery Information
    defineField({
      name: "deliveryInfo",
      title: "Delivery Information",
      type: "object",
      fields: [
        {
          name: "region",
          title: "Region",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "city",
          title: "City/Town",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "address",
          title: "Delivery Address/Landmark",
          type: "text",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),

    // 🛒 Order Items
    defineField({
      name: "items",
      title: "Order Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "product",
              title: "Product",
              type: "reference",
              to: [{ type: "product" }],
              validation: (Rule) => Rule.required(),
            },
            {
              name: "productSnapshot",
              title: "Product Snapshot",
              type: "object",
              fields: [
                { name: "name", type: "string" },
                { name: "price", type: "number" },
                { name: "discountPrice", type: "number" },
                { name: "mainImageUrl", type: "string" },
                { name: "color", type: "string" },
                { name: "size", type: "string" },
              ],
            },
            {
              name: "quantity",
              title: "Quantity",
              type: "number",
              validation: (Rule) => Rule.required().min(1),
            },
            {
              name: "priceAtPurchase",
              title: "Price at Purchase",
              type: "number",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              productName: "productSnapshot.name",
              quantity: "quantity",
              price: "priceAtPurchase",
            },
            prepare({ productName, quantity, price }) {
              return {
                title: `${productName} x${quantity}`,
                subtitle: `GH₵${(price * quantity).toFixed(2)}`,
              };
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.custom((items, context) => {
          const status = (
            context.document as { deliveryStatus?: string } | undefined
          )?.deliveryStatus;
          if (status === "payment_failed") return true;
          if (!Array.isArray(items) || items.length === 0) {
            return "At least one item is required";
          }
          return true;
        }),
    }),

    // 💰 Pricing
    defineField({
      name: "pricing",
      title: "Order Total",
      type: "object",
      fields: [
        {
          name: "subtotal",
          title: "Subtotal",
          type: "number",
          validation: (Rule) => Rule.required().min(0),
        },
        {
          name: "total",
          title: "Total Amount",
          type: "number",
          validation: (Rule) => Rule.required().min(0),
        },
      ],
    }),

    // 💳 Payment
    defineField({
      name: "payment",
      title: "Payment",
      type: "object",
      fields: [
        {
          name: "method",
          title: "Payment Method",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "status",
          title: "Payment Status",
          type: "string",
          options: {
            list: [
              { title: "⏳ Pending", value: "pending" },
              { title: "✓ Paid", value: "paid" },
              { title: "✗ Failed", value: "failed" },
              { title: "↩ Refunded", value: "refunded" },
            ],
          },
          initialValue: "pending",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "paystackReference",
          title: "Paystack Reference",
          type: "string",
        },
        {
          name: "amount",
          title: "Amount Paid",
          type: "number",
        },
        {
          name: "paidAt",
          title: "Paid At",
          type: "datetime",
        },
      ],
    }),

    // 🚚 Delivery Status
    defineField({
      name: "deliveryStatus",
      title: "Delivery Status",
      type: "string",
      options: {
        list: [
          { title: "⏳ Payment Pending", value: "payment_pending" },
          { title: "✓ Payment Received", value: "payment_received" },
          { title: "📦 Preparing", value: "preparing" },
          { title: "🚚 Out for Delivery", value: "out_for_delivery" },
          { title: "✅ Delivered", value: "delivered" },
          { title: "❌ Cancelled", value: "cancelled" },
          {
            title: "⚠️ Payment Failed (needs refund)",
            value: "payment_failed",
          },
        ],
        layout: "dropdown",
      },
      initialValue: "payment_pending",
      validation: (Rule) => Rule.required(),
    }),

    // 🛟 Failure metadata for orders that paid but could not be finalised
    defineField({
      name: "failureReason",
      title: "Failure Reason",
      type: "string",
      description:
        "Set when deliveryStatus is payment_failed. Used by support to triage refunds.",
      hidden: ({ document }) =>
        (document as { deliveryStatus?: string } | undefined)
          ?.deliveryStatus !== "payment_failed",
    }),

    // 🕒 Timestamps
    defineField({
      name: "createdAt",
      title: "Order Date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "updatedAt",
      title: "Last Updated",
      type: "datetime",
    }),

    defineField({
      name: "deliveredAt",
      title: "Delivered At",
      type: "datetime",
    }),

    // 🔐 Guest access token — lets unauthenticated buyers view their own order
    defineField({
      name: "accessToken",
      title: "Access Token",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
  ],

  preview: {
    select: {
      orderId: "orderId",
      customerName: "customerInfo.fullName",
      total: "pricing.total",
      paymentStatus: "payment.status",
      deliveryStatus: "deliveryStatus",
      createdAt: "createdAt",
    },
    prepare({
      orderId,
      customerName,
      total,
      paymentStatus,
      deliveryStatus,
      createdAt,
    }) {
      const date = new Date(createdAt).toLocaleDateString("en-GB");
      const paymentIcon = paymentStatus === "paid" ? "✓" : "⏳";
      return {
        title: `${paymentIcon} ${orderId} - ${customerName}`,
        subtitle: `GH₵${total?.toFixed(2)} • ${deliveryStatus} • ${date}`,
      };
    },
  },
});
