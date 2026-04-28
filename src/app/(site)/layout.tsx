import "../css/euclid-circular-a-font.css";
import "../css/style.css";
import type { Metadata } from "next";
import ClientLayout from "./ClientLayout";
import { ClerkProvider } from "@clerk/nextjs";

const SITE_URL = "https://www.obaapaessentials.com";
const SITE_NAME = "Obaapa Essentials";
const DEFAULT_TITLE =
  "Obaapa Essentials | Fashion, Food, Spices & Wellness – Ghana";
const DEFAULT_DESCRIPTION =
  "Shop authentically Ghanaian fashion, pantry staples, spices, teas, and wellness essentials at Obaapa Essentials — everyday pieces rooted in culture.";
const SHARE_IMAGE = "/obaapa-essentials-logo.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Obaapa Essentials",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_GH",
    url: SITE_URL,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: SHARE_IMAGE,
        width: 1200,
        height: 630,
        alt: "Obaapa Essentials",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [SHARE_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}${SHARE_IMAGE}`,
  email: "essentialsobaapa@gmail.com",
  telephone: "+233535908290",
  address: {
    "@type": "PostalAddress",
    addressCountry: "GH",
  },
  sameAs: [
    "https://facebook.com/obaapaessentials",
    "https://instagram.com/obaapa_essentials",
  ],
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
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(organizationJsonLd).replace(
                /</g,
                "\\u003c",
              ),
            }}
          />
          <ClientLayout>{children}</ClientLayout>
        </body>
      </html>
    </ClerkProvider>
  );
}
