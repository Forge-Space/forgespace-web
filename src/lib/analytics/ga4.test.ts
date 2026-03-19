import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  FORGE_CTA_EVENTS,
  trackForgeCtaEvent,
  trackGa4Pageview,
  trackGadsConversion,
} from "@/lib/analytics/ga4";
import { getStoredFirstTouchAttribution } from "@/lib/analytics/first-touch-attribution";

vi.mock("@/lib/analytics/first-touch-attribution", () => ({
  getStoredFirstTouchAttribution: vi.fn(),
}));

describe("ga4 helpers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete (window as Window & { gtag?: unknown }).gtag;
  });

  it("does nothing for CTA tracking when gtag is unavailable", () => {
    vi.mocked(getStoredFirstTouchAttribution).mockReturnValue(null);

    expect(() => {
      trackForgeCtaEvent(FORGE_CTA_EVENTS.SIZA, { source: "hero" });
    }).not.toThrow();
  });

  it("sends CTA event with attribution when gtag exists", () => {
    const gtag = vi.fn();
    (window as Window & { gtag?: typeof gtag }).gtag = gtag;

    vi.mocked(getStoredFirstTouchAttribution).mockReturnValue({
      utm_source: "google",
      utm_medium: "cpc",
      utm_campaign: "spring",
      utm_term: "idp",
      utm_content: "hero",
      gclid: "gclid-123",
      gbraid: null,
      wbraid: null,
      landing_path: "/",
      first_seen_at: "2026-03-18T00:00:00.000Z",
    });

    trackForgeCtaEvent(FORGE_CTA_EVENTS.CONTACT_SALES, {
      cta_target: "contact_sales",
    });

    expect(gtag).toHaveBeenCalledWith("event", FORGE_CTA_EVENTS.CONTACT_SALES, {
      cta_target: "contact_sales",
      utm_source: "google",
      utm_medium: "cpc",
      utm_campaign: "spring",
      utm_term: "idp",
      utm_content: "hero",
      gclid: "gclid-123",
      gbraid: null,
      wbraid: null,
      landing_path: "/",
      first_seen_at: "2026-03-18T00:00:00.000Z",
    });
  });

  it("sends conversion event with send_to", () => {
    const gtag = vi.fn();
    (window as Window & { gtag?: typeof gtag }).gtag = gtag;

    trackGadsConversion("AW-123/abc", { value: 10 });

    expect(gtag).toHaveBeenCalledWith("event", "conversion", {
      send_to: "AW-123/abc",
      value: 10,
    });
  });

  it("does nothing for conversion/pageview when gtag is unavailable", () => {
    expect(() => {
      trackGadsConversion("AW-123/abc");
      trackGa4Pageview("G-123", "/pricing", "https://forgespace.co/pricing");
    }).not.toThrow();
  });

  it("sends GA4 pageview config when gtag exists", () => {
    const gtag = vi.fn();
    (window as Window & { gtag?: typeof gtag }).gtag = gtag;

    trackGa4Pageview("G-123", "/pricing?plan=pro", "https://forgespace.co/pricing?plan=pro");

    expect(gtag).toHaveBeenCalledWith("config", "G-123", {
      page_path: "/pricing?plan=pro",
      page_location: "https://forgespace.co/pricing?plan=pro",
    });
  });
});
