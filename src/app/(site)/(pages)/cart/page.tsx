import React from "react";
import Cart from "@/components/Cart";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Cart | Obaapa Essentials",
  description: "View and manage the items in your shopping cart on Obaapa Essentials.",
  robots: {
    index: false,
    follow: false,
  },
};

const CartPage = () => {
  return (
    <>
      <Cart />
    </>
  );
};

export default CartPage;
