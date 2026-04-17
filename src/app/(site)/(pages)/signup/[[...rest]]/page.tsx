import Signup from "@/components/Auth/Signup";
import React from "react";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Signup | Obaapa Essentials",
  description: "Create your account to start shopping with Obaapa Essentials",
  robots: {
    index: false,
    follow: false,
  },
};

const SignupPage = () => {
  return (
    <main>
      <Signup />
    </main>
  );
};

export default SignupPage;
