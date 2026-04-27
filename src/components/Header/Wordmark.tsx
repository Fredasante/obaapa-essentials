import Link from "next/link";
import Image from "next/image";

type WordmarkProps = {
  size?: "sm" | "md";
};

const SIZE_DIMS = {
  sm: { width: 100, height: 35 },
  md: { width: 160, height: 54 },
} as const;

const Wordmark = ({ size = "md" }: WordmarkProps) => {
  const { width, height } = SIZE_DIMS[size];
  const responsiveClass =
    size === "md" ? "w-[140px] md:w-[160px] h-auto" : "h-auto";
  return (
    <Link href="/" aria-label="Obaapa Essentials - Home">
      <Image
        src="/obaapa-essentials-logo.png"
        alt="Obaapa Essentials"
        width={width}
        height={height}
        priority
        className={`object-contain ${responsiveClass}`}
      />
    </Link>
  );
};

export default Wordmark;
