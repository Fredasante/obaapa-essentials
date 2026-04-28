import type { Metadata } from "next";
import Faq from "@/components/Faq";
import { faqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about shopping with Obaapa Essentials — orders, delivery, returns, quality, and customer support.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ | Obaapa Essentials",
    description:
      "Answers to common questions about shopping with Obaapa Essentials.",
    url: "/faq",
  },
};

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Faq />
    </>
  );
}
