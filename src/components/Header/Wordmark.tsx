import Link from "next/link";

type WordmarkProps = {
  size?: "sm" | "md";
};

const SIZE_CLASSES = {
  sm: "text-lg",
  md: "text-lg sm:text-xl lg:text-2xl xl:text-3xl",
} as const;

const Wordmark = ({ size = "md" }: WordmarkProps) => {
  return (
    <Link
      href="/"
      aria-label="Obaapa Essentials - Home"
      className={`font-bold tracking-tight text-[#81c408] hover:text-[#6ba306] transition-colors ${SIZE_CLASSES[size]}`}
    >
      Obaapa Essentials
    </Link>
  );
};

export default Wordmark;
