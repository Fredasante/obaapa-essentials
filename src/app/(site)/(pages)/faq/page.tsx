"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import Link from "next/link";
import React, { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is Hedlorm?",
      answer:
        "Hedlorm is a Ghana-based online home décor store offering a curated selection of artificial flowers, vases, pots, scented candles, diffusers, wall frames, and other décor pieces. We help you transform your living space into something truly beautiful and inspiring.",
    },
    {
      question: "What makes your products different from other stores?",
      answer:
        "Every item in our collection is handpicked to ensure it meets our high standards of design, quality, and aesthetic appeal. We don't just stock generic items — we curate pieces that complement each other and elevate any space. Each product is tested and approved before it reaches you, ensuring that your home décor investment is worth every cedi.",
    },
    {
      question: "What types of products do you offer?",
      answer:
        "We offer a wide range of home décor items including artificial flowers, natural flowers, vases, pots, decorative pieces, diffusers, scented candles, wall frames, and more. Whether you're looking to add a subtle touch of elegance or completely transform a room, we have carefully selected options to suit your style.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Our standard delivery within Accra and major cities in Ghana takes 1 to 2 working days. Once your order is processed, it is carefully packaged to protect fragile items and dispatched right away. You will receive tracking information as soon as your order ships.",
    },
    {
      question: "What is your return policy?",
      answer:
        "Your satisfaction is our top priority. If you're not completely happy with your purchase or if an item arrives damaged, please contact our customer service team for information about returns and exchanges. We're dedicated to ensuring you have an exceptional shopping experience.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "Our dedicated customer service team is always ready to assist you. Whether you need help selecting the perfect décor piece, have questions about your order, or need styling advice, we're here for you. Reach us through our contact page and we'll respond as quickly as possible.",
    },
    {
      question: "Do you deliver outside Ghana?",
      answer:
        "We're currently focused on delivering within Ghana, but we're working to expand our shipping options to serve customers across West Africa. Please contact our customer service team with your location, and we'll let you know the available options.",
    },
    {
      question: "How do you ensure quality?",
      answer:
        "Quality is our first priority. Each product is selected for its exceptional craftsmanship and aesthetic value. We personally inspect and approve every item before adding it to our collection. Only the finest materials and designs make it into our store, ensuring your décor pieces look stunning and last.",
    },
    {
      question: "What is your promise to customers?",
      answer:
        "When you shop at Hedlorm, you're not just buying a décor piece — you're investing in the atmosphere and beauty of your home. We promise to deliver quality products that make your space feel amazing, with service that exceeds your expectations. Your satisfaction is our top priority.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Breadcrumb title={"FAQ"} pages={["faq"]} />

      <section className="overflow-hidden py-10 bg-[#F7F8FA] md:pb-10 lg:pb-20">
        <div className="max-w-[970px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="font-bold text-2xl md:text-4xl text-dark mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto">
              Have questions? We&apos;ve got answers! Find everything you need
              to know about Hedlorm.
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="bg-white rounded-xl shadow-1 overflow-hidden">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-200 last:border-b-0"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-6 sm:p-7.5 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="font-semibold text-base sm:text-lg text-dark pr-4">
                    {faq.question}
                  </h3>
                  <div className="shrink-0">
                    <svg
                      className={`transform transition-transform duration-300 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="#C85A1F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="px-6 sm:px-7.5 pb-6 sm:pb-7.5">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 text-center bg-white rounded-xl shadow-1 p-8">
            <h3 className="font-semibold text-xl text-dark mb-3">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Can&apos;t find the answer you&apos;re looking for? Our customer
              support team is here to help!
            </p>
            <Link
              href="/contact"
              className="bg-seaBlue-dark text-white font-medium px-8 py-3 rounded-lg hover:bg-opacity-90 transition-colors duration-200"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;
