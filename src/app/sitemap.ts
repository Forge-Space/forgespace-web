import type { MetadataRoute } from "next";

const BASE_URL = "https://forgespace.co";
const LAST_MODIFIED = new Date("2026-03-11T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/features`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/pricing`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/ecosystem`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/roadmap`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/enterprise`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
