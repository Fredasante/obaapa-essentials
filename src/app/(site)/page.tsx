import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hedlorm | Home Décor & Lifestyle – Ghana",
  description:
    "Discover beautiful home décor, artificial flowers, vases, scented candles, and more at Hedlorm. Shop quality pieces to transform your space.",
  keywords: [
    "Hedlorm",
    "home decor",
    "artificial flowers",
    "vases",
    "scented candles",
    "decor pieces",
    "Ghana home decor",
  ],
  authors: [{ name: "Hedlorm" }],
  openGraph: {
    title: "Hedlorm | Home Décor & Lifestyle – Ghana",
    description:
      "Shop beautiful home décor, flowers, vases, candles, and more at Hedlorm. Quality pieces to elevate your living space.",
    url: "https://hedlorm.com",
    siteName: "Hedlorm",
    images: [
      {
        url: "/hedlorm-logo.png",
        width: 1200,
        height: 630,
        alt: "Hedlorm Home Décor Store",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function HomePage() {
  return <Home />;
}
