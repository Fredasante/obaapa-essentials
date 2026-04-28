import type { MetadataRoute } from "next";

const baseUrl = "https://www.obaapaessentials.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/",
          "/api/",
          "/cart",
          "/checkout",
          "/my-account",
          "/order-success",
          "/signin",
          "/signup",
          "/wishlist",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
