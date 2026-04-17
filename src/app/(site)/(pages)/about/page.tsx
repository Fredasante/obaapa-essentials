import AboutUs from "@/components/AboutUs/AboutUs";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Hedlorm",
  description:
    "Discover Hedlorm — your go-to home décor destination in Ghana, offering beautiful, affordable, and high-quality décor pieces to transform any space.",
};

const AboutUsPage = () => {
  return (
    <main>
      <AboutUs />
    </main>
  );
};

export default AboutUsPage;
