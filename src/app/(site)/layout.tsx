import "../css/euclid-circular-a-font.css";
import "../css/style.css";
import type { Metadata } from "next";
import ClientLayout from "./ClientLayout";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.obaapaessentials.com"),
  title: "Obaapa Essentials | Fashion, Food, Spices & Wellness – Ghana",
  description:
    "Shop authentically Ghanaian fashion, pantry staples, spices, teas, and wellness essentials at Obaapa Essentials — everyday pieces rooted in culture.",
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
