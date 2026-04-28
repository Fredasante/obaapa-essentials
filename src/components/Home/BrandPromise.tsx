import {
  Sparkles,
  ShieldCheck,
  Truck,
  MessageCircle,
} from "lucide-react";

type Promise = {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  tint: "primary" | "accent";
};

const promises: Promise[] = [
  {
    Icon: Sparkles,
    title: "Hand-curated",
    desc: "Each item personally chosen for its quality",
    tint: "primary",
  },
  {
    Icon: ShieldCheck,
    title: "Paystack secure",
    desc: "Bank-grade encryption on every order",
    tint: "accent",
  },
  {
    Icon: Truck,
    title: "Nationwide delivery",
    desc: "Doorstep across Ghana",
    tint: "primary",
  },
  {
    Icon: MessageCircle,
    title: "WhatsApp support",
    desc: "Reply within minutes",
    tint: "accent",
  },
];

const BrandPromise = () => {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-[1240px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {promises.map((promise, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  promise.tint === "primary"
                    ? "bg-[#FEF3E7] text-primary"
                    : "bg-[#F4FAE4] text-accent"
                }`}
              >
                <promise.Icon className="w-5 h-5" />
              </div>
              <h3 className="text-sm md:text-base font-semibold text-dark mb-1.5 leading-tight">
                {promise.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                {promise.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandPromise;
