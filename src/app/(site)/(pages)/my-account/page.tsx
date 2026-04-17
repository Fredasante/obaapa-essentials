import MyAccount from "@/components/MyAccount";
import React from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Account | Hedlorm",
  description:
    "Access and manage your Hedlorm account. Track orders, update your details, and view your purchase history all in one place.",
  robots: {
    index: false,
    follow: false,
  },
};

const MyAccountPage = () => {
  return (
    <main>
      <MyAccount />
    </main>
  );
};

export default MyAccountPage;
