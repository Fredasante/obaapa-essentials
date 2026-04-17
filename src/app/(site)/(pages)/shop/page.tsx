import React, { Suspense } from "react";
import ShopWithSidebar from "@/components/ShopWithSidebar";
import { Metadata } from "next";
import LoadingFallback from "@/components/Common/LoadingFallback";

export const metadata: Metadata = {
  title: "Shop | Hedlorm",
  description:
    "Explore our curated collection of home décor — artificial flowers, vases, pots, scented candles, diffusers, wall frames, and more at Hedlorm.",
  keywords: [
    "Hedlorm",
    "Home Décor Shop",
    "Artificial Flowers",
    "Vases",
    "Scented Candles",
    "Décor Ghana",
    "Wall Frames",
  ],
  openGraph: {
    title: "Shop | Hedlorm",
    description:
      "Browse beautiful home décor, flowers, vases, candles, and more — only at Hedlorm.",
    url: "https://hedlorm.com/shop",
    siteName: "Hedlorm",
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
