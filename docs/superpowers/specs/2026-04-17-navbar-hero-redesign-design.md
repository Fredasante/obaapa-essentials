# Navbar & Hero Redesign — Obaapa Essentials

**Date:** 2026-04-17
**Scope:** `src/components/Header/*` and `src/components/Home/Hero/*` (plus minor restyle of `HeroCategoryStrip`)
**Visual reference:** Fruitables HTML template (htmlcodex demo) — two-column hero, green utility bar, orange CTAs.

## Goal

Rebrand the site header and homepage hero from "Hedlorm / Home Décor" to **Obaapa Essentials** — a multi-category Ghanaian lifestyle store (Fashion, Foods, Spices, Teas & Herbs, Others). Adopt the Fruitables visual language using the palette already defined in `tailwind.config.ts` (`primary/orange #F27430` + `accent/green #BEDB39`). Fully responsive across `xsm 375` → `3xl 2000`.

## Non-goals

- No schema changes (Sanity, Redux, auth).
- No new colors — only reuse tokens already defined in `tailwind.config.ts`.
- No redesign of Footer, product cards, PDP, cart, or any page below the hero other than the `HeroCategoryStrip` restyle.
- No new logo asset — wordmark is text only.

## Structure

Three visual bands, top to bottom:

1. **Utility bar** — thin lemon-green strip. Left: "🚚 Free delivery on orders over ₵500". Right: "Privacy Policy / Terms / Shipping" link row. Hidden `<lg`.
2. **Main nav row** — white, sticky. Wordmark "Obaapa Essentials" · menu · search · wishlist · cart · auth avatar · hamburger (below `xl`).
3. **Hero** — two-column on `≥lg`, stacked on mobile. Left: kicker + heading + search + CTA. Right: orange category carousel card.
4. **Category strip** — existing `HeroCategoryStrip`, overlapping hero's bottom edge, restyled only.

## Files

**New:**
- `src/components/Header/UtilityBar.tsx` — server component, fixed copy + links.
- `src/components/Header/Wordmark.tsx` — text "Obaapa Essentials" as `<Link href="/">`. Prop: `size?: "sm" | "md"`.
- `src/components/Header/SearchOverlay.tsx` — client, full-screen search modal for `<xl`. Props: `{ open: boolean; onClose: () => void }`. Focus-traps, Esc closes.
- `src/components/Home/Hero/HeroCategoryCard.tsx` — client, Swiper-based orange card cycling through categories. Prop: `{ categories: Category[] }`.

**Modified:**
- `src/components/Header/index.tsx` — rebuild structure; keep sticky + outside-click logic; replace collapsible-below-nav with slide-in right drawer.
- `src/components/Header/menuData.ts` — trim to `Home / Shop / About / Contact`. Move `My Account` behind auth avatar, surface `Wishlist` as a standalone icon next to cart.
- `src/components/Home/Hero/index.tsx` — rebuild as two-column composition.
- `src/components/Home/HeroCategoryStrip.tsx` — restyle: green hover ring (`hover:border-accent`), softer shadow. No API change.

**Delete** (confirmed orphaned via `Grep` — zero imports):
- `src/components/Home/Hero/HeroCarousel.tsx`
- `src/components/Home/Hero/HeroFeature.tsx`

## Responsive behavior

Uses existing Tailwind screens: `xsm 375 · lsm 425 · sm 640 · md 768 · lg 1024 · xl 1280 · 3xl 2000`.

| Element | `<md` | `md`–`lg` | `≥lg` | `≥xl` |
|---|---|---|---|---|
| Utility bar | hidden | hidden | **visible** (36px, `py-2 text-xs`) | visible |
| Main nav | logo + icons + hamburger | same | same | **full row** with centered menu |
| Menu collapsed into | slide-in right drawer (280px, 280ms ease-out) | drawer | drawer | — |
| Search | icon → overlay | icon → overlay | icon → overlay | inline (max-w 420px) |
| Hero | single column, image-on-top (image 280px tall) | single column, image 360px | **two-column 58/42**, min-h 560px | two-column 58/42 |
| Category strip overlap | −48px | −64px | −80px | −80px |

**Tap targets:** all icon buttons ≥44×44px; nav links ≥40px min height.

## Color & typography

Palette roles (all tokens already exist in `tailwind.config.ts` — no new colors):

| Role | Token | Hex | Use |
|---|---|---|---|
| Primary | `primary` / `orange` | `#F27430` | CTAs, kicker, cart dot, active underline |
| Primary dark | `primary-dark` | `#C85A1F` | Hover / pressed |
| Primary soft (gradient) | `blue-light-3` → `blue-light` → `orange` | `#FCCBA8 → #F89055 → #F27430` | Hero right card bg |
| Accent | `accent` / `green` | `#BEDB39` | Wordmark, H1, utility-bar bg, hover ring |
| Accent dark | `accent-dark` | `#8FA822` | Utility-bar text, heading depth |
| Text | `dark` | `#2C2E36` | Body, menu labels |
| Muted text | `body` / `dark-4` | `#6C6F7A` / `#8A8D98` | Subhead, dividers |
| Surface | `white` / `gray-1` | `#FFF` / `#FAFAFB` | Nav bg, search bg |

**Typography** (existing `euclid-circular-a`):
- Wordmark: `text-2xl lg:text-3xl font-bold tracking-tight text-accent`.
- Utility bar: `text-xs font-medium text-accent-dark`.
- Nav links: `text-custom-sm font-medium text-dark` with orange 3px underline on active/hover via existing `before:` pattern.
- Hero kicker: `text-custom-lg font-semibold text-primary uppercase tracking-wide`.
- Hero heading: `text-4xl sm:text-5xl lg:text-heading-2 xl:text-heading-1 font-bold text-accent leading-tight`.
- Hero subhead: `text-custom-sm lg:text-base text-body leading-relaxed`.
- CTA button: `text-custom-sm font-semibold uppercase tracking-wider`.

**Accessibility:**
- Orange `#F27430` on white passes WCAG AA **only** at large-text sizes (≥18px bold / ≥24px regular). Body text stays `dark`; orange is reserved for CTAs, kicker, and large accents.
- Green `#BEDB39` on white fails body contrast. Used only at 24px+ bold (wordmark, hero heading).
- Drawer traps focus, Esc closes, hamburger has `aria-expanded`.
- Swiper carousel: prev/next have `aria-label`; slides announced via `aria-live="polite"`; autoplay disabled under `prefers-reduced-motion: reduce`.

## Motion

Uses already-installed `motion` and `swiper`:
- Mobile drawer: slide-in 280ms ease-out.
- Hero right card: Swiper fade+slide, autoplay 5s, pause on hover.
- Nav link underline: existing `before:` CSS transition, 200ms.
- Button hover: `scale 1 → 1.02`, bg transition 200ms.
- Sticky shadow: opacity fade 300ms (existing `stickyMenu` state kept).

## Content

**Wordmark:** plain text "**Obaapa Essentials**", lemon green, bold.

**Utility bar:**
- Left: "🚚 Free delivery on orders over ₵500"
- Right: `Privacy Policy / Terms / Shipping` (links to `/privacy`, `/terms`, `/shipping` — placeholders if pages don't exist yet)

**Hero:**
- Kicker: "Rooted in Ghana, Made for You"
- Heading: "Fashion, Flavor & Wellness — All in One Place"
- Subhead: "From handwoven pieces to pantry staples, everyday essentials with an authentically Ghanaian soul."
- CTA: "Shop Now" → `/shop`
- Search: reuses existing `SearchInput` component inline.

**Hero category card (right):** iterates `src/data/categories.ts`. Each slide: category image + title ("Fashion", etc.) + "Shop Category" CTA → `/search?category={value}`.

## Component contracts

- `UtilityBar` — no props. Server component.
- `Wordmark` — `{ size?: "sm" | "md" }`. Returns `<Link>` wrapping styled text.
- `Header` — client, same sticky + outside-click + drawer state.
- `SearchOverlay` — `{ open: boolean; onClose: () => void }`. Reuses `SearchInput` internals. Focus-trap, Esc closes.
- `Hero` — no props. Composes the left column + `HeroCategoryCard`.
- `HeroCategoryCard` — `{ categories: Category[] }`. Swiper with fade+slide, autoplay 5s, nav arrows, pagination dots, `prefers-reduced-motion` guard.
- `HeroCategoryStrip` — unchanged API.

**Data:** no schema changes. Uses existing `src/data/categories.ts` and `src/components/Header/menuData.ts` (trimmed).

## Verification

Manual, since this is UI:
1. `npm run dev` and open each breakpoint: **375, 425, 768, 1024, 1280, 1440**.
2. Mobile (`<xl`): hamburger opens right drawer; menu items visible; tapping an item closes drawer.
3. Mobile search: icon opens overlay; typing + category select routes to `/search?q=…&category=…`; Esc closes.
4. Desktop (`≥xl`): inline search works; cart badge shows count + ₵ total; avatar dropdown opens.
5. Hero carousel: autoplays every 5s; arrows work; pagination dots work; `prefers-reduced-motion` disables autoplay (test via DevTools emulation).
6. Sticky: scroll down — header shrinks, shadow fades in.
7. Category strip: overlaps hero at all breakpoints; green hover ring renders.
8. No TypeScript errors: `npm run lint`.
9. Build passes: `npm run build`.

## Out of scope / follow-ups

- Real `/privacy`, `/terms`, `/shipping` pages (utility bar links will 404 until these exist).
- Logo image asset (staying on text wordmark for now).
- Sanity-driven hero content (hard-coded for this pass; later migration possible).
- Removing deprecated `HeroCarousel.tsx` / `HeroFeature.tsx` — only delete after grep confirms no references.
