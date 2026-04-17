import Signin from "@/components/Auth/Signin";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Hedlorm",
  description:
    "Access your Hedlorm account to track orders, manage your wishlist, and enjoy a personalised shopping experience.",
  robots: {
    index: false,
    follow: false,
  },
};

const SigninPage = () => {
  return (
    <main>
      <Signin />
    </main>
  );
};

export default SigninPage;
