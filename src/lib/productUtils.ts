import { client } from "@/sanity/client";

const categoryDisplayNames: Record<string, string> = {
  fashion: "Fashion",
  foods: "Foods",
  spices: "Spices",
  "teas-and-herbs": "Teas and Herbs",
  others: "Others",
};

export const formatCategoryName = (slug: string): string => {
  return (
    categoryDisplayNames[slug] ||
    slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
};

interface FetchProductsParams {
  page: number;
  perPage: number;
  category?: string;
  color?: string;
}

export const fetchPaginatedProducts = async ({
  page,
  perPage,
  category,
  color,
}: FetchProductsParams) => {
  const start = (page - 1) * perPage;
  const end = start + perPage;

  const filters: string[] = ["stockQuantity > 0"];

  if (category) filters.push(`category == "${category}"`);
  if (color) filters.push(`"${color}" in colors`);

  const filterString = `&& ${filters.join(" && ")}`;

  const productsQuery = `
    *[_type == "product" ${filterString}] | order(_createdAt desc) [$start...$end] {
      _id,
      name,
      slug,
      price,
      discountPrice,
      description,
      category,
      stockQuantity,
      isFeatured,
      "mainImageUrl": mainImage.asset->url
    }
  `;

  const countQuery = `count(*[_type == "product" ${filterString}])`;

  try {
    const [products, totalCount] = await Promise.all([
      client.fetch(productsQuery, { start, end }),
      client.fetch(countQuery),
    ]);

    return { products, totalCount };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [], totalCount: 0 };
  }
};

export const fetchCategories = async () => {
  const query = `
    *[_type == "product" && defined(category) && stockQuantity > 0] {
      category
    }
  `;

  try {
    const data = await client.fetch(query);

    if (!data || data.length === 0) {
      return [];
    }

    const categoryMap = new Map<string, number>();

    data.forEach((product: any) => {
      const category = product.category;
      if (category) {
        categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
      }
    });

    const categories = Array.from(categoryMap.entries()).map(
      ([value, count]) => ({
        name: value,
        displayName: formatCategoryName(value),
        products: count,
      }),
    );

    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const fetchColors = async () => {
  const query = `
    *[_type == "product" && defined(colors) && stockQuantity > 0] {
      colors
    }
  `;

  try {
    const data = await client.fetch(query);

    if (!data || data.length === 0) {
      return [];
    }

    const allColors = data.flatMap((item: any) => item.colors || []);
    const uniqueColors = Array.from(new Set(allColors)).sort();

    return uniqueColors.map((color: string) => ({
      name: color,
      products: data.filter((item: any) => item.colors?.includes(color)).length,
    }));
  } catch (error) {
    console.error("Error fetching colors:", error);
    return [];
  }
};
