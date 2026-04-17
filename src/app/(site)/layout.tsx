import "../css/euclid-circular-a-font.css";
import "../css/style.css";
import type { Metadata } from "next";
import ClientLayout from "./ClientLayout";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Hedlorm | Home Décor & Clothing",
  description:
    "Shop home décor, artificial flowers, vases, scented candles, dresses, suits, and more at Hedlorm. Quality pieces and fashion for your lifestyle in Ghana.",
  icons: {
    icon: "/hedlorm-logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <ClientLayout>{children}</ClientLayout>
        </body>
      </html>
    </ClerkProvider>
  );
}
