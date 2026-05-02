// @ts-nocheck

import { defineType, defineField } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "gallery",
      title: "Gallery Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      options: { layout: "grid" },
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Bags", value: "bags" },
          { title: "Fashion", value: "fashion" },
          { title: "Foods", value: "foods" },
          { title: "Spices", value: "spices" },
          { title: "Teas and Herbs", value: "teas-and-herbs" },
          { title: "Others", value: "others" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "price",
      title: "Regular Price (₵)",
      type: "number",
      description:
        "The product's standard, non-sale price. Customers see this struck through when a Sale Price is set.",
      validation: (Rule) => Rule.required().min(0),
    }),

    defineField({
      name: "discountPrice",
      title: "Sale Price (₵)",
      type: "number",
      description:
        "Optional. The actual amount charged at checkout when set. Must be lower than the Regular Price to count as a discount.",
      validation: (Rule) =>
        Rule.min(0).custom((value, context) => {
          const price = (context.document as { price?: number } | undefined)?.price;
          if (value == null) return true;
          if (typeof price === "number" && value >= price) {
            return "Sale Price must be lower than Regular Price";
          }
          return true;
        }),
    }),

    defineField({
      name: "stockQuantity",
      title: "Stock Quantity",
      type: "number",
      validation: (Rule) => Rule.required().min(0).integer(),
      initialValue: 1,
    }),

    defineField({
      name: "sizes",
      title: "Available Sizes",
      type: "array",
      of: [{ type: "string" }],
      description:
        'Optional. Click "Add item" to add each size (e.g., S, M, L, XL for fashion).',
    }),

    defineField({
      name: "colors",
      title: "Available Colors",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),

    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "mainImage",
    },
  },
});
