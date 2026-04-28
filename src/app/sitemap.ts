import type { MetadataRoute } from "next";
import { groq } from "next-sanity";
import { client } from "@/sanity/client";

export const revalidate = 3600;

const baseUrl = "https://www.obaapaessentials.com";

const staticEntries: MetadataRoute.Sitemap = [
  {
    url: `${baseUrl}/`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1.0,
  },
  {
    url: `${baseUrl}/shop`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    url: `${baseUrl}/about`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    url: `${baseUrl}/contact`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    url: `${baseUrl}/faq`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  },
];

type ProductSlug = { slug: string; _updatedAt: string };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const productSlugs = await client.fetch<ProductSlug[]>(
      groq`*[_type == "product" && defined(slug.current)]{
        "slug": slug.current,
        _updatedAt
      }`,
    );

    const productUrls: MetadataRoute.Sitemap = productSlugs.map((item) => ({
      url: `${baseUrl}/shop/${item.slug}`,
      lastModified: item._updatedAt ? new Date(item._updatedAt) : new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    return [...staticEntries, ...productUrls];
  } catch (error) {
    console.error("[sitemap] failed to fetch product slugs from Sanity:", error);
    return staticEntries;
  }
}
