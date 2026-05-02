import Link from "next/link";
import { Package, Phone, Truck } from "lucide-react";

const POLICY_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Shipping", href: "/shipping" },
] as const;

const UtilityBar = () => {
  return (
    <div className="bg-white border-b border-gray-3">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-7.5 xl:px-12">
        <div className="flex items-center justify-center lg:justify-between py-2 text-sm font-medium text-dark">
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-x-5 gap-y-1 leading-snug text-center">
            <p className="uppercase tracking-wide text-balance">
              <Truck
                className="inline-block w-3.5 h-3.5 mr-1.5 align-[-3px] text-primary"
                aria-hidden="true"
              />
              Standard Delivery Within 1 to 2 Working Days
            </p>
            <p>
              <Phone
                className="inline-block w-3.5 h-3.5 mr-1.5 align-[-3px] text-primary"
                aria-hidden="true"
              />
              Call us:{" "}
              <span className="font-semibold">0535908290</span>
            </p>
            <p className="text-balance">
              <Package
                className="inline-block w-3.5 h-3.5 mr-1.5 align-[-3px] text-primary"
                aria-hidden="true"
              />
              Wholesale Terms: Minimum of five(5) items contact{" "}
              <span className="font-semibold">0535908290</span>
            </p>
          </div>

          <ul className="hidden lg:flex items-center gap-5">
            {POLICY_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-primary transition-colors"
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
