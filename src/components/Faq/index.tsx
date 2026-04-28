"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import Link from "next/link";
import React, { useState } from "react";
import { faqs } from "@/data/faqs";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
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
                        stroke="#F27430"
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

export default Faq;
