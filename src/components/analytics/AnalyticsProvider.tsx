"use client";

import { useEffect, type PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
import {
  appendAttributionToHttpUrl,
  appendAttributionToMailto,
  captureFirstTouchAttribution,
  getStoredFirstTouchAttribution,
} from "@/lib/analytics/first-touch-attribution";
import {
  trackForgeCtaEvent,
  trackGa4Pageview,
  type ForgeCtaEvent,
} from "@/lib/analytics/ga4";

const GA4_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;
const GADS_TRACKING_ID = "AW-959867732";

function getCurrentPagePath(pathname: string, query: string): string {
  return query ? `${pathname}?${query}` : pathname;
}

function withAttributionIfEnabled(anchor: HTMLAnchorElement): void {
  if (anchor.dataset.fsPassAttribution !== "true") {
    return;
  }

  const attribution = getStoredFirstTouchAttribution();
  const rawHref = anchor.getAttribute("href") ?? "";

  if (!rawHref) {
    return;
  }

  if (rawHref.startsWith("mailto:")) {
    anchor.href = appendAttributionToMailto(rawHref, attribution);
    return;
  }

  if (rawHref.startsWith("http://") || rawHref.startsWith("https://")) {
    anchor.href = appendAttributionToHttpUrl(rawHref, attribution);
  }
}

function handleCtaClick(event: MouseEvent): void {
  const target = event.target;

  if (!(target instanceof Element)) {
    return;
  }

  const anchor = target.closest("a[data-fs-cta-event]");

  if (!(anchor instanceof HTMLAnchorElement)) {
    return;
  }

  const eventName = anchor.dataset.fsCtaEvent as ForgeCtaEvent | undefined;

  if (!eventName) {
    return;
  }

  withAttributionIfEnabled(anchor);

  trackForgeCtaEvent(eventName, {
    cta_target: anchor.dataset.fsCtaTarget ?? null,
    cta_location: anchor.dataset.fsCtaLocation ?? null,
    destination_url: anchor.href,
  });
}

export default function AnalyticsProvider({ children }: PropsWithChildren) {
  const pathname = usePathname() ?? "/";

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    captureFirstTouchAttribution(new URL(window.location.href));
  }, [pathname]);

  useEffect(() => {
    if (!GA4_TRACKING_ID || typeof window === "undefined") {
      return;
    }

    const scriptTag = document.createElement("script");
    scriptTag.async = true;
    scriptTag.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_TRACKING_ID}`;

    const inlineScriptTag = document.createElement("script");
    inlineScriptTag.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', '${GA4_TRACKING_ID}', { send_page_view: false });
      gtag('config', '${GADS_TRACKING_ID}');
    `;

    document.head.append(scriptTag, inlineScriptTag);

    return () => {
      scriptTag.remove();
      inlineScriptTag.remove();
    };
  }, []);

  useEffect(() => {
    if (!GA4_TRACKING_ID || typeof window === "undefined") {
      return;
    }

    const query = window.location.search;

    trackGa4Pageview(
      GA4_TRACKING_ID,
      getCurrentPagePath(pathname, query.startsWith("?") ? query.slice(1) : query),
      window.location.href,
    );
  }, [pathname]);

  useEffect(() => {
    document.addEventListener("click", handleCtaClick);

    return () => {
      document.removeEventListener("click", handleCtaClick);
    };
  }, []);

  return children;
}
