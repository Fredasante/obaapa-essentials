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
              {/* Search icon (all breakpoints) */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Open search"
                className="w-11 h-11 flex items-center justify-center text-dark hover:text-primary transition-colors"
              >
                <SearchIcon className="w-5 h-5" />
              </button>

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

      {/* Spacer so content isn't hidden under fixed header */}
      <div aria-hidden="true" className="h-[72px] lg:h-[108px]" />
    </>
  );
};

export default Header;
