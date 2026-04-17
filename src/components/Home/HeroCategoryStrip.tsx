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
