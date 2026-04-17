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
