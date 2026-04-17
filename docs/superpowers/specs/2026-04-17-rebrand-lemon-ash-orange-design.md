# Rebrand: Lemon Green, Ash, and Orange

**Date:** 2026-04-17
**Project:** Obaapa Essentials (Next.js + Tailwind e-commerce)
**Status:** Design approved, pending implementation plan

## Goal

Replace the current teal-dominant palette (`#14919B` across `blue`/`teal`/`seaBlue` tokens) with a warm, natural-wellness palette that matches the Obaapa Essentials brand identity.

**New palette:**
- **Orange** — primary CTAs (add-to-cart, buy now, key buttons)
- **Lemon green** — accents (badges, "new"/"sale" tags, success states, secondary highlights)
- **Ash** — neutral foundation (backgrounds, borders, body text)

## Approach: Token Remap + Semantic Aliases (Option C)

Redefine hex values under existing Tailwind token names in `tailwind.config.ts`. All 460+ utility class usages across 60+ component files change automatically — zero component edits required. Additionally introduce new semantic aliases (`primary`, `accent`, `neutral`) for future components.

**Why this approach:** instant visual rebrand, minimal diff, easy to revert, and provides a clean semantic foundation for future work without forcing a mass refactor today.

**Trade-off accepted:** existing token names (`bg-blue`, `bg-teal`) will be cosmetically misleading — `bg-blue` renders orange. This is documented but not fixed in this pass.

## Color Token Mapping

### Orange family (primary CTA — replaces teal/blue/seaBlue at `#14919B`)

| Token | New hex | Purpose |
|---|---|---|
| `blue.DEFAULT` / `teal.DEFAULT` / `seaBlue.DEFAULT` | `#F27430` | Primary orange |
| `blue.dark` / `teal.dark` / `seaBlue.dark` | `#C85A1F` | Deep orange — hover, pressed |
| `blue.light` / `seaBlue.light` | `#F89055` | Soft orange |
| `blue.light-2` | `#FAB285` | Softer tints |
| `blue.light-3` | `#FCCBA8` | |
| `blue.light-4` | `#FDDEC3` | |
| `blue.light-5` | `#FEEAD6` | |
| `blue.light-6` | `#FEF3E7` | Lightest — subtle backgrounds |

### Lemon green family (accent — replaces `green` at `#22AD5C`)

| Token | New hex | Purpose |
|---|---|---|
| `green.DEFAULT` | `#BEDB39` | Lemon green |
| `green.dark` | `#8FA822` | Olive lemon — hover, small text |
| `green.light` | `#CEE85F` | |
| `green.light-2` | `#D9EE82` | |
| `green.light-3` | `#E2F1A0` | |
| `green.light-4` | `#EAF4B8` | |
| `green.light-5` | `#F0F7D4` | |
| `green.light-6` | `#F6FAE6` | |

### Ash family (neutrals — replaces `dark`/`body`/`gray`/`meta`)

| Token | New hex | Purpose |
|---|---|---|
| `dark.DEFAULT` | `#2C2E36` | Ash dark — headings |
| `dark.2` | `#3E414B` | Subheadings |
| `dark.3` | `#565964` | Body text emphasis |
| `dark.4` | `#8A8D98` | Muted text |
| `dark.5` | `#B8BAC2` | Disabled / placeholder |
| `body` | `#6C6F7A` | Main body text |
| `gray.DEFAULT` | `#F4F5F6` | |
| `gray.1` | `#FAFAFB` | Page backgrounds |
| `gray.2` | `#F4F5F6` | Card backgrounds |
| `gray.3` | `#E5E6EA` | Borders |
| `gray.4` | `#D0D2D8` | Dividers |
| `gray.5` | `#9EA0A8` | Icon tint |
| `gray.6` | `#6C6F7A` | |
| `gray.7` | `#3E414B` | |
| `meta.DEFAULT` | `#F7F8FA` | Meta backgrounds |

### Yellow / red / orange (minor adjustments)

| Token | New hex | Notes |
|---|---|---|
| `yellow.DEFAULT` | `#E0C84A` | Muted gold — ratings, warnings |
| `red.*` | unchanged | Error states stay unambiguous |
| `orange.*` | unchanged (`#F27430`) | Already matches primary |

### New semantic aliases

```
primary.DEFAULT → #F27430
primary.dark    → #C85A1F
primary.light   → #F89055

accent.DEFAULT  → #BEDB39
accent.dark     → #8FA822
accent.light    → #CEE85F

neutral.DEFAULT → #6C6F7A
neutral.dark    → #2C2E36
neutral.light   → #F4F5F6
```

## Scope

### Files that change
1. **`tailwind.config.ts`** — redefine hex values under existing token names; add `primary`/`accent`/`neutral` aliases. Single source of truth for the rebrand.
2. **`src/app/css/style.css`** — ~10 `@apply` directives referencing `bg-teal`, `seaBlue-dark`, `teal-dark`, `green-light-5`, `ring-teal/20`. Values flow through the remap, but each needs visual review (carousel dots, range slider thumbs, dropdowns, focus rings).
3. **Hardcoded hex sweep** — grep `src/` for stray `#14919B`, `#0D7377`, `#1BA3A3`, `#22AD5C` literals and replace with new values.
4. **Email templates** (`src/app/api/emails/order-confirmation/route.ts`, `src/app/api/order-status-change/route.ts`, any other email routes) — replace inline hex in HTML strings so customer emails match the new brand.

### Files that do NOT change
- All 60+ component files using `bg-blue`, `text-teal`, `bg-green`, etc. — zero edits.
- Redux state, API routes (except email templates), Sanity schemas, data files.
- Images and product photos.
- `dark` mode token colors (site isn't using dark mode currently).

### Explicitly out of scope
- Logo and favicon replacement (requires new assets from user).
- Font changes (Euclid Circular A retained).
- Layout, spacing, or component structural changes.
- Dark mode rethinking.

## Implementation Order

1. Update `tailwind.config.ts` — redefine hex values, add semantic aliases.
2. Audit `src/app/css/style.css` — visually verify `@apply` rules still make sense.
3. Grep `src/` for hardcoded legacy hex values; replace with new palette.
4. Update email templates — replace inline hex in HTML strings.
5. Build, lint, and visually verify.

## Verification

### Build & type-check
- `npm run build` succeeds with no new errors.
- `npm run lint` clean.

### Visual smoke test (`npm run dev`)
- **Home:** hero, carousel dots, category grid, promo banner, newsletter popup.
- **Shop:** product grid, sale badges, add-to-cart buttons, filters, pagination.
- **Product details:** price, quantity buttons, tabs, reviews.
- **Cart + Checkout:** summary, coupon, payment method radio, place order CTA.
- **Auth:** sign-in/sign-up forms, validation states.
- **My Account / Orders:** tables, order status pills, edit flows.
- **Footer + Header:** nav hover, search, wishlist/cart icons.
- **Emails:** send test order confirmation and status change emails; confirm rendering.

### Accessibility
- **Orange on white:** `#F27430` against white scores ~3.8:1 (fails AA for small text). For CTAs with body-size white text, use `primary.dark` (`#C85A1F`) instead — passes AA at 4.9:1. Confirm during implementation and adjust component defaults if needed.
- **Lemon green on white:** `#BEDB39` fails contrast at small sizes. Restrict lemon green to: large text, icons, backgrounds (with dark text overlay), and badges with dark text on top. For small lemon-green text, use `green.dark` (`#8FA822`).
- **Ash body on white:** `#6C6F7A` on white scores 4.9:1 — passes AA.

## Risks & Mitigation

| Risk | Mitigation |
|---|---|
| A component uses a raw hex color we miss | Grep sweep for legacy hex values in step 3 |
| Email client rendering differs | Send real test emails before claiming done |
| Focus rings (`focus:ring-teal/20`) clash with orange CTAs | Verify focus states during smoke test; switch to `ring-neutral-dark/20` if jarring |
| Token name confusion later (`bg-blue` renders orange) | Accepted trade-off — document in repo; new code uses `primary`/`accent`/`neutral` aliases |

## Definition of Done

- Every surface in the smoke test renders with the new palette.
- Build and lint clean.
- No stray teal or old-green visible anywhere in the app.
- Email templates sent and visually confirmed.
- Semantic aliases (`primary`, `accent`, `neutral`) available for future components.
- Design doc committed.
