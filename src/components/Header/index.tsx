"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Heart,
  Home as HomeIcon,
  Info,
  Mail,
  Phone,
  ShoppingBag,
  ShoppingCart,
  Truck,
  X,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

import { menuData } from "./menuData";
import Wordmark from "./Wordmark";
import UtilityBar from "./UtilityBar";
import AuthDropdown from "../Auth/AuthDropdown";
import { useAppSelector } from "@/redux/store";
import { selectTotalPrice } from "@/redux/features/cart-slice";
import { useCartModalContext } from "@/app/context/CartSidebarModalContext";
import { categories } from "@/data/categories";

const NAV_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Home: HomeIcon,
  Shop: ShoppingBag,
  About: Info,
  Contact: Mail,
};

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [shopExpanded, setShopExpanded] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const { openCartModal } = useCartModalContext();
  const product = useAppSelector((state) => state.cartReducer.items);
  const wishlistItems = useAppSelector(
    (state) => state.wishlistReducer.items,
  );
  const totalPrice = useSelector(selectTotalPrice);
  const { user, isSignedIn } = useUser();

  const closeDrawer = () => {
    setDrawerOpen(false);
    setShopExpanded(false);
  };

  useEffect(() => {
    const handleScroll = () => setStickyMenu(window.scrollY >= 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        className={`fixed left-0 top-0 w-full z-9999 bg-[#E80088] transition-all ease-in-out duration-300 ${
          stickyMenu ? "shadow-md" : ""
        }`}
      >
        <div className="hidden lg:block">
          <UtilityBar />
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-7.5 xl:px-12">
          <div
            className={`flex items-center justify-between gap-6 transition-all duration-200 ${
              stickyMenu ? "py-2.5 lg:py-2" : "py-3 lg:py-3"
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
                    className="group relative before:w-0 before:h-[3px] before:bg-white before:absolute before:left-0 before:-bottom-1 before:rounded-b-[3px] before:ease-out before:duration-200 hover:before:w-full"
                  >
                    <Link
                      href={item.path ?? "/"}
                      className="text-custom-sm font-medium text-white hover:text-cream transition-colors py-2 flex items-center min-h-[40px]"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Right: icon cluster */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Auth avatar */}
              <AuthDropdown user={user} isSignedIn={isSignedIn} />

              {/* Cart */}
              <button
                onClick={openCartModal}
                aria-label={`Cart, ${product.length} items, total ₵${totalPrice}`}
                className="flex items-center gap-2 min-h-[44px] px-2 text-white"
              >
                <span className="inline-block relative">
                  <Image
                    src="/icons/cart.svg"
                    alt=""
                    width={24}
                    height={24}
                    aria-hidden="true"
                    className="invert brightness-0"
                  />
                  <span className="flex items-center justify-center font-semibold text-2xs absolute -right-2 -top-2 bg-white w-4.5 h-4.5 rounded-full text-primary">
                    {product.length}
                  </span>
                </span>
                <span className="hidden lg:block text-left">
                  <span className="block text-2xs text-white/70 uppercase leading-none">
                    cart
                  </span>
                  <span className="font-medium text-custom-sm text-white">
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
                    className={`absolute left-0 right-0 h-0.5 bg-white rounded transition-all duration-200 ${
                      drawerOpen ? "top-1.5 rotate-45" : "top-0"
                    }`}
                  />
                  <span
                    className={`absolute left-0 right-0 top-1.5 h-0.5 bg-white rounded transition-opacity duration-200 ${
                      drawerOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`absolute left-0 right-0 h-0.5 bg-white rounded transition-all duration-200 ${
                      drawerOpen ? "top-1.5 -rotate-45" : "top-3"
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="lg:hidden">
          <UtilityBar />
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
            className={`absolute right-0 top-0 h-full w-[300px] max-w-[88vw] bg-white shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
              drawerOpen ? "translate-x-0" : "translate-x-full"
            }`}
            role="dialog"
            aria-label="Main menu"
          >
            {/* Brand magenta stripe */}
            <div className="bg-[#E80088] text-white px-5 py-2.5 flex items-center gap-2 text-xs font-medium">
              <Truck className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Call us: 0535908290</span>
            </div>

            {/* Header row */}
            <div className="flex items-center justify-end px-5 py-4 border-b border-gray-3">
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close menu"
                className="w-11 h-11 flex items-center justify-center text-dark"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Account block */}
            <div className="px-5 py-4 border-b border-gray-3">
              {isSignedIn ? (
                <Link
                  href="/my-account"
                  onClick={closeDrawer}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm">
                    {(
                      user?.firstName?.[0] ||
                      user?.emailAddresses?.[0]?.emailAddress?.[0] ||
                      "U"
                    ).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-dark truncate">
                      {user?.firstName ||
                        user?.emailAddresses?.[0]?.emailAddress ||
                        "Welcome"}
                    </div>
                    <div className="text-xs text-primary">My Account →</div>
                  </div>
                </Link>
              ) : (
                <div className="flex gap-2">
                  <Link
                    href="/signin"
                    onClick={closeDrawer}
                    className="flex-1 text-center py-2.5 px-3 rounded-md bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={closeDrawer}
                    className="flex-1 text-center py-2.5 px-3 rounded-md border border-gray-3 text-dark font-semibold text-sm hover:border-primary hover:text-primary transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Main nav + quick links */}
            <nav className="flex-1 overflow-y-auto py-2">
              <ul>
                {menuData.map((item) => {
                  const Icon = NAV_ICONS[item.title];
                  const isShop = item.title === "Shop";

                  if (isShop) {
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => setShopExpanded((v) => !v)}
                          aria-expanded={shopExpanded}
                          className="w-full flex items-center justify-between px-5 py-3 text-dark hover:bg-accent/10 hover:text-primary transition-colors min-h-[44px]"
                        >
                          <span className="flex items-center gap-3">
                            {Icon && <Icon className="w-5 h-5" />}
                            <span className="text-base font-medium">
                              {item.title}
                            </span>
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              shopExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {shopExpanded && (
                          <ul className="bg-[#FAFAFB]">
                            <li>
                              <Link
                                href="/shop"
                                onClick={closeDrawer}
                                className="block pl-13 pr-5 py-2.5 text-sm text-dark hover:text-primary transition-colors"
                                style={{ paddingLeft: "3.25rem" }}
                              >
                                All products
                              </Link>
                            </li>
                            {categories.map((cat) => (
                              <li key={cat.id}>
                                <Link
                                  href={`/search?category=${cat.value}`}
                                  onClick={closeDrawer}
                                  className="block pr-5 py-2.5 text-sm text-dark hover:text-primary transition-colors"
                                  style={{ paddingLeft: "3.25rem" }}
                                >
                                  {cat.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  }

                  return (
                    <li key={item.id}>
                      <Link
                        href={item.path ?? "/"}
                        onClick={closeDrawer}
                        className="flex items-center gap-3 px-5 py-3 text-dark hover:bg-accent/10 hover:text-primary transition-colors min-h-[44px]"
                      >
                        {Icon && <Icon className="w-5 h-5" />}
                        <span className="text-base font-medium">
                          {item.title}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Quick links: wishlist + cart */}
              <ul className="border-t border-gray-3 mt-2 pt-2">
                <li>
                  <Link
                    href="/wishlist"
                    onClick={closeDrawer}
                    className="flex items-center justify-between px-5 py-3 text-dark hover:bg-accent/10 hover:text-primary transition-colors min-h-[44px]"
                  >
                    <span className="flex items-center gap-3">
                      <Heart className="w-5 h-5" />
                      <span className="text-base font-medium">Wishlist</span>
                    </span>
                    <span className="text-xs bg-primary text-white rounded-full min-w-[24px] h-6 px-2 flex items-center justify-center font-semibold">
                      {wishlistItems.length}
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cart"
                    onClick={closeDrawer}
                    className="flex items-center justify-between px-5 py-3 text-dark hover:bg-accent/10 hover:text-primary transition-colors min-h-[44px]"
                  >
                    <span className="flex items-center gap-3">
                      <ShoppingCart className="w-5 h-5" />
                      <span className="text-base font-medium">Cart</span>
                    </span>
                    <span className="text-xs bg-primary text-white rounded-full min-w-[24px] h-6 px-2 flex items-center justify-center font-semibold">
                      {product.length}
                    </span>
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Footer: call card */}
            <div className="border-t border-gray-3 px-5 py-4">
              <a
                href="tel:+233535908290"
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-full bg-[#F5EBD8] text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-dark-4">Call us anytime</div>
                  <div className="text-sm font-semibold text-dark">
                    0535 908 290
                  </div>
                </div>
              </a>
            </div>
          </aside>
        </div>
      </header>

      {/* Spacer so content isn't hidden under fixed header */}
      <div aria-hidden="true" className="h-[130px] lg:h-[110px]" />
    </>
  );
};

export default Header;
