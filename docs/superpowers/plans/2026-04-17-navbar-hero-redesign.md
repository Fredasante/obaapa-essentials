# Navbar & Hero Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebrand navbar + hero from "Hedlorm / Home Décor" to **Obaapa Essentials** — a Fruitables-inspired two-column hero with lemon-green + orange palette, fully responsive.

**Architecture:** Three visual bands: (1) lemon-green utility bar, (2) sticky white main nav with text wordmark + inline search on desktop / overlay on mobile + mobile drawer, (3) two-column hero with Swiper-driven category card. Uses only existing Tailwind tokens from `tailwind.config.ts`.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript (`strict: false`), Tailwind 3.3, `swiper` (already installed), `@heroicons/react` + `lucide-react` for icons, `@clerk/nextjs` for auth, Redux Toolkit for cart state.

**Spec:** [`docs/superpowers/specs/2026-04-17-navbar-hero-redesign-design.md`](../specs/2026-04-17-navbar-hero-redesign-design.md)

**Testing note:** This project has no automated test harness in `package.json`. Verification is manual — run `npm run dev` and visually check each breakpoint. `npm run lint` and `npm run build` are the automated gates.

**Git workflow:** Commit after each task. No branch required (solo developer, direct-to-main is fine for this project per the existing commit history).

---

## Task 1: Remove orphaned hero files

**Why:** Grep confirmed `HeroCarousel.tsx` and `HeroFeature.tsx` have zero imports. Removing them now avoids confusion during the rebuild and keeps the diff focused.

**Files:**
- Delete: `src/components/Home/Hero/HeroCarousel.tsx`
- Delete: `src/components/Home/Hero/HeroFeature.tsx`

- [ ] **Step 1: Double-check no references**

Run: `rg -n "HeroCarousel|HeroFeature" src/` (or use the Grep tool)
Expected: only hits are inside the files themselves. If any other file imports them, STOP and flag it.

- [ ] **Step 2: Delete the files**

```bash
rm src/components/Home/Hero/HeroCarousel.tsx
rm src/components/Home/Hero/HeroFeature.tsx
```

- [ ] **Step 3: Verify build still compiles**

Run: `npm run lint`
Expected: no new errors from the deletions.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove orphaned HeroCarousel and HeroFeature components"
```

---

## Task 2: Create `Wordmark` component

**Why:** The navbar needs a text-only "Obaapa Essentials" brand identity. A dedicated component keeps it reusable (footer can use it later) and isolates styling.

**Files:**
- Create: `src/components/Header/Wordmark.tsx`

- [ ] **Step 1: Create the file**

```tsx
// src/components/Header/Wordmark.tsx
import Link from "next/link";

type WordmarkProps = {
  size?: "sm" | "md";
};

const SIZE_CLASSES = {
  sm: "text-xl",
  md: "text-2xl lg:text-3xl",
} as const;

const Wordmark = ({ size = "md" }: WordmarkProps) => {
  return (
    <Link
      href="/"
      aria-label="Obaapa Essentials - Home"
      className={`font-bold tracking-tight text-accent hover:text-accent-dark transition-colors ${SIZE_CLASSES[size]}`}
    >
      Obaapa Essentials
    </Link>
  );
};

export default Wordmark;
```

- [ ] **Step 2: Lint passes**

Run: `npm run lint`
Expected: no errors in the new file.

- [ ] **Step 3: Commit**

```bash
git add src/components/Header/Wordmark.tsx
git commit -m "feat(header): add Wordmark component for Obaapa Essentials"
```

---

## Task 3: Create `UtilityBar` component

**Why:** The lemon-green strip above the nav carries the shipping announcement + policy links. Server component — no interactivity.

**Files:**
- Create: `src/components/Header/UtilityBar.tsx`

- [ ] **Step 1: Create the file**

```tsx
// src/components/Header/UtilityBar.tsx
import Link from "next/link";
import { Truck } from "lucide-react";

const POLICY_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Shipping", href: "/shipping" },
] as const;

const UtilityBar = () => {
  return (
    <div className="hidden lg:block bg-accent">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-7.5 xl:px-12">
        <div className="flex items-center justify-between py-2 text-xs font-medium text-accent-dark">
          <div className="flex items-center gap-2">
            <Truck className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Free delivery on orders over ₵500</span>
          </div>

          <ul className="flex items-center gap-5">
            {POLICY_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-dark transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UtilityBar;
```

- [ ] **Step 2: Lint passes**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Header/UtilityBar.tsx
git commit -m "feat(header): add UtilityBar with shipping announcement and policy links"
```

---

## Task 4: Trim `menuData`

**Why:** Fruitables-style navs have 4–5 primary items. `My Account` belongs behind the auth avatar; `Wishlist` becomes its own icon.

**Files:**
- Modify: `src/components/Header/menuData.ts`

- [ ] **Step 1: Replace file contents**

```ts
// src/components/Header/menuData.ts
import { Menu } from "@/types/Menu";

export const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    newTab: false,
    path: "/",
  },
  {
    id: 2,
    title: "Shop",
    newTab: false,
    path: "/shop",
  },
  {
    id: 3,
    title: "About",
    newTab: false,
    path: "/about",
  },
  {
    id: 4,
    title: "Contact",
    newTab: false,
    path: "/contact",
  },
];
```

- [ ] **Step 2: Lint passes**

Run: `npm run lint`
Expected: no errors. `Menu` type unchanged, so no type errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Header/menuData.ts
git commit -m "refactor(header): trim menuData to Home/Shop/About/Contact"
```

---

## Task 5: Create `SearchOverlay` component

**Why:** On `<xl` screens the search becomes an icon that opens a full-width overlay. Reuses the existing `SearchInput` internals so search behavior stays identical.

**Files:**
- Create: `src/components/Header/SearchOverlay.tsx`

- [ ] **Step 1: Create the file**

```tsx
// src/components/Header/SearchOverlay.tsx
"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import SearchInput from "./SearchInput";

type SearchOverlayProps = {
  open: boolean;
  onClose: () => void;
};

const SearchOverlay = ({ open, onClose }: SearchOverlayProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    // Focus the first focusable element (the category select or input)
    const focusable = containerRef.current?.querySelector<HTMLElement>(
      "input, button, [tabindex]:not([tabindex='-1'])"
    );
    focusable?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-99999 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      onClick={onClose}
    >
      <div
        ref={containerRef}
        className="bg-white rounded-lg shadow-2xl w-full max-w-2xl p-5 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close search"
          className="absolute right-3 top-3 w-11 h-11 flex items-center justify-center text-dark hover:text-primary transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-sm font-semibold text-dark mb-4 pr-10">
          Search Obaapa Essentials
        </h2>

        <SearchInput />
      </div>
    </div>
  );
};

export default SearchOverlay;
```

- [ ] **Step 2: Lint passes**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Header/SearchOverlay.tsx
git commit -m "feat(header): add SearchOverlay modal for mobile search"
```

---

## Task 6: Rebuild `Header`

**Why:** The big one. Replaces the existing header with the Fruitables-inspired two-band structure: utility bar + main nav with wordmark, centered menu (≥xl), icon cluster, and a slide-in right drawer (<xl).

**Files:**
- Modify: `src/components/Header/index.tsx` (full rewrite)

**Preserved behavior:**
- Sticky on scroll (`stickyMenu` state, shadow when stuck)
- Outside-click closes mobile nav
- Cart modal opens on cart button click
- AuthDropdown wiring
- Cart item count + ₵ total from Redux

**New behavior:**
- Drawer slides from right (was collapsing below the header)
- Search opens `SearchOverlay` on `<xl`, inline on `≥xl`
- `Wishlist` promoted to its own icon
- Removed: 24/7 phone block, "Recently Viewed" link

- [ ] **Step 1: Replace file contents**

```tsx
// src/components/Header/index.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Heart, Search as SearchIcon, X } from "lucide-react";
import { useSelector } from "react-redux";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

import { menuData } from "./menuData";
import Wordmark from "./Wordmark";
import UtilityBar from "./UtilityBar";
import SearchInput from "./SearchInput";
import SearchOverlay from "./SearchOverlay";
import AuthDropdown from "../Auth/AuthDropdown";
import { useAppSelector } from "@/redux/store";
import { selectTotalPrice } from "@/redux/features/cart-slice";
import { useCartModalContext } from "@/app/context/CartSidebarModalContext";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const { openCartModal } = useCartModalContext();
  const product = useAppSelector((state) => state.cartReducer.items);
  const totalPrice = useSelector(selectTotalPrice);
  const { user, isSignedIn } = useUser();

  const closeDrawer = () => setDrawerOpen(false);

  // Sticky on scroll
  useEffect(() => {
    const handleScroll = () => setStickyMenu(window.scrollY >= 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close drawer on outside click
  useEffect(() => {
    if (!drawerOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement).closest("#drawer-toggle")
      ) {
        closeDrawer();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [drawerOpen]);

  // Close drawer on Esc
  useEffect(() => {
    if (!drawerOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [drawerOpen]);

  return (
    <>
      <header
        className={`fixed left-0 top-0 w-full z-9999 bg-white transition-all ease-in-out duration-300 ${
          stickyMenu ? "shadow-md" : ""
        }`}
      >
        <UtilityBar />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-7.5 xl:px-12">
          <div
            className={`flex items-center justify-between gap-6 transition-all duration-200 ${
              stickyMenu ? "py-3" : "py-5"
            }`}
          >
            {/* Left: wordmark */}
            <div className="flex-shrink-0">
              <Wordmark size="md" />
            </div>

            {/* Center: menu (xl+) */}
            <nav className="hidden xl:block">
              <ul className="flex items-center gap-8">
                {menuData.map((item) => (
                  <li
                    key={item.id}
                    className="group relative before:w-0 before:h-[3px] before:bg-primary before:absolute before:left-0 before:-bottom-1 before:rounded-b-[3px] before:ease-out before:duration-200 hover:before:w-full"
                  >
                    <Link
                      href={item.path ?? "/"}
                      className="text-custom-sm font-medium text-dark hover:text-primary transition-colors py-2 flex items-center min-h-[40px]"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Right: icon cluster */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Inline search on xl+ */}
              <div className="hidden xl:block max-w-[420px] w-[360px]">
                <SearchInput />
              </div>

              {/* Search icon (<xl) */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Open search"
                className="xl:hidden w-11 h-11 flex items-center justify-center text-dark hover:text-primary transition-colors"
              >
                <SearchIcon className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                aria-label="Wishlist"
                className="hidden sm:flex w-11 h-11 items-center justify-center text-dark hover:text-primary transition-colors"
              >
                <Heart className="w-5 h-5" />
              </Link>

              {/* Auth avatar */}
              <AuthDropdown user={user} isSignedIn={isSignedIn} />

              {/* Cart */}
              <button
                onClick={openCartModal}
                aria-label={`Cart, ${product.length} items, total ₵${totalPrice}`}
                className="flex items-center gap-2 min-h-[44px] px-2"
              >
                <span className="inline-block relative">
                  <Image
                    src="/icons/cart.svg"
                    alt=""
                    width={24}
                    height={24}
                    aria-hidden="true"
                  />
                  <span className="flex items-center justify-center font-medium text-2xs absolute -right-2 -top-2 bg-primary w-4.5 h-4.5 rounded-full text-white">
                    {product.length}
                  </span>
                </span>
                <span className="hidden lg:block text-left">
                  <span className="block text-2xs text-dark-4 uppercase leading-none">
                    cart
                  </span>
                  <span className="font-medium text-custom-sm text-dark">
                    ₵{totalPrice}
                  </span>
                </span>
              </button>

              {/* Hamburger (<xl) */}
              <button
                id="drawer-toggle"
                type="button"
                aria-label={drawerOpen ? "Close menu" : "Open menu"}
                aria-expanded={drawerOpen}
                onClick={() => setDrawerOpen((v) => !v)}
                className="xl:hidden w-11 h-11 flex items-center justify-center"
              >
                <span className="block relative w-5 h-4">
                  <span
                    className={`absolute left-0 right-0 h-0.5 bg-dark rounded transition-all duration-200 ${
                      drawerOpen ? "top-1.5 rotate-45" : "top-0"
                    }`}
                  />
                  <span
                    className={`absolute left-0 right-0 top-1.5 h-0.5 bg-dark rounded transition-opacity duration-200 ${
                      drawerOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`absolute left-0 right-0 h-0.5 bg-dark rounded transition-all duration-200 ${
                      drawerOpen ? "top-1.5 -rotate-45" : "top-3"
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile drawer (<xl) */}
        <div
          className={`xl:hidden fixed inset-0 z-9999 transition-opacity duration-300 ${
            drawerOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          aria-hidden={!drawerOpen}
        >
          <div
            className="absolute inset-0 bg-black/40"
            onClick={closeDrawer}
          />
          <aside
            ref={drawerRef}
            className={`absolute right-0 top-0 h-full w-[280px] max-w-[85vw] bg-white shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
              drawerOpen ? "translate-x-0" : "translate-x-full"
            }`}
            role="dialog"
            aria-label="Main menu"
          >
            <div className="flex items-center justify-between p-5 border-b border-gray-3">
              <Wordmark size="sm" />
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close menu"
                className="w-11 h-11 flex items-center justify-center text-dark"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-5">
              <ul className="flex flex-col gap-1">
                {menuData.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.path ?? "/"}
                      onClick={closeDrawer}
                      className="block py-3 px-3 rounded-md text-base font-medium text-dark hover:bg-accent/10 hover:text-primary transition-colors min-h-[44px]"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
                <li className="mt-2 pt-2 border-t border-gray-3">
                  <Link
                    href="/wishlist"
                    onClick={closeDrawer}
                    className="flex items-center gap-2 py-3 px-3 rounded-md text-base font-medium text-dark hover:bg-accent/10 hover:text-primary transition-colors min-h-[44px]"
                  >
                    <Heart className="w-4 h-4" />
                    Wishlist
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>
        </div>
      </header>

      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

      {/* Spacer so content isn't hidden under fixed header.
          Heights: utility 36px (lg+) + main nav ~72px (unstuck) / ~56px (stuck) */}
      <div aria-hidden="true" className="h-[72px] lg:h-[108px]" />
    </>
  );
};

export default Header;
```

- [ ] **Step 2: Lint passes**

Run: `npm run lint`
Expected: no errors. Imports all exist.

- [ ] **Step 3: Run the dev server and smoke-test**

Run: `npm run dev`

Then in a browser verify:
- At 375px width: wordmark visible, search icon + cart + hamburger visible (no inline search). Hamburger opens right drawer; tapping a menu link closes it. Esc closes drawer.
- At 1280px width: wordmark left, 4 menu items centered, inline search + wishlist + avatar + cart right. No hamburger.
- Scroll down: header shrinks, shadow fades in.
- Cart badge shows product count; cart total in ₵ visible at `lg+`.
- Clicking cart opens the cart modal (existing wiring).
- Clicking search icon (<xl) opens overlay; Esc closes; clicking backdrop closes; typing + hitting enter navigates to `/search`.

- [ ] **Step 4: Commit**

```bash
git add src/components/Header/index.tsx
git commit -m "feat(header): rebuild navbar with Obaapa branding, drawer, and search overlay"
```

---

## Task 7: Create `HeroCategoryCard`

**Why:** The right-side orange card in the hero is a Swiper carousel that rotates through categories. Reuses `src/data/categories.ts` so no data duplication.

**Files:**
- Create: `src/components/Home/Hero/HeroCategoryCard.tsx`

- [ ] **Step 1: Create the file**

```tsx
// src/components/Home/Hero/HeroCategoryCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Category } from "@/data/categories";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

type HeroCategoryCardProps = {
  categories: Category[];
};

const HeroCategoryCard = ({ categories }: HeroCategoryCardProps) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <div className="relative w-full max-w-[560px] mx-auto lg:mx-0 rounded-3xl overflow-hidden bg-gradient-to-br from-blue-light-3 via-blue-light to-primary shadow-xl">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        loop
        autoplay={
          prefersReducedMotion
            ? false
            : { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }
        }
        navigation={{
          prevEl: ".hero-card-prev",
          nextEl: ".hero-card-next",
        }}
        pagination={{
          el: ".hero-card-pagination",
          clickable: true,
          bulletClass: "hero-card-bullet",
          bulletActiveClass: "hero-card-bullet-active",
        }}
        a11y={{
          prevSlideMessage: "Previous category",
          nextSlideMessage: "Next category",
        }}
        className="h-[340px] sm:h-[420px] lg:h-[480px]"
      >
        {categories.map((category) => (
          <SwiperSlide
            key={category.id}
            className="!flex items-center justify-center"
          >
            <div className="relative w-full h-full flex items-center justify-center p-6 sm:p-10">
              <Image
                src={category.image}
                alt={category.title}
                fill
                className="object-cover object-center opacity-90"
                sizes="(max-width: 1024px) 100vw, 560px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="relative z-10 text-center text-white w-full">
                <span className="inline-block bg-accent text-dark text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                  {category.subtext}
                </span>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold drop-shadow-lg mb-4">
                  {category.title}
                </h3>
                <Link
                  href={`/search?category=${category.value}`}
                  className="inline-block bg-white text-primary font-semibold text-custom-sm uppercase tracking-wider px-6 py-3 rounded-full hover:bg-accent hover:text-dark transition-colors"
                >
                  Shop {category.title}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Nav arrows */}
      <button
        type="button"
        aria-label="Previous category"
        className="hero-card-prev absolute left-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/80 text-primary hover:bg-white transition-colors shadow-md"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        aria-label="Next category"
        className="hero-card-next absolute right-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/80 text-primary hover:bg-white transition-colors shadow-md"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Pagination */}
      <div className="hero-card-pagination absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2 z-10" />

      <style jsx>{`
        :global(.hero-card-bullet) {
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background-color: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: all 200ms;
        }
        :global(.hero-card-bullet-active) {
          width: 24px;
          background-color: #bedb39;
        }
      `}</style>
    </div>
  );
};

export default HeroCategoryCard;
```

- [ ] **Step 2: Lint passes**

Run: `npm run lint`
Expected: no errors. (Note: `swiper` is v10 per `package.json`, which supports these modules and the React wrapper API shown.)

- [ ] **Step 3: Commit**

```bash
git add src/components/Home/Hero/HeroCategoryCard.tsx
git commit -m "feat(hero): add HeroCategoryCard Swiper carousel"
```

---

## Task 8: Rebuild `Hero` as two-column layout

**Why:** The actual hero composition. Left column: kicker + heading + subhead + search + CTA. Right column: `HeroCategoryCard`. Also uncomments `<Hero />` in `Home/index.tsx` since the hero was disabled.

**Files:**
- Modify: `src/components/Home/Hero/index.tsx` (full rewrite)
- Modify: `src/components/Home/index.tsx` (uncomment Hero)

- [ ] **Step 1: Replace `Hero/index.tsx`**

```tsx
// src/components/Home/Hero/index.tsx
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import SearchInput from "@/components/Header/SearchInput";
import HeroCategoryStrip from "../HeroCategoryStrip";
import HeroCategoryCard from "./HeroCategoryCard";
import { categories } from "@/data/categories";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-green-light-6 via-white to-white pb-16 lg:pb-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-7.5 xl:px-12 pt-10 lg:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-[58%_42%] gap-10 lg:gap-8 items-center min-h-[560px]">
          {/* Left column */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <span className="inline-block text-custom-lg font-semibold text-primary uppercase tracking-wide mb-4">
              Rooted in Ghana, Made for You
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-heading-2 xl:text-heading-1 font-bold text-accent-dark leading-tight mb-5">
              Fashion, Flavor &amp; Wellness —{" "}
              <span className="text-accent">All in One Place</span>
            </h1>

            <p className="text-custom-sm lg:text-base text-body leading-relaxed max-w-[520px] mx-auto lg:mx-0 mb-8">
              From handwoven pieces to pantry staples, everyday essentials with
              an authentically Ghanaian soul.
            </p>

            <div className="max-w-[520px] mx-auto lg:mx-0 mb-6">
              <SearchInput />
            </div>

            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold text-custom-sm uppercase tracking-wider px-8 py-4 rounded-full transition-colors shadow-md hover:shadow-lg"
            >
              Shop Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right column */}
          <div className="order-1 lg:order-2">
            <HeroCategoryCard categories={categories} />
          </div>
        </div>
      </div>

      <HeroCategoryStrip />
    </section>
  );
};

export default Hero;
```

- [ ] **Step 2: Uncomment Hero in `Home/index.tsx`**

Replace current contents with:

```tsx
// src/components/Home/index.tsx
import React from "react";
import Hero from "./Hero";
import AllProducts from "./AllProducts";
import CategoryGrid from "./CategoryGrid";
import { TestimonialsSection } from "./Hero/Testimonials";

const Home = () => {
  return (
    <main>
      <Hero />
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

- [ ] **Step 3: Lint passes**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 4: Run dev server and verify hero**

Run: `npm run dev`

In a browser at `http://localhost:3000`:
- At 375px: hero stacks — orange category card on top (340px tall), text + search + CTA below. Kicker is orange, heading is green, button is orange rounded pill.
- At 768px: still stacked, card ~420px tall, text wider.
- At 1280px: two columns — text left (58%), card right (42%). Card autoplays every 5s; prev/next arrows work; dots below update; clicking "Shop Fashion" navigates to `/search?category=fashion`.
- The inline SearchInput inside the hero works (typing + select routes to `/search`).
- Simulate `prefers-reduced-motion: reduce` in DevTools → Rendering → Emulate CSS media feature. Reload. Autoplay should not start.

- [ ] **Step 5: Commit**

```bash
git add src/components/Home/Hero/index.tsx src/components/Home/index.tsx
git commit -m "feat(hero): rebuild hero as two-column layout with category carousel"
```

---

## Task 9: Restyle `HeroCategoryStrip`

**Why:** The strip now sits under a lighter hero background. Its hover ring needs to be green (accent) instead of orange to avoid the two orange elements (card + strip hover) competing. Also shadow softens slightly.

**Files:**
- Modify: `src/components/Home/HeroCategoryStrip.tsx`

- [ ] **Step 1: Replace file contents**

```tsx
// src/components/Home/HeroCategoryStrip.tsx
"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { categories } from "@/data/categories";

const HeroCategoryStrip = () => {
  const router = useRouter();

  const handleCategoryClick = (categoryValue: string) => {
    router.push(`/search?category=${categoryValue}`);
  };

  return (
    <div className="relative z-20 -mt-12 sm:-mt-16 lg:-mt-20 max-w-[1440px] mx-auto px-4 sm:px-7.5 xl:px-12">
      <div className="bg-white border border-gray-3 shadow-md rounded-2xl p-4 sm:p-6 overflow-x-auto scrollbar-hide">
        <div className="flex space-x-6 sm:space-x-8 min-w-max md:justify-center pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => handleCategoryClick(category.value)}
              className="flex flex-col items-center gap-3 group min-w-[80px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-transparent group-hover:border-accent transition-all duration-300 shadow-sm">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="80px"
                />
              </div>
              <span className="text-xs sm:text-sm font-medium text-dark text-center group-hover:text-accent-dark transition-colors whitespace-nowrap">
                {category.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroCategoryStrip;
```

- [ ] **Step 2: Lint passes**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Run dev server and verify**

Run: `npm run dev`

Verify:
- Strip overlaps hero bottom at −48px / −64px / −80px across `<sm` / `sm`–`lg` / `≥lg`.
- Hovering a category shows a green ring around the image + green text color.
- Clicking routes to `/search?category=<value>`.
- Tabbing focuses the buttons (keyboard accessible now that they're `<button>` not `<div>`).
- Horizontal scroll works on `<md`; items center on `≥md`.

- [ ] **Step 4: Commit**

```bash
git add src/components/Home/HeroCategoryStrip.tsx
git commit -m "refactor(hero): restyle HeroCategoryStrip with green accent and button semantics"
```

---

## Task 10: Final verification pass

**Why:** Catch anything the per-task checks missed — cross-breakpoint regressions, lint, and the production build.

**Files:** none.

- [ ] **Step 1: Run lint**

Run: `npm run lint`
Expected: exits 0. If it prints errors, fix them before continuing.

- [ ] **Step 2: Run production build**

Run: `npm run build`
Expected: `✓ Compiled successfully` and no type errors. Note the homepage bundle size didn't balloon (Swiper modules are tree-shaken).

- [ ] **Step 3: Multi-breakpoint dev smoke test**

Run: `npm run dev`, then in the browser walk through these widths (Chrome DevTools device toolbar):

| Width | What to check |
|---|---|
| **375** (xsm) | Hero stacks; card on top; hamburger opens drawer; search icon opens overlay; no inline search; cart badge visible; no utility bar |
| **425** (lsm) | Same as 375 but slightly more breathing room |
| **640** (sm) | Wishlist icon appears; category strip becomes centered |
| **768** (md) | Hero still stacked but wider; strip items center |
| **1024** (lg) | Utility bar appears; cart shows ₵ total; hero still single-column |
| **1280** (xl) | Two-column hero; centered menu; inline SearchInput; no hamburger |
| **1440** | Everything fits at max width; ample padding |

At each width, verify **nothing overflows horizontally** (no horizontal scrollbar on `<body>`).

- [ ] **Step 4: Functional sweep**

- Cart modal still opens from cart button
- AuthDropdown still opens (signed-in and signed-out states — use a fresh browser profile or incognito for signed-out)
- Category card autoplay pauses on hover, resumes on mouseleave
- Drawer closes on Esc, on backdrop click, on menu-item click
- All `/privacy`, `/terms`, `/shipping`, `/about`, `/contact`, `/wishlist` links render their respective 404 or existing pages — don't fix the 404s here, that's out of scope per the spec

- [ ] **Step 5: No commit**

This task is verification-only. If any check fails, go back to the relevant task and fix it; do not proceed to a tenth "wrap-up commit."

---

## Out of scope / follow-ups (do not do in this plan)

- Real `/privacy`, `/terms`, `/shipping` page content — utility-bar links will 404 until those pages exist.
- Swapping the `<title>` + `<meta description>` from "Hedlorm" to "Obaapa Essentials" in `src/app/(site)/layout.tsx` and `src/app/(site)/page.tsx` — these are part of a separate rebrand pass (SEO/favicon/OG).
- Replacing `/public/hedlorm-logo.png` and the favicon.
- Any Sanity schema changes to drive hero content from the CMS.
- Footer rebrand — separate redesign.
