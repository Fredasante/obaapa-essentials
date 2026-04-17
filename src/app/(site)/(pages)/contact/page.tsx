import Contact from "@/components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Hedlorm",
  description:
    "Get in touch with Hedlorm for inquiries, orders, or support. We'd love to hear from you!",
};

const ContactPage = () => {
  return (
    <main>
      <Contact />
    </main>
  );
};

export default ContactPage;
