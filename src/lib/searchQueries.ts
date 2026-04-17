// lib/sanity/searchQueries.ts

import { client } from "@/sanity/client";
import { Product } from "@/types/product";

export const SEARCH_PRODUCTS_QUERY = `
  *[_type == "product" && (
    name match $searchTerm + "*" ||
    pt::text(description) match $searchTerm + "*"
  )] | order(_createdAt desc) {
    _id,
    name,
    slug,
    "mainImageUrl": mainImage.asset->url,
    "gallery": gallery[]{
      "imageUrl": asset->url
    },
    category,
    price,
    discountPrice,
    stockQuantity,
    sizes,
    colors,
    description,
    isFeatured,
    createdAt
  }
`;

export const SEARCH_PRODUCTS_WITH_FILTERS_QUERY = `
  *[_type == "product" && stockQuantity > 0 &&
    ($searchTerm == "" || name match $searchTerm + "*" || pt::text(description) match $searchTerm + "*") &&
    ($category == "" || category == $category) &&
    ($color == "" || $color in colors)
  ] | order(_createdAt desc) [$start...$end] {
    _id,
    name,
    slug,
    "mainImageUrl": mainImage.asset->url,
    "gallery": gallery[]{
      "imageUrl": asset->url
    },
    category,
    price,
    discountPrice,
    stockQuantity,
    sizes,
    colors,
    description,
    isFeatured,
    createdAt
  }
`;

export const SEARCH_COUNT_QUERY = `
  count(*[_type == "product" && stockQuantity > 0 &&
    ($searchTerm == "" || name match $searchTerm + "*" || pt::text(description) match $searchTerm + "*") &&
    ($category == "" || category == $category) &&
    ($color == "" || $color in colors)
  ])
`;

export async function searchProducts(
  searchTerm: string,
  filters?: {
    category?: string;
    color?: string;
    page?: number;
    perPage?: number;
  },
): Promise<{ products: Product[]; totalCount: number }> {
  const {
    category = "",
    color = "",
    page = 1,
    perPage = 18,
  } = filters || {};

  const start = (page - 1) * perPage;
  const end = start + perPage;

  try {
    const [products, totalCount] = await Promise.all([
      client.fetch<Product[]>(SEARCH_PRODUCTS_WITH_FILTERS_QUERY, {
        searchTerm,
        category,
        color,
        start,
        end,
      }),
      client.fetch<number>(SEARCH_COUNT_QUERY, {
        searchTerm,
        category,
        color,
      }),
    ]);

    return { products, totalCount };
  } catch (error) {
    console.error("Error searching products:", error);
    return { products: [], totalCount: 0 };
  }
}
