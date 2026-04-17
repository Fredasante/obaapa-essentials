# Rebrand to Lemon Green, Ash & Orange — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebrand the Obaapa Essentials site with orange (primary CTA), lemon green (accent), and ash (neutrals), replacing the current teal-dominant palette with zero component file edits for token-based usages.

**Architecture:** Redefine hex values under existing Tailwind token names (`blue`/`teal`/`seaBlue` → orange, `green` → lemon green, `dark`/`body`/`gray` → ash) in `tailwind.config.ts`. Add new semantic aliases (`primary`/`accent`/`neutral`) for future use. Then sweep hardcoded `#0D7377` literals in SVGs/spinners/email HTML and replace with the new orange-dark `#C85A1F`.

**Tech Stack:** Next.js 15, Tailwind CSS 3.3, React 19, TypeScript. No test suite exists — verification is build + lint + manual visual smoke test.

**Note on git:** The project is not a git repository. All commit steps are marked optional. If you want version control, run `git init` before starting.

---

## File Structure

### Files modified
- **`tailwind.config.ts`** — redefine color tokens, add semantic aliases. Single source of truth for palette.
- **`src/app/css/style.css`** — verify `@apply` references still look right; adjust focus rings if needed.
- **`src/app/api/emails/order-confirmation/route.ts`** — replace inline hex in HTML email template.
- **`src/app/api/order-status-change/route.ts`** — replace inline hex in HTML email template.
- **`src/app/api/newsletter/route.ts`** — replace inline hex in HTML email template.
- **Component files with hardcoded `#0D7377`** (SVGs and spinner colors):
  - `src/components/ShopWithSidebar/index.tsx`
  - `src/components/MyAccount/index.tsx`
  - `src/components/Orders/index.tsx`
  - `src/components/Checkout/index.tsx`
  - `src/components/Home/AllProducts/index.tsx`
  - `src/components/Home/NewArrivals/index.tsx`
  - `src/app/(site)/(pages)/faq/page.tsx`
  - `src/app/(site)/(pages)/search/page.tsx`
  - `src/app/(site)/(pages)/order-success/page.tsx`

### Files NOT modified
- All other 60+ component files using Tailwind color classes (`bg-blue`, `text-teal`, `bg-green`, etc.) — rebrand flows through token remap automatically.

---

## Task 1: Rebuild the Tailwind color palette

**Files:**
- Modify: `tailwind.config.ts` (entire `colors` block)

- [ ] **Step 1: Open `tailwind.config.ts` and replace the `colors` object**

Replace the existing `colors` object (lines 26–108) with the new palette. The `...colors` spread (default Tailwind colors) stays at the top, then overrides below.

Replace this block:

```typescript
colors: {
  ...colors,
  current: "currentColor",
  transparent: "transparent",
  white: "#FFFFFF",
  body: "#6C6F93",
  meta: {
    DEFAULT: "#F7F9FC",
    2: "#495270",
    3: "#606882",
    4: "#8D93A5",
    5: "#BBBEC9",
  },
  dark: {
    DEFAULT: "#1C274C",
    2: "#495270",
    3: "#606882",
    4: "#8D93A5",
    5: "#BBBEC9",
  },
  gray: {
    DEFAULT: "#F3F5F6",
    1: "#F9FAFB",
    2: "#F3F4F6",
    3: "#E5E7EB",
    4: "#D1D5DB",
    5: "#9CA3AF",
    6: "#6B7280",
    7: "#374151",
  },
  blue: {
    DEFAULT: "#14919B",
    dark: "#0D7377",
    light: "#1BA3A3",
    "light-2": "#48D1CC",
    "light-3": "#7FFFD4",
    "light-4": "#AFEEEE",
    "light-5": "#E0F2F1",
    "light-6": "#E0FFFF",
  },
  red: {
    DEFAULT: "#F23030",
    dark: "#E10E0E",
    light: "#F56060",
    "light-2": "#F89090",
    "light-3": "#FBC0C0",
    "light-4": "#FDD8D8",
    "light-5": "#FEEBEB",
    "light-6": "#FEF3F3",
  },
  seaBlue: {
    DEFAULT: "#14919B",
    dark: "#0D7377",
    light: "#1BA3A3",
  },
  green: {
    DEFAULT: "#22AD5C",
    dark: "#1A8245",
    light: "#2CD673",
    "light-2": "#57DE8F",
    "light-3": "#82E6AC",
    "light-4": "#ACEFC8",
    "light-5": "#C2F3D6",
    "light-6": "#DAF8E6",
  },
  yellow: {
    DEFAULT: "#FBBF24",
    dark: "#F59E0B",
    "dark-2": "#D97706",
    light: "#FCD34D",
    "light-1": "#FDE68A",
    "light-2": "#FEF3C7",
    "light-4": "#FFFBEB",
  },
  teal: {
    DEFAULT: "#14919B",
    dark: "#0D7377",
  },
  orange: {
    DEFAULT: "#F27430",
    dark: "#E1580E",
  },
},
```

With this new block:

```typescript
colors: {
  ...colors,
  current: "currentColor",
  transparent: "transparent",
  white: "#FFFFFF",

  // Ash neutrals (was dark/body/gray/meta)
  body: "#6C6F7A",
  meta: {
    DEFAULT: "#F7F8FA",
    2: "#3E414B",
    3: "#565964",
    4: "#8A8D98",
    5: "#B8BAC2",
  },
  dark: {
    DEFAULT: "#2C2E36",
    2: "#3E414B",
    3: "#565964",
    4: "#8A8D98",
    5: "#B8BAC2",
  },
  gray: {
    DEFAULT: "#F4F5F6",
    1: "#FAFAFB",
    2: "#F4F5F6",
    3: "#E5E6EA",
    4: "#D0D2D8",
    5: "#9EA0A8",
    6: "#6C6F7A",
    7: "#3E414B",
  },

  // Orange family (primary CTA — was teal/blue/seaBlue)
  blue: {
    DEFAULT: "#F27430",
    dark: "#C85A1F",
    light: "#F89055",
    "light-2": "#FAB285",
    "light-3": "#FCCBA8",
    "light-4": "#FDDEC3",
    "light-5": "#FEEAD6",
    "light-6": "#FEF3E7",
  },
  seaBlue: {
    DEFAULT: "#F27430",
    dark: "#C85A1F",
    light: "#F89055",
  },
  teal: {
    DEFAULT: "#F27430",
    dark: "#C85A1F",
  },
  orange: {
    DEFAULT: "#F27430",
    dark: "#C85A1F",
  },

  // Lemon green family (accent — was green)
  green: {
    DEFAULT: "#BEDB39",
    dark: "#8FA822",
    light: "#CEE85F",
    "light-2": "#D9EE82",
    "light-3": "#E2F1A0",
    "light-4": "#EAF4B8",
    "light-5": "#F0F7D4",
    "light-6": "#F6FAE6",
  },

  // Harmonized supporting colors
  yellow: {
    DEFAULT: "#E0C84A",
    dark: "#C4AC2E",
    "dark-2": "#A8931F",
    light: "#E8D569",
    "light-1": "#EFE098",
    "light-2": "#F6EDC5",
    "light-4": "#FCF8E6",
  },
  red: {
    DEFAULT: "#F23030",
    dark: "#E10E0E",
    light: "#F56060",
    "light-2": "#F89090",
    "light-3": "#FBC0C0",
    "light-4": "#FDD8D8",
    "light-5": "#FEEBEB",
    "light-6": "#FEF3F3",
  },

  // Semantic aliases for new code
  primary: {
    DEFAULT: "#F27430",
    dark: "#C85A1F",
    light: "#F89055",
  },
  accent: {
    DEFAULT: "#BEDB39",
    dark: "#8FA822",
    light: "#CEE85F",
  },
  neutral: {
    DEFAULT: "#6C6F7A",
    dark: "#2C2E36",
    light: "#F4F5F6",
  },
},
```

- [ ] **Step 2: Verify the file compiles**

Run: `npx tsc --noEmit`
Expected: No errors from `tailwind.config.ts`. (Pre-existing errors in other files are acceptable; just confirm no new errors were introduced here.)

- [ ] **Step 3: Start the dev server and verify the home page renders**

Run: `npm run dev`
Open: `http://localhost:3000`
Expected: Site loads. Header, hero, product cards now use orange where teal used to be. Lemon green replaces the old green on badges/accents. Ash tones on text/backgrounds.

Take a quick screenshot of the home page for reference before moving on.

- [ ] **Step 4: Commit (optional — skip if not using git)**

```bash
git add tailwind.config.ts
git commit -m "rebrand: remap Tailwind palette to orange/lemon/ash"
```

---

## Task 2: Audit `style.css` for visual regressions

Some `@apply` rules in `style.css` use the old token names. The values flow through the remap, but a few spots need visual review. Nothing to change unless you see a visual problem.

**Files:**
- Review: `src/app/css/style.css`
- Modify if needed: same file

- [ ] **Step 1: With dev server running, visually check these elements**

Visit each page and confirm each element renders acceptably:

| Element | Page | CSS rule | Check |
|---|---|---|---|
| Hero carousel pagination dots | Home `/` | `.hero-carousel .swiper-pagination-bullet-active` (line 123) | Active dot is orange, looks intentional |
| Common carousel arrows | Home (product carousels) | `.common-carousel .swiper-button-next/prev:hover` (line 137) | Hover state uses orange — looks fine |
| Price range slider track | Shop with filters `/shop-with-sidebar` | `.priceSlide .noUi-connect` (line 160) | Track is orange |
| Price range slider thumb | Same | `.priceSlide .noUi-handle:before` (line 163) | Inner dot is orange-dark |
| Range slider (alternate) | Shop sidebar | `.range-slider__range` (line 196) and `.range-slider__thumb::after` (line 192) | Orange |
| Custom select focus ring | Checkout `/checkout`, shop filter | `.custom-select-common .select-selected` focus (line 108) — `focus:ring-teal/20` | Orange-tinted focus ring — acceptable or too warm? |

- [ ] **Step 2: If the focus ring looks jarring, switch it to neutral**

Only if step 1 shows the `focus:ring-teal/20` orange tint clashes with orange buttons:

Open `src/app/css/style.css` line 108. Replace:

```css
.custom-select-common .select-selected {
  @apply bg-gray-1 rounded-md !border-r text-dark-4 py-3 pl-5 pr-9 duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-teal/20;
}
```

With:

```css
.custom-select-common .select-selected {
  @apply bg-gray-1 rounded-md !border-r text-dark-4 py-3 pl-5 pr-9 duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-dark/20;
}
```

Also update `shadow-input` in `tailwind.config.ts` if the inset teal ring looks wrong. Line 259:

Replace:
```typescript
input: "inset 0 0 0 2px #14919B",
```

With:
```typescript
input: "inset 0 0 0 2px #F27430",
```

- [ ] **Step 3: Re-verify the focus ring (if changed)**

Reload the checkout page and tab into a select input. Expected: Focus ring is subtle and readable.

- [ ] **Step 4: Commit (optional)**

```bash
git add src/app/css/style.css tailwind.config.ts
git commit -m "rebrand: update focus rings and input shadow to new palette"
```

---

## Task 3: Replace hardcoded `#0D7377` in component spinners and SVGs

Tailwind classes can't reach JSX prop values like `<ClipLoader color="#0D7377" />` or SVG `stroke="#0D7377"`. Replace each with the new orange-dark `#C85A1F`.

**Files:**
- Modify: `src/components/ShopWithSidebar/index.tsx:277`
- Modify: `src/components/MyAccount/index.tsx:120, 135, 247`
- Modify: `src/components/Orders/index.tsx:90`
- Modify: `src/components/Checkout/index.tsx:211`
- Modify: `src/components/Home/AllProducts/index.tsx:54, 59, 82, 102, 108, 112, 116`
- Modify: `src/components/Home/NewArrivals/index.tsx:56, 61, 84`
- Modify: `src/app/(site)/(pages)/faq/page.tsx:106`
- Modify: `src/app/(site)/(pages)/search/page.tsx:20`
- Modify: `src/app/(site)/(pages)/order-success/page.tsx:117`

- [ ] **Step 1: Replace every `#0D7377` in these files with `#C85A1F`**

For each file listed above, find every occurrence of the string `#0D7377` and replace with `#C85A1F`. These are all string literals inside JSX props (`color="..."`, `stroke="..."`, `fill="..."`) — safe to replace verbatim.

Use the Edit tool with `replace_all: true` per file. For example in `src/components/Home/AllProducts/index.tsx`:

```
old_string: "#0D7377"
new_string: "#C85A1F"
replace_all: true
```

Do this once per file listed above.

- [ ] **Step 2: Verify no `#0D7377` remains in `src/`**

Run: Use the Grep tool with pattern `#0D7377` on `src/`.
Expected: No matches. (Email template files handled in Task 4 — if those still match, that's expected at this point.)

Actually, Task 3 covers components only. Email templates in `src/app/api/*` still contain `#0D7377` and will be handled next. So expected output: only `src/app/api/newsletter/route.ts`, `src/app/api/emails/order-confirmation/route.ts`, and `src/app/api/order-status-change/route.ts` still match.

- [ ] **Step 3: Restart dev server and smoke test loader spinners**

Run: restart `npm run dev` if already running.
Visit: `/my-account`, `/orders`, `/checkout`, `/search`, `/order-success`, `/faq`, and home page.
Expected: When a loader is visible, it spins in orange-dark (not teal).

- [ ] **Step 4: Commit (optional)**

```bash
git add src/components src/app/\(site\)
git commit -m "rebrand: replace hardcoded teal hex in component spinners and SVGs"
```

---

## Task 4: Update email templates

Three API routes render HTML email bodies with inline hex colors. Email clients don't support Tailwind, so these need manual updates.

**Files:**
- Modify: `src/app/api/emails/order-confirmation/route.ts`
- Modify: `src/app/api/order-status-change/route.ts`
- Modify: `src/app/api/newsletter/route.ts`

- [ ] **Step 1: Read each email template to see current color usage**

Read each of the three files above. Look for inline `style="..."` attributes with these colors:
- `#0D7377` (old teal-dark)
- `#14919B` (old teal — may not appear, but check)
- Any other hardcoded brand colors

- [ ] **Step 2: Replace `#0D7377` with `#C85A1F` in all three email files**

Use Edit with `replace_all: true` on each file:

File: `src/app/api/emails/order-confirmation/route.ts`
```
old_string: "#0D7377"
new_string: "#C85A1F"
replace_all: true
```

File: `src/app/api/order-status-change/route.ts`
```
old_string: "#0D7377"
new_string: "#C85A1F"
replace_all: true
```

File: `src/app/api/newsletter/route.ts`
```
old_string: "#0D7377"
new_string: "#C85A1F"
replace_all: true
```

- [ ] **Step 3: Check for any other legacy hex values in email templates**

Run Grep pattern `#14919B|#1BA3A3|#22AD5C|#1A8245|#2CD673` on `src/app/api/`.
Expected: No matches. If matches appear, replace each with the new-palette equivalent:
- `#14919B` → `#F27430`
- `#1BA3A3` → `#F89055`
- `#22AD5C` → `#BEDB39`
- `#1A8245` → `#8FA822`
- `#2CD673` → `#CEE85F`

- [ ] **Step 4: Trigger a test email to verify rendering**

Pick the fastest path you have to a real email render:

Option A — newsletter endpoint (usually simplest):
```bash
curl -X POST http://localhost:3000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"your-test-email@example.com"}'
```

Option B — place a test order through the normal checkout flow in the browser with a test email. This triggers the order-confirmation template.

Expected: Email arrives. Header/CTA background is orange (`#F27430` primary or `#C85A1F` dark). No teal anywhere. Send to Gmail and check both desktop and mobile view.

If you can't send real emails right now, do a visual check by rendering the HTML string in a browser:
1. Copy the HTML string returned by the API route
2. Save it as `test-email.html`
3. Open in a browser

- [ ] **Step 5: Commit (optional)**

```bash
git add src/app/api
git commit -m "rebrand: update email templates to new orange palette"
```

---

## Task 5: Full build & visual QA sweep

Final verification that nothing is broken and no teal/old-green has leaked through.

**Files:** No edits expected unless a regression is found.

- [ ] **Step 1: Run a clean production build**

Run: `npm run build`
Expected: Build completes successfully. Any pre-existing warnings are acceptable; no new errors related to the color changes.

- [ ] **Step 2: Run the linter**

Run: `npm run lint`
Expected: Clean or pre-existing warnings only.

- [ ] **Step 3: Final hex sweep across entire codebase**

Run Grep pattern `#14919B|#0D7377|#1BA3A3|#22AD5C|#1A8245|#2CD673|#48D1CC|#7FFFD4|#AFEEEE|#E0F2F1|#E0FFFF` on the entire project (exclude `node_modules`, `.next`, `docs/superpowers/specs`, `docs/superpowers/plans`, `tsconfig.tsbuildinfo`).

Expected: No matches in `src/`, `public/`, or root config files other than files you already edited. The spec and plan files in `docs/superpowers/` may reference old hex values for documentation — that's fine.

If any match shows up in `src/`, investigate and replace using the mapping in Task 4 Step 3.

- [ ] **Step 4: Visual smoke test — systematic page walk**

With `npm run dev` running, visit each page and verify. For each, check that buttons/accents/backgrounds use the new palette consistently (no leftover teal, no clashing old green).

| Page | URL | What to verify |
|---|---|---|
| Home | `/` | Hero, carousel, category grid, promo banner, newsletter popup, new arrivals |
| Shop grid | `/shop-without-sidebar` | Product cards, sale badges, add-to-cart hover |
| Shop with sidebar | `/shop-with-sidebar` | Filters, price slider, pagination |
| Product details | click any product | Price, quantity, tabs, reviews, buttons |
| Cart | `/cart` | Quantity buttons, coupon, order summary, proceed button |
| Checkout | `/checkout` | Payment method radios, form focus rings, place order CTA, ShippingMethod |
| Sign in | `/signin` | Form, submit button, error states if any |
| Sign up | `/signup` | Same |
| My account | `/my-account` | Tabs, addresses, order list, loader spinners |
| Orders | `/orders` | Table, status pills, edit order |
| Wishlist | `/wishlist` | Items list, remove buttons |
| Search | `/search?q=oil` | Results grid, loader |
| Contact | `/contact` | Form, submit |
| FAQ | `/faq` | Accordion, SVG chevrons |
| Blog grid | `/blogs/blog-grid` | Cards, categories sidebar |
| Blog details | click any blog | Latest products, search form |
| About | `/about` | Mission/values sections |
| Error | trigger 404 (e.g. `/nonexistent`) | Error page styling |
| Header | any page | Nav hover, search, wishlist/cart icons, dropdown menus |
| Footer | any page | Links hover, newsletter input |

- [ ] **Step 5: Accessibility contrast spot-check**

Pick three CTAs that have white text on orange background (add-to-cart, checkout proceed, sign-in submit). Use browser devtools color picker or a contrast checker.

Expected:
- White on `#F27430` (primary) = ~3.8:1 — fails AA for body text but passes AA-Large (≥3:1). Acceptable for button-sized text (16px+ bold or 18px+ regular).
- White on `#C85A1F` (primary-dark) = ~4.9:1 — passes AA. Use for smaller button text if any fails visual check.

If any CTA with small white text fails readability, change its background utility from `bg-blue` / `bg-teal` to `bg-blue-dark` / `bg-teal-dark` in the specific component. Document any such change inline.

- [ ] **Step 6: Commit (optional)**

```bash
git add -A
git commit -m "rebrand: final sweep — build, lint, visual QA pass"
```

---

## Definition of Done

- [ ] `npm run build` succeeds
- [ ] `npm run lint` clean (or only pre-existing warnings)
- [ ] No `#0D7377`, `#14919B`, `#22AD5C`, `#1A8245`, `#2CD673`, `#1BA3A3`, `#48D1CC`, `#7FFFD4`, `#AFEEEE`, `#E0F2F1`, `#E0FFFF` in `src/`
- [ ] All pages in Task 5 Step 4 render with orange/lemon/ash
- [ ] Email templates verified (test send or rendered HTML in browser)
- [ ] Semantic aliases (`primary`, `accent`, `neutral`) present in `tailwind.config.ts`
- [ ] No orange CTA with small white text failing readability
