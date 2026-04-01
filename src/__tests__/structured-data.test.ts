import { describe, it, expect } from "vitest";
import {
  getBreadcrumbJsonLd,
  softwareApplicationJsonLd,
} from "@/app/structured-data";

describe("structured-data", () => {
  describe("getBreadcrumbJsonLd", () => {
    it("generates breadcrumb JSON-LD with empty items", () => {
      const result = getBreadcrumbJsonLd([]);
      expect(result["@context"]).toBe("https://schema.org");
      expect(result["@type"]).toBe("BreadcrumbList");
      expect(result.itemListElement).toHaveLength(1);
      expect(result.itemListElement[0]).toEqual({
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://forgespace.co",
      });
    });

    it("generates breadcrumb JSON-LD with multiple items", () => {
      const items = [
        { name: "Features", path: "/features" },
        { name: "Pricing", path: "/pricing" },
      ];
      const result = getBreadcrumbJsonLd(items);
      expect(result.itemListElement).toHaveLength(3);
      expect(result.itemListElement[1]).toEqual({
        "@type": "ListItem",
        position: 2,
        name: "Features",
        item: "https://forgespace.co/features",
      });
      expect(result.itemListElement[2]).toEqual({
        "@type": "ListItem",
        position: 3,
        name: "Pricing",
        item: "https://forgespace.co/pricing",
      });
    });
  });

  describe("softwareApplicationJsonLd", () => {
    it("has correct structure", () => {
      expect(softwareApplicationJsonLd["@context"]).toBe(
        "https://schema.org"
      );
      expect(softwareApplicationJsonLd["@type"]).toBe("SoftwareApplication");
      expect(softwareApplicationJsonLd.name).toBe("Forge Space");
      expect(softwareApplicationJsonLd.offers.price).toBe("0");
    });
  });
});
