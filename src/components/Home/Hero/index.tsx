"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import SearchInput from "@/components/Header/SearchInput";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-green-light-6 via-white to-white pb-16 lg:pb-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-7.5 xl:px-12 pt-16 lg:pt-16">
        <div className="flex flex-col items-center text-center gap-6 max-w-[640px] mx-auto">
          <div className="w-full">
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
      </div>
    </section>
  );
};

export default Hero;
