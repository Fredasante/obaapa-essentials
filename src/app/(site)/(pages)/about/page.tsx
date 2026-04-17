import AboutUs from "@/components/AboutUs/AboutUs";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Obaapa Essentials",
  description:
    "Discover Obaapa Essentials — a Ghanaian lifestyle store bringing you authentically-sourced fashion, foods, spices, teas, and wellness essentials.",
};

const AboutUsPage = () => {
  return (
    <main>
      <AboutUs />
    </main>
  );
};

export default AboutUsPage;
