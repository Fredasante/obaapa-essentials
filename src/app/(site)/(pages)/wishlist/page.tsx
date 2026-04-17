import React from "react";
import { Wishlist } from "@/components/Wishlist";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wishlist | Obaapa Essentials",
  description:
    "View and manage your favourite essentials saved on Obaapa Essentials.",
  robots: {
    index: false,
    follow: false,
  },
};

const WishlistPage = () => {
  return (
    <main>
      <Wishlist />
    </main>
  );
};

export default WishlistPage;
