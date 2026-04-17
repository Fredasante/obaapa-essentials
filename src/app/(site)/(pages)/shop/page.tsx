import React, { Suspense } from "react";
import ShopWithSidebar from "@/components/ShopWithSidebar";
import { Metadata } from "next";
import LoadingFallback from "@/components/Common/LoadingFallback";

export const metadata: Metadata = {
  title: "Shop | Obaapa Essentials",
  description:
    "Explore our curated collection of fashion, foods, spices, teas, and wellness essentials — rooted in Ghana, made for you.",
  keywords: [
    "Obaapa Essentials",
    "Ghanaian fashion",
    "African foods",
    "spices",
    "herbal teas",
    "wellness essentials",
    "shop Ghana",
  ],
  openGraph: {
    title: "Shop | Obaapa Essentials",
    description:
      "Browse fashion, foods, spices, teas, and wellness essentials — only at Obaapa Essentials.",
    url: "https://obaapaessentials.com/shop",
    siteName: "Obaapa Essentials",
    type: "website",
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
