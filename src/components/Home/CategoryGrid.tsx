"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { categories } from "@/data/categories";

interface CategoryGridProps {
  title: string;
  subtitle: string;
}

export default function CategoryGrid({ title, subtitle }: CategoryGridProps) {
  const router = useRouter();

  const handleCategoryClick = (categoryValue: string) => {
    router.push(`/search?category=${categoryValue}`);
  };

  return (
    <section className="py-10 md:py-15">
      <div className="max-w-[1240px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-seaBlue-dark/10 text-seaBlue-dark text-xs font-semibold uppercase tracking-[0.15em] rounded-full mb-4">
            Collections
          </span>
          <h2 className="text-3xl md:text-[42px] font-bold text-dark leading-tight mb-5">
            {title}
          </h2>
          <div className="flex flex-col items-center gap-1 mb-5">
            <div className="w-10 h-[1.5px] bg-seaBlue-dark" />
            <div className="w-10 h-[1.5px] bg-seaBlue-dark" />
          </div>
          <p className="text-base md:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[250px]">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.value)}
              className={cn(
                "group relative cursor-pointer overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500",
                category.className,
              )}
            >
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md border border-white/10 text-white text-xs font-medium uppercase tracking-wider rounded-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {category.subtext}
                </span>
                <h3 className="text-white text-lg md:text-xl font-bold leading-tight group-hover:text-white/90 transition-colors">
                  {category.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
