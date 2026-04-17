"use client";

import Image from "next/image";
import Link from "next/link";

import HeroCategoryStrip from "../HeroCategoryStrip";

const Hero = () => {
  return (
    <>
      <section className="relative h-[65vh] min-h-[450px] md:h-[64vh] md:min-h-[450px] w-full overflow-hidden flex flex-col">
        {/* Background Image with sepia/brown tone overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1531120364508-a6b656c3e78d?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Hero background - Home décor collection"
            fill
            className="object-cover object-center"
            priority
            quality={95}
          />
          {/* Brown/sepia overlay to match StaySixteen aesthetic */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-teal-900/30 to-black/70"></div>
        </div>

        {/* Content Container - Centered */}
        <div className="relative z-10 flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 pb-20">
          <div className="text-center max-w-5xl mx-auto pt-20">
            {/* Main Heading - Large, Bold, Centered */}
            <h1 className="mb-6 text-white drop-shadow-lg">
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none">
                Elevate Your Living Space
              </span>
            </h1>

            <Link
              href="/shop"
              className="inline-block bg-white text-black px-10 sm:px-12 py-3.5 sm:py-4 text-sm sm:text-base font-medium uppercase tracking-wider hover:bg-seaBlue-DEFAULT transition-all duration-300 shadow-lg hover:shadow-xl rounded-sm"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Overlapping Category Strip */}
      <HeroCategoryStrip />
    </>
  );
};

export default Hero;
