"use client";

import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  Clock,
} from "lucide-react";

import Breadcrumb from "../Common/Breadcrumb";

type ContactMethod = {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  note: string;
  href: string | null;
  external?: boolean;
  tint: "primary" | "accent";
};

const contactMethods: ContactMethod[] = [
  {
    Icon: Phone,
    label: "Phone",
    value: "0535 908 290",
    note: "Call us, Mon–Sun",
    href: "tel:+233535908290",
    tint: "primary",
  },
  {
    Icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with us",
    note: "Fastest response",
    href: "https://wa.me/233535908290",
    external: true,
    tint: "accent",
  },
  {
    Icon: Mail,
    label: "Email",
    value: "essentialsobaapa@gmail.com",
    note: "We reply within 24h",
    href: "mailto:essentialsobaapa@gmail.com",
    tint: "primary",
  },
  {
    Icon: MapPin,
    label: "Based in",
    value: "Accra, Ghana",
    note: "Online store · nationwide delivery",
    href: null,
    tint: "accent",
  },
];

const Contact = () => {
  const inputClass =
    "w-full rounded-lg bg-[#F7F8FA] border border-transparent px-4 py-3 text-dark placeholder:text-dark-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all";

  return (
    <>
      <Breadcrumb title={"Contact Us"} pages={["contact"]} />

      {/* Intro */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-primary font-semibold tracking-[1.5px] uppercase text-xs sm:text-sm mb-3 block">
              Get in Touch
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4 leading-tight">
              We&apos;d love to hear from you
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              Have a question about a product, an order, or want to partner
              with us? Reach out through any channel below — we typically reply
              within a day.
            </p>
          </div>
        </div>
      </section>

      {/* Methods + form */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
            {/* Contact methods */}
            <div className="lg:col-span-2 space-y-4">
              {contactMethods.map((method) => {
                const inner = (
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                        method.tint === "primary"
                          ? "bg-[#FEF3E7] text-primary group-hover:bg-primary group-hover:text-white"
                          : "bg-[#F4FAE4] text-accent group-hover:bg-accent group-hover:text-white"
                      }`}
                    >
                      <method.Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs uppercase tracking-wider text-dark-4 mb-1">
                        {method.label}
                      </div>
                      <div className="font-semibold text-dark text-base mb-0.5 break-words">
                        {method.value}
                      </div>
                      <div className="text-xs text-gray-600">
                        {method.note}
                      </div>
                    </div>
                  </div>
                );

                if (!method.href) {
                  return (
                    <div
                      key={method.label}
                      className="bg-white rounded-2xl p-5 shadow-sm group"
                    >
                      {inner}
                    </div>
                  );
                }

                return (
                  <a
                    key={method.label}
                    href={method.href}
                    target={method.external ? "_blank" : undefined}
                    rel={
                      method.external ? "noopener noreferrer" : undefined
                    }
                    className="block bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group"
                  >
                    {inner}
                  </a>
                );
              })}

              {/* Response time card */}
              <div className="bg-[#FEF3E7] rounded-2xl p-5 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white text-primary flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-dark text-base mb-1">
                    Response time
                  </div>
                  <div className="text-sm text-gray-600 leading-relaxed">
                    We aim to reply to every message within 24 hours, often
                    sooner via WhatsApp.
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
                <div className="mb-6">
                  <h3 className="text-xl md:text-2xl font-bold text-dark mb-1.5">
                    Send a message
                  </h3>
                  <p className="text-sm text-gray-600">
                    Fill out the form and we&apos;ll get back to you as soon
                    as we can.
                  </p>
                </div>

                <form action="" method="POST">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="mb-2 block text-sm font-medium text-dark"
                      >
                        Full Name <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        required
                        placeholder="John Doe"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-dark"
                      >
                        Email Address{" "}
                        <span className="text-primary">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        placeholder="john@example.com"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-2 block text-sm font-medium text-dark"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        placeholder="+233 00 000 0000"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="mb-2 block text-sm font-medium text-dark"
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        id="subject"
                        placeholder="How can we help?"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-medium text-dark"
                    >
                      Message <span className="text-primary">*</span>
                    </label>
                    <textarea
                      rows={5}
                      name="message"
                      id="message"
                      required
                      placeholder="Tell us a bit about what you need…"
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <input
                    type="hidden"
                    name="_subject"
                    value="New Contact Message from Website"
                  />

                  <button
                    type="submit"
                    className="w-full md:w-auto inline-flex items-center justify-center gap-2 font-semibold text-white bg-primary hover:bg-primary-dark py-3.5 px-8 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                  >
                    Send Message
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
