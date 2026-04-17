import React from "react";
import Cart from "@/components/Cart";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Cart | Hedlorm",
  description: "View and manage the items in your shopping cart on Hedlorm.",
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
