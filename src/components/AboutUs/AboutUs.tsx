import React from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "../Common/Breadcrumb";

const AboutUs = () => {
  return (
    <>
      <Breadcrumb title={"About Us"} pages={["about"]} />

      {/* Our Story Section */}
      <section className="py-16 md:py-2">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000&auto=format&fit=crop"
                alt="Styling home decor"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div>
              <span className="text-seaBlue-dark font-semibold tracking-wider uppercase mb-2 block">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-6">
                Rooted in Ghana, Made for You
              </h2>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  Obaapa Essentials was founded with a simple belief: that
                  everyday life deserves pieces made with care, culture, and
                  conscience. What began as a love letter to Ghanaian
                  craftsmanship has grown into a home for thoughtful essentials
                  across fashion, food, and wellness.
                </p>
                <p>
                  We don&apos;t just sell products; we curate authentically
                  African goods that bring character and flavor to your life.
                  From handwoven fashion pieces to pantry-ready spices and
                  herbal teas, every item in our collection meets our standards
                  for quality and origin.
                </p>
                <p>
                  Our mission is to make everyday essentials — the fabrics you
                  wear, the foods you cook, the rituals that ground you — feel
                  truly rooted in who you are.
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100 flex items-center gap-4">
                <blockquote className="italic text-gray-500 border-l-4 border-[#81c408] pl-4">
                  &quot;The things we live with every day should carry a story
                  — of the hands that made them and the soil they come
                  from.&quot;
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us / Values */}
      <section className="py-16 md:py-24 bg-[#f8f9fa]">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[28px] md:text-4xl font-bold text-dark mb-4">
              Why Choose Obaapa Essentials?
            </h2>
            <p className="text-gray-600 text-lg">
              We&apos;re dedicated to providing an exceptional shopping
              experience from browsing to delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Premium Quality",
                desc: "Only the finest materials and craftsmanship make it into our collection.",
                icon: (
                  <path
                    d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                    fill="currentColor"
                  />
                ),
              },
              {
                title: "Fast Shipping",
                desc: "Quick and reliable delivery to get your essentials to you as soon as possible.",
                icon: (
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z M12 16V12 M12 8H12.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ),
              },
              {
                title: "Customer Support",
                desc: "Dedicated team ready to assist you with any questions or concerns.",
                icon: (
                  <path
                    d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ),
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-xl border border-gray-100 hover:border-seaBlue-dark hover:shadow-lg transition-all duration-300 group text-left"
              >
                <div className="mb-6 text-seaBlue-dark group-hover:scale-110 transition-transform duration-300 origin-left">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {item.icon}
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-dark mb-3 uppercase tracking-wide">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-base">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 bg-white relative overflow-hidden">
        <div className="max-w-[1170px] mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-6">
            Ready to Shop the Essentials?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-10">
            Explore our curated collection across fashion, foods, spices, teas,
            and wellness — rooted in Ghana, made for you.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center px-8 py-4 bg-seaBlue-dark text-white font-bold rounded-lg hover:bg-[#008B8B] transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Shop Collection
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
