"use client";

import SearchInput from "@/components/Header/SearchInput";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-green-light-6 via-white to-white pb-4 lg:pb-6">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-7.5 xl:px-12 pt-12 lg:pt-12">
        <div className="flex flex-col items-center text-center gap-6 max-w-[640px] mx-auto">
          <div className="w-full">
            <SearchInput />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
