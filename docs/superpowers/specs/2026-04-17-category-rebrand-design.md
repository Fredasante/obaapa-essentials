# Category Rebrand — Obaapa Essentials

**Date:** 2026-04-17
**Status:** Approved (pending final spec review)

## Background

This repo started as the Hedlorm e-commerce template (decor + clothing sold in Ghana Cedis). It is being adapted into a new project, **Obaapa Essentials**, with a different product catalog: Fashion, Foods, Spices, Teas and Herbs, Others.

The user will create a new Sanity Studio for Obaapa Essentials and swap `projectId`/`dataset`/tokens out-of-band. The Hedlorm Sanity dataset is not touched. No product data migration is required.

## Goal

Adapt this codebase so the product schema, category data, and category-driven UI match the new 5-category model, with the simplest possible product form (one shape for every product, no conditional fields).

## Non-goals

- Brand name, logo, favicon — stays as Hedlorm placeholders, handled in a later round.
- Hero, testimonials, About, FAQ, email templates, metadata — out of scope for this pass.
- Sanity data migration — new studio, clean slate.
- Asset production — no new category images; reuse Unsplash placeholders.

## Design

### New category model

Flat, single `category` field with 5 values:

| Title           | Value             |
| --------------- | ----------------- |
| Fashion         | `fashion`         |
| Foods           | `foods`           |
| Spices          | `spices`          |
| Teas and Herbs  | `teas-and-herbs`  |
| Others          | `others`          |

No `productType`. No category-specific conditional fields. Every product uses the same form.

### Product schema — [src/sanity/schemas/product.ts](src/sanity/schemas/product.ts)

**Kept fields (unconditional):**
`name, slug, mainImage, gallery, category, price, discountPrice, stockQuantity, colors, sizes, description, createdAt`

**Removed fields:**
`productType, gender, dimensions, material, fragrance`

`sizes` becomes always-visible and optional (admin fills it in only when relevant, e.g., for Fashion).

The `category` field's `list` option is replaced with the 5 new values above.

### Category data — [src/data/categories.ts](src/data/categories.ts)

Replace all 12 entries with 5 new entries. Drop `type: "decor" | "clothing"` from the `Category` interface.

Layout (2-col mobile / 4-col desktop): one feature tile at 2-col × 2-row (Fashion), remaining four tiles at 1-col × 1-row each — the grid balances cleanly.

Images: use Unsplash URLs as placeholders, same pattern as today.

### Homepage grid — [src/components/Home/CategoryGrid.tsx](src/components/Home/CategoryGrid.tsx)

Remove the `type: "decor" | "clothing"` prop and the `.filter((c) => c.type === type)` call. The component renders whatever categories are imported from `@/data/categories`.

### Home page — [src/components/Home/index.tsx](src/components/Home/index.tsx)

Replace the two `<CategoryGrid type="clothing" />` and `<CategoryGrid type="decor" />` calls with a single `<CategoryGrid title="Shop by Category" subtitle="..." />`.

### Types — [src/types/product.ts](src/types/product.ts)

Remove `productType, gender, dimensions, material, fragrance` from the `Product` type. Keep `sizes, colors`.

### Queries — [src/sanity/groq.ts](src/sanity/groq.ts)

- Drop `productType, material, fragrance, dimensions, gender` from all projections: `allProductsQuery`, `productsByCategoryQuery`, `newArrivalsQuery`, `searchProductsQuery`, `paginatedProductsQuery`, `PRODUCT_BY_SLUG_QUERY`.
- Delete `materialsWithCountQuery` (material filter is gone).
- Keep `categoriesWithCountQuery`, `colorsWithCountQuery` as-is.

### Search — [src/lib/searchQueries.ts](src/lib/searchQueries.ts)

- Remove `material` from `SEARCH_PRODUCTS_WITH_FILTERS_QUERY` where-clauses and `SEARCH_COUNT_QUERY`.
- Remove `material` parameter from the `searchProducts` function signature and its internals.
- Remove `productType, gender, dimensions, material, fragrance` from projections.

### Shop sidebar — [src/components/ShopWithSidebar/CategoryDropdown.tsx](src/components/ShopWithSidebar/CategoryDropdown.tsx)

Reads categories dynamically via `getCategoriesWithCount`, so no direct code change is required. However, any sibling filter components in `src/components/ShopWithSidebar/` that filter by `material`, `dimensions`, `fragrance`, `gender`, or `productType` must be removed along with their usages in the sidebar assembly.

### Product detail page — [src/components/ShopDetails/index.tsx](src/components/ShopDetails/index.tsx)

Remove UI that displays `material`, `dimensions`, `fragrance`, `gender`, or `productType`. Keep `sizes` and `colors` displays.

### Callsite cleanup

Grep `src/` for `productType`, `material`, `fragrance`, `dimensions`, `gender` and remove remaining references. Known files to check based on prior exploration: [src/lib/productUtils.ts](src/lib/productUtils.ts), [src/app/api/emails/order-confirmation/route.ts](src/app/api/emails/order-confirmation/route.ts), [src/app/api/newsletter/route.ts](src/app/api/newsletter/route.ts), [src/app/(site)/(pages)/faq/page.tsx](src/app/(site)/(pages)/faq/page.tsx), [src/components/Footer/index.tsx](src/components/Footer/index.tsx), [src/components/AboutUs/AboutUs.tsx](src/components/AboutUs/AboutUs.tsx), [src/components/Home/Hero/Testimonials.tsx](src/components/Home/Hero/Testimonials.tsx).

Rule of thumb: if a removed field is used purely as a type-level reference or in a projection, delete the reference. If it drives user-facing copy in About/FAQ/Testimonials/Hero, leave the copy untouched (out of scope per non-goals) but ensure the code still compiles — e.g., remove field accesses that would fail at runtime. The line between "code cleanup" and "copy change" is: if the component renders strings like "flowers" or "dresses" in JSX, that's copy — leave it. If the component destructures `product.material`, that's code — remove it.

## Verification

- `npm run lint` passes.
- `npm run build` passes (no TypeScript errors from removed fields).
- Manual: load homepage in dev, confirm one grid of 5 categories renders, tiles link to `/search?category=<value>` for each.
- Manual: load `/shop` sidebar, confirm category filter shows the new 5 categories when products exist in the new Sanity dataset (will be empty until user populates new studio — acceptable).
- Manual: Sanity Studio loads and the product form shows the simplified schema with no conditional fields.

## Risks & unknowns

- **Empty dataset during development:** the new Sanity project will have zero products until the user populates it. Pages that query products will render empty states. This is expected; do not add fallback fixtures.
- **Copy references to old products:** Hero/About/FAQ/Testimonials strings about flowers/dresses are deliberately out of scope. The site will visibly still read "Hedlorm" / reference flowers in those places until the next round.
- **Shop sidebar material filter component:** its exact file path isn't confirmed yet — discovery happens during implementation via grep.
