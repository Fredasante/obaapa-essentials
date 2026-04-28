import React from "react";
import Link from "next/link";
import Image from "next/image";
import { LayoutGrid, Sparkles, Wallet, Headphones } from "lucide-react";
import Breadcrumb from "../Common/Breadcrumb";
import { categories } from "@/data/categories";

const promises = [
  {
    num: 1,
    bg: "bg-primary",
    title: "Hand-curated",
    desc: "Every product is personally chosen for quality and character — not stocked from bulk imports.",
  },
  {
    num: 2,
    bg: "bg-accent",
    title: "Curated, not stocked",
    desc: "Hand-picked, small-batch items chosen for quality and character. We say no a lot.",
  },
  {
    num: 3,
    bg: "bg-primary",
    title: "Pay & deliver, simply",
    desc: "Cedis pricing, Paystack checkout, nationwide delivery. No surprises at the door.",
  },
];

const AboutUs = () => {
  return (
    <>
      <Breadcrumb title={"About Us"} pages={["about"]} />

      {/* Section 2: Magazine story split */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="text-primary font-semibold tracking-[1.5px] uppercase text-xs sm:text-sm mb-3 block">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-6 leading-tight">
                Rooted in Ghana,
                <br />
                made for everyday life
              </h2>
              <div className="space-y-4 text-gray-600 text-base md:text-lg leading-relaxed">
                <p>
                  Obaapa Essentials began as a love letter to the Ghanaian way
                  of life — fabrics that carry pattern and history, foods that
                  taste like home, spices and teas with names you grew up
                  hearing.
                </p>
                <p>
                  Today we curate everyday essentials with care. Every item is
                  chosen for its quality and the role it plays in everyday
                  life.
                </p>
              </div>
            </div>
            {/* TODO: replace with real brand photography when available */}
            <div className="relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://plus.unsplash.com/premium_photo-1705352059500-6a141750a8be?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Ghanaian lifestyle"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Stats / proof strip */}
      <section className="bg-[#FEF3E7] py-14 md:py-20">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
            <span className="text-primary font-semibold tracking-[1.5px] uppercase text-xs sm:text-sm mb-3 block">
              By the Numbers
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark leading-tight">
              Built around what matters
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                Icon: LayoutGrid,
                value: "5",
                label: "Categories",
                tint: "primary" as const,
              },
              {
                Icon: Sparkles,
                value: "100%",
                label: "Hand-curated",
                tint: "accent" as const,
              },
              {
                Icon: Wallet,
                value: "GH₵",
                label: "Local pricing & Paystack",
                tint: "primary" as const,
              },
              {
                Icon: Headphones,
                value: "24/7",
                label: "Customer support",
                tint: "accent" as const,
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 md:p-8 text-center shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    stat.tint === "primary"
                      ? "bg-[#FEF3E7] text-primary"
                      : "bg-[#F4FAE4] text-accent"
                  }`}
                >
                  <stat.Icon className="w-6 h-6" strokeWidth={2} />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-dark mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Categories grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
            <span className="text-accent font-semibold tracking-[1.5px] uppercase text-xs sm:text-sm mb-3 block">
              What We Curate
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark leading-tight">
              Five categories, one philosophy
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/search?category=${category.value}`}
                className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 aspect-[4/5]"
              >
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-white/80 text-xs uppercase tracking-wider mb-1 block">
                    {category.subtext}
                  </span>
                  <h3 className="text-white text-base md:text-lg font-bold leading-tight">
                    {category.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Why Obaapa — three brand promises */}
      <section className="bg-[#F7F8FA] py-12 md:py-16">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
            <span className="text-primary font-semibold tracking-[1.5px] uppercase text-xs sm:text-sm mb-3 block">
              Why Obaapa
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark leading-tight">
              Three things you can count on
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {promises.map((item) => (
              <div
                key={item.num}
                className="bg-white p-6 md:p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div
                  className={`w-10 h-10 ${item.bg} text-white rounded-lg flex items-center justify-center font-bold text-lg mb-5`}
                >
                  {item.num}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-dark mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Pull quote */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0 text-center">
          <blockquote className="text-xl md:text-2xl italic text-dark max-w-2xl mx-auto leading-relaxed mb-4">
            &ldquo;The things we live with every day should carry a story — of
            the hands that made them and the soil they come from.&rdquo;
          </blockquote>
          <div className="text-xs sm:text-sm text-gray-500 uppercase tracking-[2px]">
            — Obaapa Essentials
          </div>
        </div>
      </section>

      {/* Section 7: CTA banner */}
      <section className="bg-[#FEF3E7] py-14 md:py-20">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Ready to shop the essentials?
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto mb-8">
            Explore our curated collection across fashion, foods, spices, teas,
            and wellness — rooted in Ghana, made for you.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Shop Collection
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
