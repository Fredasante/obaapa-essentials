// app/search/page.tsx
import { Suspense } from "react";
import SearchPage from "@/components/Search/SearchPage";
import { ClipLoader } from "react-spinners";

export const metadata = {
  title: "Search Products | Obaapa Essentials",
  description: "Search for products in our store",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <ClipLoader size={40} color="#F27430" />
        </div>
      }
    >
      <SearchPage />
    </Suspense>
  );
}
