"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import SearchInput from "@/components/Header/SearchInput";
import HeroCategoryCard from "./HeroCategoryCard";
import { categories, type Category } from "@/data/categories";

const bagHeroSlides: Category[] = [
  {
    id: "hero-bags-1",
    title: "Bags",
    subtext: "Carry in Style",
    value: "bags",
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=738&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "hero-bags-2",
    title: "Bags",
    subtext: "Statement Pieces",
    value: "bags",
    image:
      "https://images.unsplash.com/photo-1606522754091-a3bbf9ad4cb3?q=80&w=842&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "hero-bags-3",
    title: "Bags",
    subtext: "Everyday Essentials",
    value: "bags",
    image:
      "https://images.unsplash.com/photo-1713425886695-7772d1498b11?q=80&w=711&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const heroSlides: Category[] = [
  ...bagHeroSlides,
  ...categories.filter((c) => c.value !== "bags"),
];

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-green-light-6 via-white to-white pb-16 lg:pb-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-7.5 xl:px-12 pt-16 lg:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-[58%_42%] gap-10 lg:gap-8 items-center min-h-[560px]">
          {/* Left column */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <span className="inline-block text-custom-lg font-semibold text-primary uppercase tracking-wide mb-4">
              Rooted in Ghana, Made for You
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-heading-2 xl:text-heading-1 font-bold text-[#8E1A5C] leading-tight mb-5">
              Statement Bags &amp; Everyday Essentials
            </h1>

            <p className="text-custom-sm lg:text-base text-body leading-relaxed max-w-[520px] mx-auto lg:mx-0 mb-8">
              Hand-picked bags to carry every day, plus foods, spices and teas
              for life at home.
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
            <HeroCategoryCard categories={heroSlides} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
