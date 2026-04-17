"use client";

import React from "react";

import Breadcrumb from "../Common/Breadcrumb";

const Contact = () => {
  return (
    <>
      <Breadcrumb title={"Contact Us"} pages={["contact"]} />

      <section className="py-10 md:py-20">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* Contact Info */}
            <div className="lg:w-1/3">
              <h2 className="text-[27px] md:text-3xl font-bold text-dark mb-4 md:mb-6">
                Get in Touch
              </h2>
              <p className="text-gray-600 mb-10 text-lg">
                Have a question or need assistance? We&apos;re here to help!
                Reach out to us through any of the channels below.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-lg bg-seaBlue-dark/10 flex items-center justify-center text-seaBlue-dark group-hover:bg-seaBlue-dark group-hover:text-white transition-colors duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark text-lg mb-1">
                      Phone Number
                    </h4>
                    <a
                      href="tel:+233599287889"
                      className="text-gray-600 hover:text-seaBlue-dark transition-colors"
                    >
                      059 928 7889
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-lg bg-seaBlue-dark/10 flex items-center justify-center text-seaBlue-dark group-hover:bg-seaBlue-dark group-hover:text-white transition-colors duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark text-lg mb-1">
                      Email Address
                    </h4>
                    <a
                      href="mailto:obaapaessentials@gmail.com"
                      className="text-gray-600 hover:text-seaBlue-dark transition-colors"
                    >
                      obaapaessentials@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-lg bg-seaBlue-dark/10 flex items-center justify-center text-seaBlue-dark group-hover:bg-seaBlue-dark group-hover:text-white transition-colors duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark text-lg mb-1">
                      Location
                    </h4>
                    <p className="text-gray-600">Accra, Ghana</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                <form action="" method="POST">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="mb-2.5 block font-medium text-dark"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        required
                        placeholder="John Doe"
                        className="w-full rounded-lg bg-[#F7F8FA] px-4 py-3 text-dark outline-none focus:ring-1 focus:ring-seaBlue-dark transition-all"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2.5 block font-medium text-dark"
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        placeholder="john@example.com"
                        className="w-full rounded-lg bg-[#F7F8FA] px-4 py-3 text-dark outline-none focus:ring-1 focus:ring-seaBlue-dark transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-2.5 block font-medium text-dark"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        placeholder="+233 00 000 0000"
                        className="w-full rounded-lg bg-[#F7F8FA] px-4 py-3 text-dark outline-none focus:ring-1 focus:ring-seaBlue-dark transition-all"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="mb-2.5 block font-medium text-dark"
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        id="subject"
                        placeholder="How can we help?"
                        className="w-full rounded-lg bg-[#F7F8FA] px-4 py-3 text-dark outline-none focus:ring-1 focus:ring-seaBlue-dark transition-all"
                      />
                    </div>
                  </div>

                  <div className="mb-8">
                    <label
                      htmlFor="message"
                      className="mb-2.5 block font-medium text-dark"
                    >
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      name="message"
                      id="message"
                      required
                      placeholder="How can we help you?"
                      className="w-full rounded-lg bg-[#F7F8FA] px-4 py-3 text-dark outline-none focus:ring-1 focus:ring-seaBlue-dark transition-all resize-none"
                    />
                  </div>

                  {/* Optional hidden metadata */}
                  <input
                    type="hidden"
                    name="_subject"
                    value="New Contact Message from Website"
                  />

                  <button
                    type="submit"
                    className="w-full md:w-auto inline-flex items-center justify-center font-bold text-white bg-seaBlue-dark py-4 px-10 rounded-lg hover:bg-[#008B8B] transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="mt-20 rounded-2xl overflow-hidden shadow-md h-[450px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127066.72272976134!2d-0.26213223044853146!3d5.591373809759278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9084b2b7a773%3A0xbed14ed8650e2dd3!2sAccra!5e0!3m2!1sen!2sgh!4v1770933530200!5m2!1sen!2sgh"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Obaapa Essentials Location"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};
export default Contact;
