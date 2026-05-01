import Link from "next/link";
import { Phone, Truck } from "lucide-react";

const POLICY_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Shipping", href: "/shipping" },
] as const;

const UtilityBar = () => {
  return (
    <div className="bg-[#8E1A5C]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-7.5 xl:px-12">
        <div className="flex items-center justify-center lg:justify-between py-2 text-xs font-medium text-white">
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-x-5 gap-y-1">
            <div className="flex items-center gap-2 order-1 text-sm uppercase">
              <Truck className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
              <span className="text-center">Standard Delivery Within 1 to 2 Working Days</span>
            </div>
            <div className="flex items-center gap-2 order-2">
              <Phone className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="text-sm">
                Call us:{" "}
                <span className="text-base sm:text-sm font-semibold">0535908290</span>
              </span>
            </div>
          </div>

          <ul className="hidden lg:flex items-center gap-5">
            {POLICY_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-dark transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UtilityBar;
