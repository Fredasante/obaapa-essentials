import Contact from "@/components/Contact";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Obaapa Essentials for inquiries, orders, or support. We'd love to hear from you!",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | Obaapa Essentials",
    description:
      "Get in touch with Obaapa Essentials for inquiries, orders, or support.",
    url: "/contact",
  },
};

const ContactPage = () => {
  return (
    <main>
      <Contact />
    </main>
  );
};

export default ContactPage;
