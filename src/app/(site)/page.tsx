import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Obaapa Essentials | Fashion, Food, Spices & Wellness – Ghana",
  description:
    "Shop authentically Ghanaian fashion, foods, spices, teas, and wellness essentials at Obaapa Essentials. Everyday pieces rooted in culture.",
  keywords: [
    "Obaapa Essentials",
    "Ghanaian fashion",
    "African foods",
    "spices Ghana",
    "herbal teas",
    "wellness",
    "Ghana online shop",
  ],
  authors: [{ name: "Obaapa Essentials" }],
  openGraph: {
    title: "Obaapa Essentials | Fashion, Food, Spices & Wellness – Ghana",
    description:
      "Shop authentically Ghanaian fashion, foods, spices, teas, and wellness essentials at Obaapa Essentials.",
    url: "https://obaapaessentials.com",
    siteName: "Obaapa Essentials",
    locale: "en_US",
    type: "website",
  },
};

export default function HomePage() {
  return <Home />;
}
