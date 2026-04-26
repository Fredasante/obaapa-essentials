# About Us page redesign

**Date:** 2026-04-26
**Status:** approved (design)
**Affects:** `src/components/AboutUs/AboutUs.tsx`

## Goal

Replace the current generic, lightly-branded About Us page with one that does three things at once: tells the Obaapa Essentials story, showcases the five product categories, and earns trust with brand-specific differentiators (not stock e-commerce platitudes).

## Why now

The current page has three concrete problems:

1. **Off-brand hero image.** A Western interior-décor shelf from Unsplash — nothing Ghanaian, nothing about fashion / foods / spices / teas.
2. **Generic value props.** "Premium Quality / Fast Shipping / Customer Support" is the same boilerplate any e-commerce template ships with. It tells the visitor nothing about what makes Obaapa different.
3. **Old palette artifacts.** `text-seaBlue-dark` for accents and a `hover:bg-[#008B8B]` teal hover on the CTA — both are leftovers from before the lemon-ash-orange rebrand.

## Approach

Editorial split layout (chosen over hero-first and compact-zigzag alternatives). Smaller framed images blend with stock photography better than full-bleed heroes; density variety section-to-section keeps the eye moving without exhausting the scroll.

## Page structure

Seven sections, top to bottom:

### 1. Breadcrumb (kept)

Reuses `<Breadcrumb title="About Us" pages={["about"]} />`. No change. The breadcrumb already received the `pt-10 md:pt-14` top-padding bump in this branch.

### 2. Magazine story split

Two-column at `lg:`, single column on mobile (image stacks above text).

- **Left column (text):**
  - Small uppercase orange label: `Our Story` (`text-primary` token, `tracking-[1.5px]`, `text-xs`/`text-sm` semibold)
  - Headline: `Rooted in Ghana, made for everyday life` (`text-3xl md:text-4xl font-bold text-dark`)
  - Two paragraphs (the existing copy can be condensed):
    > Obaapa Essentials began as a love letter to Ghanaian craftsmanship — fabrics that carry pattern and history, foods that taste like home, spices and teas with names you grew up hearing.

    > Today we curate authentically African goods for everyday life. Every item is chosen for quality, origin, and the story it carries.
- **Right column (image):**
  - Tall portrait, `h-[400px] lg:h-[600px]`, `rounded-2xl overflow-hidden shadow-2xl`
  - Unsplash placeholder; suggested search: Ghanaian fashion / market / lifestyle. Pick one strong portrait-orientation photo. Comment in the JSX flagging it as a placeholder so the user can swap when real photography exists.

### 3. Stats / proof strip

Light gray band (`bg-[#F7F8FA]`), four columns on desktop, two on mobile, centered.

| Stat | Caption |
|---|---|
| **5** | Curated categories |
| **100%** | Ghana-sourced |
| **GH₵** | Local pricing & Paystack |
| **7d** | Customer support |

Numerals: `text-4xl md:text-5xl font-bold text-primary`. Captions: `text-sm text-gray-600`. Section padding: `py-12 md:py-16`.

This is the trust-builder. Concrete, brand-specific, no icons needed.

### 4. Categories grid

Header:

- Lemon-green label `What We Curate`
- Headline `Five categories, one philosophy`
- Centered, max-width container

Grid: reuse `categories` from [`src/data/categories.ts`](../../src/data/categories.ts). That data already includes curated Unsplash images per category, plus title and `subtext`. Don't duplicate.

Layout:

- `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6`
- Each card: square aspect (`aspect-[4/5]` or fixed height), Unsplash image as `next/image` with `fill`, dark gradient overlay bottom, white title + subtext on top of gradient.
- On hover: image `scale-105`, overlay deepens slightly.
- Click target: `<Link href={`/search?category=${value}`}>`. Match the existing pattern from [`src/components/Home/CategoryGrid.tsx`](../../src/components/Home/CategoryGrid.tsx). Do **not** invent a new `/shop?category=` URL — the shop page does not read URL params.

### 5. Why Obaapa — three brand promises

Light gray band (`bg-[#F7F8FA]`), centered intro then three cards.

Header:

- Orange label `Why Obaapa`
- Headline `Three things you can count on`

Cards (`grid-cols-1 md:grid-cols-3 gap-6`, white, rounded, soft border, soft hover shadow):

1. **Sourced in Ghana** — Every product is locally curated and traceable to origin. Not bulk imports rebranded.
2. **Curated, not stocked** — Hand-picked, small-batch items chosen for quality and character. We say no a lot.
3. **Pay & deliver, simply** — Cedis pricing, Paystack checkout, nationwide delivery. No surprises at the door.

Each card has a small numbered icon block (rounded square, primary or accent background) instead of generic SVG icons. Numbers `1`, `2`, `3` in white. Alternate primary/accent backgrounds so the row reads as a set.

### 6. Pull quote

Centered on white background, `py-16 md:py-20`. Italic, `text-xl md:text-2xl`, `text-dark`, `max-w-2xl mx-auto`.

> "The things we live with every day should carry a story — of the hands that made them and the soil they come from."

Below: `— Obaapa Essentials` (small uppercase, gray, tracking-wide). No founder name yet — keep it institutional voice until the user provides a real founder byline.

### 7. CTA banner

Full-width band, orange gradient (`bg-gradient-to-br from-primary to-primary-dark`), white text, centered.

- Heading: `Ready to shop the essentials?` (`text-3xl md:text-4xl font-bold`)
- Sub: `Explore our curated collection across fashion, foods, spices, teas, and wellness.`
- Button: solid white pill, primary-orange text, `Shop Collection →`. `<Link href="/shop">`.

Replaces the existing CTA which had the leftover teal hover bug.

## Palette / token usage

All accent colors use Tailwind brand tokens:

- Primary orange: `text-primary` / `bg-primary` / `bg-primary-dark` (`#F27430`, `#C85A1F`)
- Lemon green accent: `text-accent` / `bg-accent` (`#81C408`)
- Body: `text-dark` (`#2C2E36`)
- Section bands: `bg-[#F7F8FA]` (matches breadcrumb / shop / shop-detail)

Do **not** reintroduce `text-seaBlue-dark` or the `#008B8B` teal hover. Those are the bugs we're fixing.

## Imagery

Per the brainstorm, no real brand photography exists yet. Strategy:

- **Section 2 (story split):** one Unsplash placeholder, portrait orientation. Add an inline comment in JSX: `{/* TODO: replace with real brand photography when available */}`
- **Section 4 (categories):** reuse the curated Unsplash URLs already in [`src/data/categories.ts`](../../src/data/categories.ts). No new images needed.
- **Section 5 (why us):** no images. Number badges only.

If the chosen Unsplash hostname isn't already in `next.config.ts` `images.remotePatterns`, add it.

## Responsive behavior

- All text scales `text-3xl md:text-4xl` for headlines, `text-base md:text-lg` for body
- Section padding scales `py-12 md:py-16` (tighter than current `py-16 md:py-24` so the page doesn't feel cavernous)
- Grids: 1 col → 2 col → 3/5 col at md/lg breakpoints
- Container: `max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0` (matches every other page in the repo)

## Out of scope

- Real brand photography (placeholder only — flagged in code)
- Founder byline / signature (no name yet — institutional voice for now)
- Adding URL-param category filtering to the shop page (categories link to `/search?category=` which already works)
- Header / footer / global layout changes
- Any change to the contact / shop / shop-detail pages

## File scope

- **Modify:** [`src/components/AboutUs/AboutUs.tsx`](../../src/components/AboutUs/AboutUs.tsx) — full rewrite of the component body. Keep it as a single file (sections are presentational, no shared logic to factor out).
- **Possibly modify:** [`next.config.ts`](../../next.config.ts) — only if the hero image hostname isn't already allow-listed.
- **Read-only references:** [`src/data/categories.ts`](../../src/data/categories.ts), [`src/components/Home/CategoryGrid.tsx`](../../src/components/Home/CategoryGrid.tsx), [`src/components/Common/Breadcrumb.tsx`](../../src/components/Common/Breadcrumb.tsx), [`tailwind.config.ts`](../../tailwind.config.ts).

## Verification

- `npm run lint` clean
- `npm run build` clean
- Visually check at `/about` on `localhost:3000` (user runs the server) — desktop and mobile widths
- Confirm no `seaBlue-dark` or `#008B8B` references remain in the rewritten file
- Click each category card and confirm it routes to `/search?category=<slug>` and the search page filters correctly
- Click the CTA and confirm it routes to `/shop`
