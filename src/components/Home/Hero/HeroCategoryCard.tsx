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
            : {
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
              <div className="relative z-10 text-center text-white w-full">
                <span className="inline-block bg-accent text-white text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                  {category.subtext}
                </span>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold drop-shadow-lg mb-4">
                  {category.title}
                </h3>
                <Link
                  href={`/search?category=${category.value}`}
                  className="inline-block bg-white text-primary font-semibold text-custom-sm uppercase tracking-wider px-6 py-3 rounded-full hover:bg-accent hover:text-white transition-colors"
                >
                  Shop {category.title}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

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

      <div className="hero-card-pagination absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2 z-10" />

      <style jsx global>{`
        .hero-card-bullet {
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background-color: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: all 200ms;
        }
        .hero-card-bullet-active {
          width: 24px;
          background-color: #ffffff;
        }
      `}</style>
    </div>
  );
};

export default HeroCategoryCard;
