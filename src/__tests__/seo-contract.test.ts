import { describe, expect, it } from "vitest";
import { getPageMetadata } from "@/app/seo";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { FAQ_ITEMS, getPricingFaqJsonLd } from "@/app/pricing/faq";
import {
  globalStructuredData,
  softwareApplicationJsonLd,
} from "@/app/structured-data";

describe("SEO metadata contract", () => {
  const routes = [
    { slug: "home" as const, canonical: "https://forgespace.co" },
    { slug: "features" as const, canonical: "https://forgespace.co/features" },
    { slug: "pricing" as const, canonical: "https://forgespace.co/pricing" },
    { slug: "ecosystem" as const, canonical: "https://forgespace.co/ecosystem" },
    { slug: "roadmap" as const, canonical: "https://forgespace.co/roadmap" },
    { slug: "enterprise" as const, canonical: "https://forgespace.co/enterprise" },
  ];

  it("provides canonical, open graph URL, and twitter metadata per route", () => {
    for (const route of routes) {
      const metadata = getPageMetadata(route.slug);
      const openGraph = metadata.openGraph as { url?: string } | undefined;
      const twitter = metadata.twitter as { title?: string } | undefined;

      expect(metadata.alternates?.canonical).toBe(route.canonical);
      expect(openGraph?.url).toBe(route.canonical);
      expect(typeof metadata.description).toBe("string");
      expect((metadata.description ?? "").length).toBeGreaterThan(0);
      expect((twitter?.title ?? "").length).toBeGreaterThan(0);
    }
  });

  it("uses unique descriptions across indexable routes", () => {
    const descriptions = routes.map((route) => getPageMetadata(route.slug).description);
    const uniqueDescriptions = new Set(descriptions);

    expect(uniqueDescriptions.size).toBe(routes.length);
  });
});

describe("Sitemap and robots", () => {
  it("includes only canonical marketing routes with deterministic lastModified", () => {
    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(urls).toEqual([
      "https://forgespace.co",
      "https://forgespace.co/features",
      "https://forgespace.co/pricing",
      "https://forgespace.co/ecosystem",
      "https://forgespace.co/roadmap",
      "https://forgespace.co/enterprise",
      "https://forgespace.co/startups",
    ]);

    for (const entry of entries) {
      expect((entry.lastModified as Date).toISOString()).toBe("2026-03-11T00:00:00.000Z");
    }
  });

  it("publishes sitemap and blocks internal next assets", () => {
    const config = robots();
    const firstRule = Array.isArray(config.rules) ? config.rules[0] : undefined;

    expect(config.sitemap).toBe("https://forgespace.co/sitemap.xml");
    expect(config.host).toBe("https://forgespace.co");
    expect(firstRule?.allow).toBe("/");
    expect(firstRule?.disallow).toContain("/_next/");
  });
});

describe("Structured data", () => {
  it("contains global Organization and WebSite JSON-LD", () => {
    const graph = globalStructuredData["@graph"];

    expect(globalStructuredData["@context"]).toBe("https://schema.org");
    expect(Array.isArray(graph)).toBe(true);
    expect(graph.some((item) => item["@type"] === "Organization")).toBe(true);
    expect(graph.some((item) => item["@type"] === "WebSite")).toBe(true);
  });

  it("contains homepage SoftwareApplication JSON-LD", () => {
    expect(softwareApplicationJsonLd["@context"]).toBe("https://schema.org");
    expect(softwareApplicationJsonLd["@type"]).toBe("SoftwareApplication");
    expect(softwareApplicationJsonLd.url).toBe("https://forgespace.co");
    expect(softwareApplicationJsonLd.offers.price).toBe("0");
  });

  it("builds FAQPage JSON-LD from visible pricing FAQs", () => {
    const schema = getPricingFaqJsonLd();

    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity).toHaveLength(FAQ_ITEMS.length);
    expect(schema.mainEntity[0]["@type"]).toBe("Question");
    expect(schema.mainEntity[0].acceptedAnswer["@type"]).toBe("Answer");
  });
});
