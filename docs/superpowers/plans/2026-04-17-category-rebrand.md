# Category Rebrand Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Switch this codebase's product model from the Hedlorm decor+clothing catalog to the Obaapa Essentials 5-category catalog (Fashion, Foods, Spices, Teas and Herbs, Others) with a simplified, flat product schema.

**Architecture:** One `category` string field with 5 allowed values replaces the existing `productType` + category two-level structure. Conditional fields (`gender`, `material`, `dimensions`, `fragrance`) are removed entirely. All product rows use the same form.

**Tech Stack:** Next.js 15 (App Router), Sanity CMS schemas, Redux Toolkit (cart/wishlist), TypeScript.

**Spec:** [docs/superpowers/specs/2026-04-17-category-rebrand-design.md](docs/superpowers/specs/2026-04-17-category-rebrand-design.md)

**Context for the engineer:**
- No test framework is configured in this repo. Verification per task uses `npm run lint` and (at the end) `npm run build`, plus manual smoke tests in the dev server.
- This project is NOT a git repository. Skip any `git add` / `git commit` instructions in the standard plan template.
- The user will create a new Sanity Studio and repoint `projectId`/`dataset`/tokens themselves. Do not touch `.env.local` or `src/sanity.config.ts`.
- Do NOT rewrite brand/copy in About, FAQ, Testimonials, Hero, email templates, footer. Leave Hedlorm copy alone. The rule-of-thumb: if it's JSX-rendered user-visible strings ("flowers", "dresses", "décor"), leave it. If it's code accessing a removed field (`product.material`), delete it.

---

## Task 1: Simplify the Sanity product schema

**Files:**
- Modify: `src/sanity/schemas/product.ts`

- [ ] **Step 1: Rewrite the schema file**

Replace the entire contents of `src/sanity/schemas/product.ts` with:

```typescript
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
      title: "Price (₵)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),

    defineField({
      name: "discountPrice",
      title: "Original Price Before Discount (₵)",
      type: "number",
      description:
        "Enter the original/higher price here. The 'Price' field above should be the actual selling price. If set and higher than Price, a discount badge will appear.",
      validation: (Rule) => Rule.min(0),
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
```

- [ ] **Step 2: Verify lint passes**

Run: `npm run lint`
Expected: no errors introduced by this change.

---

## Task 2: Update the Product TypeScript type

**Files:**
- Modify: `src/types/product.ts`

- [ ] **Step 1: Rewrite the type file**

Replace the entire contents of `src/types/product.ts` with:

```typescript
export type Product = {
  _id: string;
  name: string;
  slug: { current: string };
  mainImageUrl?: string;
  gallery?: { imageUrl: string }[];
  category: string;
  price: number;
  stockQuantity: number;
  discountPrice?: number;
  sizes?: string[];
  colors?: string[];
  description?: string | any[];
  isFeatured?: boolean;
  createdAt?: string;
};
```

- [ ] **Step 2: Verify lint passes**

Run: `npm run lint`
Expected: this step will surface compile errors in files that still reference the removed fields (`productType`, `gender`, `material`, `dimensions`, `fragrance`). That is expected — subsequent tasks will fix each callsite. Record the list of files that error for cross-reference.

---

## Task 3: Replace category data

**Files:**
- Modify: `src/data/categories.ts`

- [ ] **Step 1: Rewrite the categories file**

Replace the entire contents of `src/data/categories.ts` with:

```typescript
export interface Category {
  id: string;
  title: string;
  subtext: string;
  value: string;
  image: string;
  className?: string;
}

export const categories: Category[] = [
  {
    id: "1",
    title: "Fashion",
    subtext: "Style & Essentials",
    value: "fashion",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=1000&fit=crop",
    className: "col-span-2 md:col-span-2 md:row-span-2",
  },
  {
    id: "2",
    title: "Foods",
    subtext: "Pantry & Staples",
    value: "foods",
    image:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&h=800&fit=crop",
    className: "col-span-1 md:col-span-1 md:row-span-1",
  },
  {
    id: "3",
    title: "Spices",
    subtext: "Bold Flavors",
    value: "spices",
    image:
      "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=600&h=800&fit=crop",
    className: "col-span-1 md:col-span-1 md:row-span-1",
  },
  {
    id: "4",
    title: "Teas and Herbs",
    subtext: "Calm & Wellness",
    value: "teas-and-herbs",
    image:
      "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=800&h=600&fit=crop",
    className: "col-span-2 md:col-span-2 md:row-span-1",
  },
  {
    id: "5",
    title: "Others",
    subtext: "Hidden Gems",
    value: "others",
    image:
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&h=600&fit=crop",
    className: "col-span-2 md:col-span-2 md:row-span-1",
  },
];
```

- [ ] **Step 2: Verify lint passes**

Run: `npm run lint`
Expected: this file passes; may still have unrelated errors from Task 2.

---

## Task 4: Simplify the CategoryGrid component

**Files:**
- Modify: `src/components/Home/CategoryGrid.tsx`

- [ ] **Step 1: Remove the `type` prop and the filter**

Replace the entire contents of `src/components/Home/CategoryGrid.tsx` with:

```tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { categories } from "@/data/categories";

interface CategoryGridProps {
  title: string;
  subtitle: string;
}

export default function CategoryGrid({ title, subtitle }: CategoryGridProps) {
  const router = useRouter();

  const handleCategoryClick = (categoryValue: string) => {
    router.push(`/search?category=${categoryValue}`);
  };

  return (
    <section className="py-10 md:py-15">
      <div className="max-w-[1240px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-seaBlue-dark/10 text-seaBlue-dark text-xs font-semibold uppercase tracking-[0.15em] rounded-full mb-4">
            Collections
          </span>
          <h2 className="text-3xl md:text-[42px] font-bold text-dark leading-tight mb-5">
            {title}
          </h2>
          <div className="flex flex-col items-center gap-1 mb-5">
            <div className="w-10 h-[1.5px] bg-seaBlue-dark" />
            <div className="w-10 h-[1.5px] bg-seaBlue-dark" />
          </div>
          <p className="text-base md:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[250px]">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.value)}
              className={cn(
                "group relative cursor-pointer overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500",
                category.className,
              )}
            >
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md border border-white/10 text-white text-xs font-medium uppercase tracking-wider rounded-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {category.subtext}
                </span>
                <h3 className="text-white text-lg md:text-xl font-bold leading-tight group-hover:text-white/90 transition-colors">
                  {category.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify lint passes**

Run: `npm run lint`
Expected: this file passes.

---

## Task 5: Use a single category grid on the home page

**Files:**
- Modify: `src/components/Home/index.tsx`

- [ ] **Step 1: Replace the two-grid call with one**

Replace the entire contents of `src/components/Home/index.tsx` with:

```tsx
import React from "react";
// import Hero from "./Hero";
// import NewsletterPopup from "./NewsLetterPopup";
import AllProducts from "./AllProducts";
import CategoryGrid from "./CategoryGrid";
import { TestimonialsSection } from "./Hero/Testimonials";

const Home = () => {
  return (
    <main>
      {/* <NewsletterPopup /> */}
      {/* <Hero /> */}
      <AllProducts />
      <CategoryGrid
        title="Shop by Category"
        subtitle="Browse our curated selection across fashion, food, spices, teas, and more."
      />
      <TestimonialsSection />
    </main>
  );
};

export default Home;
```

- [ ] **Step 2: Verify lint passes**

Run: `npm run lint`
Expected: this file passes.

---

## Task 6: Clean up `productUtils.ts`

**Files:**
- Modify: `src/lib/productUtils.ts`

- [ ] **Step 1: Replace category display names, drop material filter, delete `fetchMaterials`**

Replace the entire contents of `src/lib/productUtils.ts` with:

```typescript
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
```

- [ ] **Step 2: Verify lint passes**

Run: `npm run lint`
Expected: this file passes. Any file that still imports `fetchMaterials` will error — those are fixed in Task 9.

---

## Task 7: Clean up GROQ queries

**Files:**
- Modify: `src/sanity/groq.ts`

- [ ] **Step 1: Remove removed-field projections and delete `materialsWithCountQuery`**

Open `src/sanity/groq.ts` and apply these edits:

1. In `allProductsQuery`, `productsByCategoryQuery`, `newArrivalsQuery`, `searchProductsQuery`, and `paginatedProductsQuery`: remove the `productType,` line from each projection.

2. In `PRODUCT_BY_SLUG_QUERY` projection: remove the lines `productType,`, `gender,`, `dimensions,`, `material,`, `fragrance,`.

3. Delete the entire `materialsWithCountQuery` export block:

   ```typescript
   // Materials with product count - IN STOCK ONLY
   export const materialsWithCountQuery = `
     *[_type == "product" && defined(material) && stockQuantity > 0] {
       material
     }
   `;
   ```

Leave the rest of the file (other queries, `getProductBySlug`, etc.) untouched.

- [ ] **Step 2: Verify lint passes**

Run: `npm run lint`
Expected: this file passes. Callsites that imported `materialsWithCountQuery` will error — grep confirms none exist (it's only referenced in this file today), so no further fix required.

---

## Task 8: Clean up search queries

**Files:**
- Modify: `src/lib/searchQueries.ts`

- [ ] **Step 1: Remove material filter and removed-field projections**

Replace the entire contents of `src/lib/searchQueries.ts` with:

```typescript
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
```

- [ ] **Step 2: Verify lint passes**

Run: `npm run lint`
Expected: this file passes. Callers that pass a `material` filter will error — those get fixed in Task 9 and Task 10.

---

## Task 9: Remove the material filter from the shop sidebar

**Files:**
- Modify: `src/components/ShopWithSidebar/index.tsx`
- Delete: `src/components/ShopWithSidebar/MaterialDropdown.tsx`

- [ ] **Step 1: Remove MaterialDropdown import, state, handler, and JSX**

In `src/components/ShopWithSidebar/index.tsx`:

1. Remove the import line: `import MaterialDropdown from "./MaterialDropdown";`
2. Remove the state: `const [selectedMaterial, setSelectedMaterial] = useState<string>("");`
3. Remove `material: selectedMaterial,` from the `fetchPaginatedProducts` call (around line 77).
4. Remove `selectedMaterial` from the effect's dependency array (line 86).
5. Remove the `handleMaterialChange` function (lines 94-99).
6. Remove `setSelectedMaterial("");` from `handleClearFilters` (line 110).
7. Remove the JSX line: `<MaterialDropdown onMaterialChange={handleMaterialChange} />`

The final `useEffect` dependency array should be: `[currentPage, perPage, selectedCategory, selectedColor]`.

- [ ] **Step 2: Delete the MaterialDropdown file**

Run: `rm src/components/ShopWithSidebar/MaterialDropdown.tsx`

- [ ] **Step 3: Verify lint passes**

Run: `npm run lint`
Expected: this module passes.

---

## Task 10: Remove material filter from SearchPage

**Files:**
- Modify: `src/components/Search/SearchPage.tsx`

- [ ] **Step 1: Remove material state, handler, import, and payload**

Open `src/components/Search/SearchPage.tsx` and apply these edits:

1. Line 6 — remove the import: `import MaterialDropdown from "@/components/ShopWithSidebar/MaterialDropdown";`
2. Line 32 — remove the state: `const [selectedMaterial, setSelectedMaterial] = useState<string>("");`
3. Line 89 — in the `searchProducts` options object, remove `material: selectedMaterial,`.
4. Lines 105 — remove `selectedMaterial,` from the effect's dependency array. The final array should be `[searchQuery, currentPage, perPage, selectedCategory, selectedColor]`.
5. Lines 115-120 — remove the `handleMaterialChange` function in its entirety.
6. Line 131 — remove `setSelectedMaterial("");` from `handleClearFilters`.
7. Search the rest of the file for any `<MaterialDropdown ... />` JSX tag and delete it. (If it's rendered alongside `<CategoryDropdown ... />` and `<ColorsDropdown ... />`, remove only the Material one.)

- [ ] **Step 2: Verify lint passes**

Run: `npm run lint`
Expected: this file passes.

---

## Task 11: Clean up the product detail page

**Files:**
- Modify: `src/components/ShopDetails/index.tsx`

- [ ] **Step 1: Remove removed-field UI and drop gender from cart payload**

Open `src/components/ShopDetails/index.tsx` and apply these edits:

1. In `handleAddToCart` (around line 47), remove the line `gender: product.gender || null,` from the `addItemToCart` payload.
2. Remove the entire "Gender (clothing only)" JSX block (lines 209-217):

   ```tsx
   {/* Gender (clothing only) */}
   {product.productType === "clothing" && product.gender && (
     <div className="flex items-center gap-3">
       <h3 className="text-lg font-semibold text-slate-500 whitespace-nowrap">
         Gender:
       </h3>
       <span className="text-dark capitalize">{product.gender}</span>
     </div>
   )}
   ```

3. Remove the "Material" JSX block (lines 219-227).
4. Remove the "Dimensions" JSX block (lines 229-237).
5. Remove the "Fragrance" JSX block (lines 239-247).

Leave Colors, Sizes, and the rest of the component untouched.

- [ ] **Step 2: Verify lint passes**

Run: `npm run lint`
Expected: this file passes.

---

## Task 12: Clean up QuickViewModal

**Files:**
- Modify: `src/components/Common/QuickViewModal.tsx`

- [ ] **Step 1: Remove gender from cart payload and material display**

Open `src/components/Common/QuickViewModal.tsx`:

1. Around line 67, in the `addItemToCart` call, remove the line `gender: product.gender || null,`.
2. Around lines 261-267, remove the Material display block:

   ```tsx
   {product.material && (
     ...
     <span className="text-dark">{product.material}</span>
   )}
   ```

If any other removed fields (`dimensions`, `fragrance`, `productType`, `gender`) are displayed in this file, remove those blocks too. Grep the file for these field names to confirm.

- [ ] **Step 2: Verify lint passes**

Run: `npm run lint`
Expected: this file passes.

---

## Task 13: Drop gender from the cart slice

**Files:**
- Modify: `src/redux/features/cart-slice.ts`

- [ ] **Step 1: Remove gender from cart item type and reducers**

Open `src/redux/features/cart-slice.ts`:

1. Remove `gender?: string;` from the `CartItem` type (line 15).
2. In the `addItemToCart` reducer, remove `gender,` from the destructured payload (line 43) and from the new item object constructed from it (line 69).

If `gender` is still referenced anywhere else in this file (e.g., matching logic for duplicate cart items), leave the existing match logic as-is but simply remove `gender` from the comparison — cart items are now de-duplicated by `_id + size + color` only.

- [ ] **Step 2: Verify lint passes**

Run: `npm run lint`
Expected: this file passes.

---

## Task 14: Drop gender from the order schema and order display

**Files:**
- Modify: `src/sanity/schemas/order.ts`
- Modify: `src/components/Orders/SingleOrder.tsx`
- Modify: `src/components/Orders/OrderDetails.tsx`
- Modify: `src/app/(site)/(pages)/order-success/page.tsx`
- Modify: `src/components/Checkout/index.tsx`

- [ ] **Step 1: Remove `gender` field from the Sanity order schema**

In `src/sanity/schemas/order.ts`, find line 105:

```typescript
{ name: "gender", type: "string" },
```

Delete this line.

- [ ] **Step 2: Remove `gender?: string;` from line-item type definitions**

In each of these files, find the `gender?: string;` inside the cart/order line item type and remove the line:

- `src/components/Orders/SingleOrder.tsx` (around line 34)
- `src/components/Orders/OrderDetails.tsx` (around line 26)
- `src/app/(site)/(pages)/order-success/page.tsx` (around line 39)

- [ ] **Step 3: Remove `gender` from the checkout payload**

In `src/components/Checkout/index.tsx` around line 77, remove the line `gender: item.gender || null,` from whatever object is being constructed (likely an order line item).

- [ ] **Step 4: Verify lint passes**

Run: `npm run lint`
Expected: all of the above files pass.

---

## Task 15: Final sweep for any remaining references

**Files:** (discovery)

- [ ] **Step 1: Grep for stragglers**

Run: `grep -r --include='*.ts' --include='*.tsx' -n -E 'productType|material|fragrance|dimensions|\bgender\b' src/`

Expected output: any remaining hits should fall into ONE of these allowed categories:

- Comments or string literals in copy (About, FAQ, Hero, Testimonials, Footer) — leave alone per non-goals.
- Word fragments inside unrelated identifiers or text (e.g., the word "material" inside a sentence about "finest materials" in About copy) — leave alone.

Any hit that is a real code reference to the removed fields (e.g., destructuring `product.material`, an object property `material:`, an interface field, a GROQ projection) must be removed. Apply an edit for each.

- [ ] **Step 2: Verify lint passes**

Run: `npm run lint`
Expected: no errors.

---

## Task 16: Full build and manual smoke test

**Files:** (verification only)

- [ ] **Step 1: Run the production build**

Run: `npm run build`
Expected: build succeeds with no TypeScript errors.

- [ ] **Step 2: Start the dev server**

Run: `npm run dev`

- [ ] **Step 3: Load the homepage**

Open `http://localhost:3000` in a browser. Verify:
- A single "Shop by Category" grid renders.
- Five tiles appear: Fashion (large feature), Foods, Spices, Teas and Herbs, Others.
- Clicking a tile navigates to `/search?category=<value>`.
- No console errors about undefined `productType`, `material`, etc.

- [ ] **Step 4: Load the shop page**

Open `http://localhost:3000/shop`. Verify:
- The sidebar shows Category and Colors filters — NO Material filter.
- The "Clean All" button does not throw.
- No console errors.

- [ ] **Step 5: Load the Sanity Studio**

Open `http://localhost:3000/admin`. Verify:
- Product form shows: Name, Slug, Main Image, Gallery, Category (dropdown with 5 new values), Price, Discount Price, Stock Quantity, Sizes, Colors, Description, Created At.
- No productType dropdown, no gender/material/dimensions/fragrance fields.

- [ ] **Step 6: Report completion**

Report: lint passes, build passes, all three smoke test pages render without errors, Sanity form matches the simplified schema. The site still shows "Hedlorm" brand, old copy in About/FAQ/Testimonials — that is expected (out of scope, next round).

---

## Notes for the engineer

- **Sanity Studio `@ts-nocheck`:** the product schema file starts with `// @ts-nocheck`. Keep it. This is existing practice in this repo.
- **Empty product catalog:** once schema changes land, the dev site will have zero products until the user points `.env.local` at the new Sanity project and adds products. Pages that query products will render empty states. Do not add stub fixtures.
- **Cart persistence:** cart state is persisted to localStorage (see `src/redux/store.ts`). Users with an existing cart may have stale `gender` keys in their local state; Redux will silently ignore unknown keys when reading back. No migration needed.
- **Don't split the Home page CategoryGrid section label text:** the single grid title says "Shop by Category" per the plan. If the user wants it reworded later, that's a copy round, not this round.
