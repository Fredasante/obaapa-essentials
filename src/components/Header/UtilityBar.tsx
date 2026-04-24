import Link from "next/link";
import { Truck } from "lucide-react";

const POLICY_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Shipping", href: "/shipping" },
] as const;

const UtilityBar = () => {
  return (
    <div className="bg-[#81c408]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-7.5 xl:px-12">
        <div className="flex items-center justify-center lg:justify-between py-2 text-xs font-medium text-white">
          <div className="flex items-center gap-2">
            <Truck className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Call us: 0535908290</span>
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
