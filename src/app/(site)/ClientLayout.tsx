"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
// import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { ModalProvider } from "../context/QuickViewModalContext";
import { CartModalProvider } from "../context/CartSidebarModalContext";
import { ReduxProvider } from "@/redux/provider";
import QuickViewModal from "@/components/Common/QuickViewModal";
import CartSidebarModal from "@/components/Common/CartSidebarModal";
import { PreviewSliderProvider } from "../context/PreviewSliderContext";
import PreviewSliderModal from "@/components/Common/PreviewSlider";
import ScrollToTop from "@/components/Common/ScrollToTop";
import PreLoader from "@/components/Common/PreLoader";
import { Toaster } from "sonner";
import HeaderNew from "@/components/Header/HeaderHero";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  const hideLayoutRoutes = ["/studio", "/admin"];
  const hideLayout = hideLayoutRoutes.some((route) =>
    pathname.startsWith(route),
  );

  useEffect(() => {
    if (!hideLayout) {
      const timer = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [hideLayout]);

  if (loading) {
    return <PreLoader />;
  }

  return (
    <ReduxProvider>
      <CartModalProvider>
        <ModalProvider>
          <PreviewSliderProvider>
            <div className="min-h-screen flex flex-col">
              {!hideLayout && <HeaderNew />}

              <main className="flex-1 bg-[#F7F8FA]">{children}</main>

              {!hideLayout && <Footer />}
            </div>

            <QuickViewModal />
            <CartSidebarModal />
            <PreviewSliderModal />
          </PreviewSliderProvider>
        </ModalProvider>
      </CartModalProvider>

      <Toaster richColors position="top-right" />
      {!hideLayout && <ScrollToTop />}
    </ReduxProvider>
  );
}
