import React, { Suspense } from "react";
import ShopWithSidebar from "@/components/ShopWithSidebar";
import type { Metadata } from "next";
import LoadingFallback from "@/components/Common/LoadingFallback";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Explore our curated collection of fashion, foods, spices, teas, and wellness essentials — rooted in Ghana, made for you.",
  alternates: { canonical: "/shop" },
  openGraph: {
    title: "Shop | Obaapa Essentials",
    description:
      "Browse fashion, foods, spices, teas, and wellness essentials — only at Obaapa Essentials.",
    url: "/shop",
  },
};

const ShopPage = () => {
  return (
    <main>
      <Suspense fallback={<LoadingFallback />}>
        <ShopWithSidebar />
      </Suspense>
    </main>
  );
};

export default ShopPage;
