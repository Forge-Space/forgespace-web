import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/_next/"],
      },
    ],
    host: "https://forgespace.co",
    sitemap: "https://forgespace.co/sitemap.xml",
  };
}
