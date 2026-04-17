import { Product } from "@/types/product";
import { client } from "./client";

// 🛍️ All products (newest first) - IN STOCK ONLY
export const allProductsQuery = `
  *[_type == "product" && stockQuantity > 0] | order(createdAt desc) {
    _id,
    name,
    slug,
    price,
    discountPrice,
    stockQuantity,
    category,
    description,
    isFeatured,
    "mainImageUrl": mainImage.asset->url
  }
`;

// 🏠 Products by Category - IN STOCK ONLY
export const productsByCategoryQuery = `
  *[_type == "product" && category == $category && stockQuantity > 0] | order(createdAt desc) {
    _id,
    name,
    slug,
    price,
    discountPrice,
    stockQuantity,
    category,
    description,
    isFeatured,
    "mainImageUrl": mainImage.asset->url
  }
`;

// ✅ New Arrivals - IN STOCK ONLY
export const newArrivalsQuery = `
  *[_type == "product" && stockQuantity > 0] | order(_createdAt desc)[0...12]{
    _id,
    name,
    slug,
    price,
    colors,
    discountPrice,
    stockQuantity,
    category,
    description,
    "mainImageUrl": mainImage.asset->url
  }
`;

// 🔍 Search by name - IN STOCK ONLY
export const searchProductsQuery = `
  *[_type == "product" && name match $search + "*" && stockQuantity > 0] | order(createdAt desc) {
    _id,
    name,
    slug,
    price,
    discountPrice,
    stockQuantity,
    category,
    colors,
    description,
    "mainImageUrl": mainImage.asset->url
  }
`;

// 🧭 Paginated products - IN STOCK ONLY
export const paginatedProductsQuery = `
  *[_type == "product" && stockQuantity > 0] | order(createdAt desc) [$start...$end] {
    _id,
    name,
    slug,
    price,
    discountPrice,
    stockQuantity,
    colors,
    category,
    isFeatured,
    description,
    "mainImageUrl": mainImage.asset->url
  }
`;

// Count in-stock products with optional category filter
export const productCountQuery = `count(*[_type == "product" && stockQuantity > 0 $categoryFilter])`;

// Categories with product count - IN STOCK ONLY
export const categoriesWithCountQuery = `
  *[_type == "product" && stockQuantity > 0] {
    category
  } | {
    "name": category,
    "products": count(*[_type == "product" && category == ^.category && stockQuantity > 0])
  }
`;

// Colors with count - IN STOCK ONLY
export const colorsWithCountQuery = `
  *[_type == "product" && defined(colors) && stockQuantity > 0] {
    colors
  }
`;

// Query to fetch a single product by slug (includes out of stock for viewing)
export const PRODUCT_BY_SLUG_QUERY = `
  *[_type == "product" && slug.current == $slug][0]{
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

// Function to fetch product by slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const product = await client.fetch<Product>(PRODUCT_BY_SLUG_QUERY, {
      slug,
    });
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// Query to get all IN-STOCK product slugs (for static generation)
export const ALL_PRODUCT_SLUGS_QUERY = `
  *[_type == "product" && stockQuantity > 0]{ "slug": slug.current }
`;
