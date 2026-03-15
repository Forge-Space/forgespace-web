import type { FirstTouchAttribution } from "@/lib/analytics/first-touch-attribution";
import { getStoredFirstTouchAttribution } from "@/lib/analytics/first-touch-attribution";

export const FORGE_CTA_EVENTS = {
  SIZA: "fs_cta_siza_click",
  GITHUB: "fs_cta_github_click",
  DOCS: "fs_cta_docs_click",
  COMMUNITY: "fs_cta_community_click",
  CONTACT_SALES: "fs_cta_contact_sales_click",
} as const;

export type ForgeCtaEvent =
  (typeof FORGE_CTA_EVENTS)[keyof typeof FORGE_CTA_EVENTS];

declare global {
  interface Window {
    gtag?: (
      command: "config" | "event" | "set",
      target: string,
      params?: Record<string, unknown>,
    ) => void;
    dataLayer?: unknown[];
  }
}

function withAttributionParams(
  params?: Record<string, unknown>,
  attribution?: FirstTouchAttribution | null,
): Record<string, unknown> {
  if (!attribution) {
    return params ?? {};
  }

  return {
    ...(params ?? {}),
    utm_source: attribution.utm_source,
    utm_medium: attribution.utm_medium,
    utm_campaign: attribution.utm_campaign,
    utm_term: attribution.utm_term,
    utm_content: attribution.utm_content,
    gclid: attribution.gclid,
    gbraid: attribution.gbraid,
    wbraid: attribution.wbraid,
    landing_path: attribution.landing_path,
    first_seen_at: attribution.first_seen_at,
  };
}

function trackGa4Event(
  eventName: string,
  params?: Record<string, unknown>,
): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag(
    "event",
    eventName,
    withAttributionParams(params, getStoredFirstTouchAttribution()),
  );
}

export function trackForgeCtaEvent(
  eventName: ForgeCtaEvent,
  params?: Record<string, unknown>,
): void {
  trackGa4Event(eventName, params);
}

export function trackGa4Pageview(
  trackingId: string,
  pagePath: string,
  pageLocation: string,
): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("config", trackingId, {
    page_path: pagePath,
    page_location: pageLocation,
  });
}
