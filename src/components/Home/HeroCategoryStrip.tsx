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
    <div className="relative z-20 -mt-16 sm:-mt-20 mb-12 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white/90 backdrop-blur-md border border-white/20 shadow-xl rounded-xl p-4 sm:p-6 overflow-x-auto scrollbar-hide">
        <div className="flex space-x-6 sm:space-x-8 min-w-max pb-2">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.value)}
              className="flex flex-col items-center gap-3 cursor-pointer group min-w-[80px]"
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-transparent group-hover:border-seaBlue-DEFAULT transition-all duration-300 shadow-md">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <span className="text-xs sm:text-sm font-medium text-dark text-center group-hover:text-seaBlue-dark transition-colors whitespace-nowrap">
                {category.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroCategoryStrip;
