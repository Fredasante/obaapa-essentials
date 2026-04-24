# CLAUDE.md

Context brief for Claude Code working on this project. Keep this short and accurate — edit when conventions change, don't let it rot.

## What this is

**Obaapa Essentials** — a Ghanaian lifestyle e-commerce store (Fashion, Foods, Spices, Teas & Herbs, Others). Originally forked from a décor-store template called "Hedlorm"; the rebrand is complete and no user-visible "Hedlorm" references remain. The physical asset `public/hedlorm-logo.png` is still on disk but nothing references it.

## Stack

- **Next.js 15.5.15** (App Router) + **React 19.0** + **TypeScript** (`strict: false`)
- **Tailwind 3.3** — palette lives in [`tailwind.config.ts`](tailwind.config.ts)
- **Sanity v4** (Studio embedded at `/admin`, client in [`src/sanity/`](src/sanity/)) — product catalog source of truth
- **Clerk** (`@clerk/nextjs`) for auth — middleware at [`src/middleware.ts`](src/middleware.ts)
- **Redux Toolkit** + redux-persist for cart/wishlist — store at [`src/redux/store.ts`](src/redux/store.ts)
- **Paystack** for payments (Ghana Cedis, GH₵/`₵`)
- **Resend** for transactional email — **currently disabled** (routes under [`src/app/api/`](src/app/api/) return a stub; original code lives in `/* */` blocks)
- **Swiper v10** for carousels, **Motion** for animations, **Lucide** + **Heroicons** + **Tabler** icons

## Brand & palette

Use Tailwind tokens, not raw hex, except where a token doesn't map cleanly.

- **Orange (primary CTA)**: `seaBlue-dark` / `blue-dark` / `primary` → `#F27430`. Hover: `primary-dark` → `#C85A1F`.
- **Lemon green (accent / secondary CTA)**: `accent` / `green` → `#81C408`. Darker: `green-dark` / `accent-dark` → `#6BA306`.
- **Footer slate**: `bg-[#45595b]` (no token — footer-only).
- **Body text**: `text-dark` (`#2C2E36`).
- **Font**: `euclid-circular-a` (custom face loaded in [`src/app/css/`](src/app/css/)).

## Established conventions

**Button pairing** — wherever two CTAs sit side by side, primary is orange and secondary is lemon green:
- Cart drawer: View Cart (green outline) / Checkout (orange)
- Quick View modal: Add to Wishlist (green outline) / Add to Cart (orange)
- Product detail: Add to Wishlist (green outline) / Add to Cart (orange)
- Cart page Discount + OrderSummary: Apply Code (green) / Checkout (orange)
- Checkout Coupon + Place Order: Apply (green) / Place Order (orange)

**Header** — sticky, lemon-green utility bar always visible. [`src/components/Header/index.tsx`](src/components/Header/index.tsx) is the real header (not the orphaned `HeaderHero.tsx` which was removed). Mobile uses a right-side slide-in drawer.

**Hero** — two-column at `lg+` (text left, orange Swiper category card right). Heading color is `text-[#81c408]`. See [`src/components/Home/Hero/index.tsx`](src/components/Home/Hero/index.tsx).

## Gotchas & don'ts

- **Do not start a dev server.** The user runs `npm run dev` themselves on **port 3000** wired to their Sanity project. Spawning a parallel instance on 3001 confuses verification. Ask them to reload instead.
- **Emails are disabled on purpose.** All three email routes (`newsletter`, `order-status-change`, `emails/order-confirmation`) return a stub. The original Resend code is commented out. When re-enabled, the `from:` address needs a verified domain — gmail won't work as a sender. `to:` / `SHOP_EMAIL` (`essentialsobaapa@gmail.com`) is fine.
- **No automated tests** in `package.json`. Verification is manual — run `npm run lint` and `npm run build`, then eyeball the UI.
- **`strict: false`** in `tsconfig.json` — don't assume strict-mode behaviors like non-null guarantees.
- **Sanity is v4.** `next-sanity@latest` would force a Sanity v5 upgrade (breaking); keep `next-sanity@^11.6.2` / `sanity@^4.11.0` / `@sanity/client@^7.12.0` pinned together.
- **Next 16 is available but not adopted.** Going there requires Sanity 5 + React 19.2 + `styled-components`. Tracked as a separate future task.
- **`next lint` is deprecated** in 15.5 — still works, but Next 16 will remove it. Migration command: `npx @next/codemod@canary next-lint-to-eslint-cli .`
- **Menu data**: the nav only has Home / Shop / About / Contact. My Account lives behind the auth avatar; Wishlist lives in the mobile drawer.
- **Category list** is hard-coded in [`src/data/categories.ts`](src/data/categories.ts), not Sanity-driven. Five categories: `fashion`, `foods`, `spices`, `teas-and-herbs`, `others`.

## Working in the repo

- **Commit style**: conventional prefixes (`feat(scope):`, `fix(scope):`, `chore:`, `style:`, `refactor(scope):`, `docs:`). One logical change per commit. Co-author trailer with the Claude identity.
- **Docs location**: specs in [`docs/superpowers/specs/`](docs/superpowers/specs/), plans in [`docs/superpowers/plans/`](docs/superpowers/plans/). Named `YYYY-MM-DD-<topic>-design.md` / `YYYY-MM-DD-<topic>.md`.
- **Legacy tokens**: `seaBlue` / `blue` were kept in the Tailwind config and now resolve to the orange palette so that pre-rebrand class names keep working. Don't introduce new `seaBlue-*` usage in fresh code — prefer `primary` / `accent`.
- **Line endings**: working on Windows; git warns about LF→CRLF but it's cosmetic. Don't try to "fix" by changing `.gitattributes` unless asked.
