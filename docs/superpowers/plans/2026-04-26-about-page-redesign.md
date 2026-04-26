# About Us Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace `src/components/AboutUs/AboutUs.tsx` with a seven-section editorial-split layout that tells the brand story, showcases the five categories, and earns trust with brand-specific differentiators.

**Architecture:** Single presentational component. Reuses `categories` from [`src/data/categories.ts`](../../src/data/categories.ts) (already has curated Unsplash imagery + slugs). Routes category cards to `/search?category=<slug>` matching the existing pattern in [`src/components/Home/CategoryGrid.tsx`](../../src/components/Home/CategoryGrid.tsx). All accent colors use the `primary` and `accent` Tailwind tokens defined in [`tailwind.config.ts`](../../tailwind.config.ts).

**Tech Stack:** Next.js 15.5 App Router, React 19, TypeScript (`strict: false`), Tailwind 3.3, `next/image` + `next/link`. No automated tests in this repo — verification is `npm run lint`, `npm run build`, plus manual UI check.

---

## Spec reference

[`docs/superpowers/specs/2026-04-26-about-page-redesign-design.md`](../specs/2026-04-26-about-page-redesign-design.md)

---

### Task 1: Replace AboutUs.tsx with the new seven-section layout

**Files:**
- Modify: `src/components/AboutUs/AboutUs.tsx`

**Notes for engineer:**
- The page wrapper (`src/app/(site)/(pages)/about/page.tsx`) does not change — it just renders `<AboutUs />`.
- Do NOT use `text-seaBlue-dark` or `bg-[#008B8B]` anywhere in the new code. Those are old palette artifacts we are explicitly removing.
- The hero photo URL in Section 2 is a placeholder — leave the `{/* TODO: replace ... */}` comment in place so it can be swapped when real brand photography exists.
- `next.config.js` already allow-lists both `images.unsplash.com` and `plus.unsplash.com`, so no config change is needed.

- [ ] **Step 1: Open the file and replace its entire contents with the code below.**

```tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "../Common/Breadcrumb";
import { categories } from "@/data/categories";

const promises = [
  {
    num: 1,
    bg: "bg-primary",
    title: "Sourced in Ghana",
    desc: "Every product is locally curated and traceable to origin — not bulk imports rebranded.",
  },
  {
    num: 2,
    bg: "bg-accent",
    title: "Curated, not stocked",
    desc: "Hand-picked, small-batch items chosen for quality and character. We say no a lot.",
  },
  {
    num: 3,
    bg: "bg-primary",
    title: "Pay & deliver, simply",
    desc: "Cedis pricing, Paystack checkout, nationwide delivery. No surprises at the door.",
  },
];

const AboutUs = () => {
  return (
    <>
      <Breadcrumb title={"About Us"} pages={["about"]} />

      {/* Section 2: Magazine story split */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="text-primary font-semibold tracking-[1.5px] uppercase text-xs sm:text-sm mb-3 block">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-6 leading-tight">
                Rooted in Ghana,
                <br />
                made for everyday life
              </h2>
              <div className="space-y-4 text-gray-600 text-base md:text-lg leading-relaxed">
                <p>
                  Obaapa Essentials began as a love letter to Ghanaian
                  craftsmanship — fabrics that carry pattern and history, foods
                  that taste like home, spices and teas with names you grew up
                  hearing.
                </p>
                <p>
                  Today we curate authentically African goods for everyday
                  life. Every item is chosen for quality, origin, and the story
                  it carries.
                </p>
              </div>
            </div>
            {/* TODO: replace with real brand photography when available */}
            <div className="relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1604336626863-e3a40d70d59e?q=80&w=1000&auto=format&fit=crop"
                alt="Ghanaian lifestyle"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Stats / proof strip */}
      <section className="bg-[#F7F8FA] py-12 md:py-16">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                5
              </div>
              <div className="text-sm md:text-base text-gray-600">
                Curated categories
              </div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                100%
              </div>
              <div className="text-sm md:text-base text-gray-600">
                Ghana-sourced
              </div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                GH₵
              </div>
              <div className="text-sm md:text-base text-gray-600">
                Local pricing &amp; Paystack
              </div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                7d
              </div>
              <div className="text-sm md:text-base text-gray-600">
                Customer support
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Categories grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
            <span className="text-accent font-semibold tracking-[1.5px] uppercase text-xs sm:text-sm mb-3 block">
              What We Curate
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark leading-tight">
              Five categories, one philosophy
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/search?category=${category.value}`}
                className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 aspect-[4/5]"
              >
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-white/80 text-xs uppercase tracking-wider mb-1 block">
                    {category.subtext}
                  </span>
                  <h3 className="text-white text-base md:text-lg font-bold leading-tight">
                    {category.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Why Obaapa — three brand promises */}
      <section className="bg-[#F7F8FA] py-12 md:py-16">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
            <span className="text-primary font-semibold tracking-[1.5px] uppercase text-xs sm:text-sm mb-3 block">
              Why Obaapa
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark leading-tight">
              Three things you can count on
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {promises.map((item) => (
              <div
                key={item.num}
                className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div
                  className={`w-10 h-10 ${item.bg} text-white rounded-lg flex items-center justify-center font-bold text-lg mb-5`}
                >
                  {item.num}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-dark mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Pull quote */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0 text-center">
          <blockquote className="text-xl md:text-2xl italic text-dark max-w-2xl mx-auto leading-relaxed mb-4">
            &ldquo;The things we live with every day should carry a story — of
            the hands that made them and the soil they come from.&rdquo;
          </blockquote>
          <div className="text-xs sm:text-sm text-gray-500 uppercase tracking-[2px]">
            — Obaapa Essentials
          </div>
        </div>
      </section>

      {/* Section 7: CTA banner */}
      <section className="bg-gradient-to-br from-primary to-primary-dark py-14 md:py-20">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to shop the essentials?
          </h2>
          <p className="text-white/95 text-base md:text-lg max-w-2xl mx-auto mb-8">
            Explore our curated collection across fashion, foods, spices, teas,
            and wellness — rooted in Ghana, made for you.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-bold rounded-lg hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Shop Collection
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
```

- [ ] **Step 2: Verify no leftover old-palette tokens.**

Run a grep over the file:

```bash
grep -E "seaBlue|008B8B|008b8b" src/components/AboutUs/AboutUs.tsx
```

Expected: no matches (exit code 1).

- [ ] **Step 3: Run lint.**

```bash
npm run lint
```

Expected: clean exit. If there are warnings about unused imports or unescaped entities, fix them inline. The two unescaped characters that matter in this component are `'` (use `&apos;` if any appear inside JSX text) and `"` (already using `&ldquo;` / `&rdquo;`).

- [ ] **Step 4: Run build.**

```bash
npm run build
```

Expected: clean exit. Watch for:
- `next/image` errors about unconfigured remote hostnames — should not happen since `images.unsplash.com` is already allow-listed.
- TypeScript errors — none expected (component uses only standard React props and the existing `categories` shape).

If the build fails on the placeholder Unsplash URL (e.g., 404 during static optimization), swap the URL in Section 2 for any working `images.unsplash.com` portrait — the existing `categories.ts` Foods URL `https://images.unsplash.com/photo-1701566619911-2dcb1e29b1dc?q=80&w=1074&auto=format&fit=crop` is a confirmed working fallback.

- [ ] **Step 5: Manual UI verification.**

The user runs `npm run dev` themselves on port 3000 (per CLAUDE.md). Ask them to reload `http://localhost:3000/about` and confirm:

1. Breadcrumb header reads "About Us" with the new top padding (already in place from a prior commit).
2. Story split renders side-by-side at desktop, stacked on mobile, with a non-décor lifestyle image.
3. Stats strip shows 5 / 100% / GH₵ / 7d in orange numerals on a light gray band.
4. Categories grid shows all five category cards with their existing imagery; clicking each routes to `/search?category=<slug>` and the search page filters correctly.
5. "Three things you can count on" cards show numbered orange/green/orange badges (no generic SVG icons).
6. Pull quote renders centered with italic text.
7. CTA banner is a solid orange gradient (NOT teal); white "Shop Collection" button routes to `/shop`.

If anything looks off, fix and re-run lint + build before committing.

- [ ] **Step 6: Commit.**

```bash
git add src/components/AboutUs/AboutUs.tsx
git commit -m "$(cat <<'EOF'
feat(about): redesign About Us with editorial-split layout

Replaces the off-brand décor hero and generic 'Premium Quality / Fast
Shipping / Customer Support' cards with seven sections that tell the
Obaapa story, showcase the five categories (reusing categories.ts), and
trade generic value props for brand-specific promises. Removes leftover
seaBlue-dark and #008B8B teal references from the prior palette.

Spec: docs/superpowers/specs/2026-04-26-about-page-redesign-design.md

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

Expected: commit lands on `main` cleanly. The pre-existing modifications to `Breadcrumb.tsx`, `ShopDetails/index.tsx`, and `data/categories.ts` are unrelated to this commit and should remain untracked here — only `src/components/AboutUs/AboutUs.tsx` gets staged.

---

## Self-review

**Spec coverage:**

| Spec section | Implementation |
|---|---|
| §1 Breadcrumb (kept) | Step 1 keeps `<Breadcrumb title="About Us" pages={["about"]} />` unchanged |
| §2 Magazine story split | Step 1 — two-column grid, orange "Our Story" label, 2 paragraphs, `h-[400px] lg:h-[600px]` portrait image with TODO comment |
| §3 Stats strip | Step 1 — `bg-[#F7F8FA]`, 4-up grid, `text-4xl md:text-5xl text-primary` numerals, 5/100%/GH₵/7d |
| §4 Categories grid | Step 1 — green "What We Curate" label, `grid-cols-2 md:grid-cols-3 lg:grid-cols-5`, maps over `categories` from data file, links to `/search?category=<value>` |
| §5 Why Obaapa promises | Step 1 — `bg-[#F7F8FA]` band, three white cards, alternating `bg-primary` / `bg-accent` numbered badges |
| §6 Pull quote | Step 1 — centered italic, `max-w-2xl`, `— Obaapa Essentials` byline |
| §7 CTA banner | Step 1 — `bg-gradient-to-br from-primary to-primary-dark`, white button, routes to `/shop` |
| Palette: no seaBlue-dark / #008B8B | Step 2 grep verifies |
| Verification: lint + build + manual | Steps 3, 4, 5 |

**Placeholder scan:** The only TODO in the plan is a JSX code comment instruction (an artifact intentionally placed in source for the user to swap later, not a plan-incomplete marker).

**Type consistency:** Categories data shape used (`id`, `title`, `subtext`, `value`, `image`) matches what's exported from `src/data/categories.ts` (verified by reading that file). The `promises` array is local to the component and self-consistent.
