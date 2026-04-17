"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import Link from "next/link";
import React, { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is Obaapa Essentials?",
      answer:
        "Obaapa Essentials is a Ghana-based online lifestyle store offering a curated selection of fashion pieces, foods, spices, herbal teas, and wellness essentials. We bring authentically Ghanaian goods to your home — everyday essentials rooted in culture.",
    },
    {
      question: "What makes your products different from other stores?",
      answer:
        "Every item in our collection is handpicked to ensure it meets our standards for quality, origin, and authenticity. We work with trusted local makers and suppliers so that each piece — whether it's a fabric, a spice blend, or a tea — carries a real story from its source.",
    },
    {
      question: "What types of products do you offer?",
      answer:
        "We offer five categories: Fashion (ready-to-wear and traditional pieces), Foods (pantry staples and heritage ingredients), Spices (blends and single-origin), Teas and Herbs (wellness brews and infusions), and Others (seasonal picks and hidden gems).",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Standard delivery within Accra and major cities in Ghana takes 1 to 2 working days. Once your order is processed, it is carefully packaged and dispatched. You will receive tracking information as soon as your order ships.",
    },
    {
      question: "What is your return policy?",
      answer:
        "Your satisfaction is our top priority. If you're not completely happy with your purchase or if an item arrives damaged, please contact our customer service team for returns and exchanges. Food and perishables follow a separate policy — please check the product page.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "Our customer service team is always ready to assist you. Whether you need help choosing between two spice blends, have questions about your order, or want sizing advice, we're here. Reach us through our contact page and we'll respond as quickly as possible.",
    },
    {
      question: "Do you deliver outside Ghana?",
      answer:
        "We're currently focused on delivering within Ghana, but we're working to expand our shipping options to serve customers across West Africa and the diaspora. Please contact our customer service team with your location, and we'll let you know the available options.",
    },
    {
      question: "How do you ensure quality?",
      answer:
        "Quality is our first priority. Each product is personally inspected and approved before joining our collection. We work directly with makers and suppliers we trust, so that the fabrics you wear and the foods you cook carry the care they were made with.",
    },
    {
      question: "What is your promise to customers?",
      answer:
        "When you shop at Obaapa Essentials, you're buying more than a product — you're supporting makers who put care into everyday essentials. We promise quality goods, honest service, and a shopping experience that respects your time and trust.",
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
              to know about Obaapa Essentials.
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
