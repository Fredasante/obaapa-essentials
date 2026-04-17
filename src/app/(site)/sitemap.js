import { groq } from "next-sanity";
import { client } from "@/sanity/client";

export default async function sitemap() {
  const baseUrl = "https://www.obaapaessentials.com";

  // Fetch product slugs from Sanity
  const productSlugs = await client.fetch(
    groq`*[_type == "product" && defined(slug.current)]{
      "slug": slug.current,
      _updatedAt
    }`,
  );

  const productUrls = productSlugs.map((item) => ({
    url: `${baseUrl}/shop/${item.slug}`,
    lastModified: item._updatedAt || new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.6,
    },

    // Dynamic Sanity product pages
    ...productUrls,
  ];
}
