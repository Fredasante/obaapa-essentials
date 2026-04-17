import React from "react";
import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white pt-16 pb-8 border-t-4 border-green-dark">
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <h2 className="text-2xl font-bold tracking-widest uppercase text-[#81c408]">
                Obaapa Essentials
              </h2>
            </Link>
            <p className="text-white/80 text-sm leading-relaxed max-w-xs">
              Fashion, foods, spices, teas, and wellness essentials — rooted
              in Ghana, made for you.
            </p>
          </div>

          {/* Shop Column */}
          <div>
            <h6 className="font-bold text-sm tracking-widest uppercase mb-6 text-white/90">
              Shop
            </h6>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/shop?category=all"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?sort=newest"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  New Arrivals
                </Link>
              </li>

              <li>
                <Link
                  href="/cart"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  My Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h6 className="font-bold text-sm tracking-widest uppercase mb-6 text-white/90">
              Support
            </h6>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/contact"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Socials Column */}
          <div>
            <h6 className="font-bold text-sm tracking-widest uppercase mb-6 text-white/90">
              Get In Touch
            </h6>
            <ul className="space-y-3 mb-6">
              <li>
                <a
                  href="mailto:hello@obaapaessentials.com"
                  className="text-white/80 hover:text-green-dark transition-colors text-sm flex items-center gap-3 group"
                >
                  <span className="w-8 h-8 rounded-full bg-green-dark/15 text-green-dark flex items-center justify-center flex-shrink-0 group-hover:bg-green-dark group-hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </span>
                  hello@obaapaessentials.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+233599287889"
                  className="text-white/80 hover:text-green-dark transition-colors text-sm flex items-center gap-3 group"
                >
                  <span className="w-8 h-8 rounded-full bg-green-dark/15 text-green-dark flex items-center justify-center flex-shrink-0 group-hover:bg-green-dark group-hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </span>
                  059 928 7889
                </a>
              </li>
            </ul>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/obaapaessentials"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-dark hover:text-white transition-all duration-300 group"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://facebook.com/obaapaessentials"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-dark hover:text-white transition-all duration-300 group"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://twitter.com/obaapaessentials"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-dark hover:text-white transition-all duration-300 group"
                aria-label="Twitter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a
                href="https://tiktok.com/@obaapaessentials"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-dark hover:text-white transition-all duration-300 group"
                aria-label="TikTok"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0 pt-8 border-t border-white/10">
          <p className="text-white/60 text-center text-sm">
            © {year} Obaapa Essentials. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
