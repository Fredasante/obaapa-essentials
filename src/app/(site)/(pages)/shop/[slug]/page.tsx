import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ShopDetails from "@/components/ShopDetails";
import { getProductBySlug } from "@/sanity/groq";
import { client } from "@/sanity/client";
import type { Product } from "@/types/product";

const SITE_URL = "https://www.obaapaessentials.com";

export const revalidate = 60;

export async function generateStaticParams() {
  const products = await client.fetch<{ slug: string }[]>(
    `*[_type == "product"]{ "slug": slug.current }`,
  );

  return products.map((product) => ({
    slug: product.slug,
  }));
}

function extractPlainDescription(
  description: Product["description"],
  fallback = "Shop this product at Obaapa Essentials.",
): string {
  if (!description) return fallback;
  if (typeof description === "string") {
    return description.slice(0, 160) || fallback;
  }
  if (Array.isArray(description)) {
    const text = description
      .filter((block: any) => block._type === "block")
      .map(
        (block: any) =>
          block.children?.map((child: any) => child.text).join("") || "",
      )
      .join(" ")
      .trim();
    return text.slice(0, 160) || fallback;
  }
  return fallback;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
      robots: { index: false, follow: false },
    };
  }

  const description = extractPlainDescription(product.description);
  const productUrl = `/shop/${slug}`;

  return {
    title: product.name,
    description,
    alternates: { canonical: productUrl },
    openGraph: {
      type: "website",
      title: `${product.name} | Obaapa Essentials`,
      description,
      url: productUrl,
      images: product.mainImageUrl
        ? [{ url: product.mainImageUrl, alt: product.name }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Obaapa Essentials`,
      description,
      images: product.mainImageUrl ? [product.mainImageUrl] : undefined,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const description = extractPlainDescription(product.description);
  const productUrl = `${SITE_URL}/shop/${slug}`;
  const offerPrice = product.discountPrice ?? product.price;
  const inStock = (product.stockQuantity ?? 0) > 0;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description,
    image: product.mainImageUrl ? [product.mainImageUrl] : undefined,
    sku: product._id,
    category: product.category,
    brand: { "@type": "Brand", name: "Obaapa Essentials" },
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "GHS",
      price: offerPrice,
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Shop",
        item: `${SITE_URL}/shop`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: productUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ShopDetails product={product} />
    </>
  );
}
