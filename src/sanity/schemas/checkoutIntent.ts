// @ts-nocheck

import { defineType, defineField } from "sanity";

export const checkoutIntent = defineType({
  name: "checkoutIntent",
  title: "Checkout Intents",
  type: "document",
  liveEdit: false,
  fields: [
    defineField({
      name: "intentId",
      title: "Intent ID",
      type: "string",
      validation: (Rule) => Rule.required(),
      readOnly: true,
    }),

    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Open", value: "open" },
          { title: "Consumed", value: "consumed" },
        ],
      },
      initialValue: "open",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "items",
      title: "Items (server-locked)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "productId", type: "string" },
            { name: "quantity", type: "number" },
            { name: "color", type: "string" },
            { name: "size", type: "string" },
            { name: "priceAtPurchase", type: "number" },
            {
              name: "productSnapshot",
              type: "object",
              fields: [
                { name: "name", type: "string" },
                { name: "price", type: "number" },
                { name: "discountPrice", type: "number" },
                { name: "mainImageUrl", type: "string" },
              ],
            },
          ],
        },
      ],
      readOnly: true,
    }),

    defineField({
      name: "subtotal",
      title: "Subtotal",
      type: "number",
      readOnly: true,
    }),

    defineField({
      name: "total",
      title: "Total (server-locked)",
      type: "number",
      readOnly: true,
    }),

    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      initialValue: "GHS",
      readOnly: true,
    }),

    defineField({
      name: "paystackReference",
      title: "Paystack Reference",
      type: "string",
      description:
        "Issued by /api/checkout/init when this intent is created and bound to it. /api/orders/create requires the callback's reference to match this value.",
      readOnly: true,
    }),

    defineField({
      name: "consumedByOrderId",
      title: "Consumed by Order ID",
      type: "string",
      readOnly: true,
    }),

    defineField({
      name: "expiresAt",
      title: "Expires At",
      type: "datetime",
      readOnly: true,
    }),

    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      readOnly: true,
    }),

    defineField({
      name: "consumedAt",
      title: "Consumed At",
      type: "datetime",
      readOnly: true,
    }),
  ],

  preview: {
    select: {
      intentId: "intentId",
      status: "status",
      total: "total",
      createdAt: "createdAt",
    },
    prepare({ intentId, status, total, createdAt }) {
      const statusIcon =
        status === "consumed" ? "✓" : status === "open" ? "⏳" : "•";
      const date = createdAt
        ? new Date(createdAt).toLocaleString("en-GB")
        : "";
      return {
        title: `${statusIcon} ${intentId}`,
        subtitle: `GH₵${(total ?? 0).toFixed(2)} • ${date}`,
      };
    },
  },
});
