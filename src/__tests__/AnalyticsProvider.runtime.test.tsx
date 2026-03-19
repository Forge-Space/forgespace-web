import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import AnalyticsProvider from "../components/analytics/AnalyticsProvider";

const mockUsePathname = vi.fn(() => "/pricing");

const mockCaptureFirstTouchAttribution = vi.fn();
const mockGetStoredFirstTouchAttribution = vi.fn(() => ({
  utm_source: "google",
  utm_medium: "cpc",
  utm_campaign: "fs",
  utm_term: null,
  utm_content: null,
  gclid: null,
  gbraid: null,
  wbraid: null,
  landing_path: "/",
  first_seen_at: "2026-03-18T00:00:00.000Z",
}));
const mockAppendAttributionToHttpUrl = vi.fn(
  (href: string, attribution?: unknown) => {
    void attribution;
    return `${href}?utm_source=google`;
  },
);
const mockAppendAttributionToMailto = vi.fn(
  (href: string, attribution?: unknown) => {
    void attribution;
    return `${href}?body=Attribution`;
  },
);

const mockTrackForgeCtaEvent = vi.fn();
const mockTrackGadsConversion = vi.fn();
const mockTrackGa4Pageview = vi.fn();

vi.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

vi.mock("@/lib/analytics/first-touch-attribution", () => ({
  appendAttributionToHttpUrl: (href: string, attribution: unknown) =>
    mockAppendAttributionToHttpUrl(href, attribution),
  appendAttributionToMailto: (href: string, attribution: unknown) =>
    mockAppendAttributionToMailto(href, attribution),
  captureFirstTouchAttribution: (url: URL) => mockCaptureFirstTouchAttribution(url),
  getStoredFirstTouchAttribution: () => mockGetStoredFirstTouchAttribution(),
}));

vi.mock("@/lib/analytics/ga4", () => ({
  trackForgeCtaEvent: (...args: unknown[]) => mockTrackForgeCtaEvent(...args),
  trackGadsConversion: (...args: unknown[]) => mockTrackGadsConversion(...args),
  trackGa4Pageview: (...args: unknown[]) => mockTrackGa4Pageview(...args),
}));

describe("AnalyticsProvider runtime behavior", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.head.innerHTML = "";
    document.body.innerHTML = "";
    window.history.replaceState({}, "", "/pricing?plan=pro");
  });

  afterEach(() => {
    document.head.innerHTML = "";
    document.body.innerHTML = "";
  });

  it("renders children", () => {
    const { getByText } = render(
      <AnalyticsProvider>
        <div>child content</div>
      </AnalyticsProvider>,
    );

    expect(getByText("child content")).toBeInTheDocument();
  });

  it("captures first touch attribution on mount", () => {
    render(
      <AnalyticsProvider>
        <div>page</div>
      </AnalyticsProvider>,
    );

    expect(mockCaptureFirstTouchAttribution).toHaveBeenCalledTimes(1);
    const [urlArg] = mockCaptureFirstTouchAttribution.mock.calls[0] as [URL];
    expect(urlArg.pathname).toBe("/pricing");
    expect(urlArg.search).toBe("?plan=pro");
  });

  it("injects analytics scripts and removes them on unmount", () => {
    const { unmount } = render(
      <AnalyticsProvider>
        <div>page</div>
      </AnalyticsProvider>,
    );

    const scriptTags = Array.from(document.head.querySelectorAll("script"));
    expect(scriptTags).toHaveLength(2);
    expect(scriptTags[0]?.getAttribute("src")).toContain("googletagmanager.com/gtag/js?id=");
    expect(scriptTags[1]?.textContent).toContain("gtag('config', 'AW-959867732')");

    unmount();
    expect(document.head.querySelectorAll("script")).toHaveLength(0);
  });

  it("does not track CTA when clicked element has no data-fs-cta-event anchor", () => {
    const { getByTestId } = render(
      <AnalyticsProvider>
        <button data-testid="plain-btn" type="button">
          plain
        </button>
      </AnalyticsProvider>,
    );

    fireEvent.click(getByTestId("plain-btn"));

    expect(mockTrackForgeCtaEvent).not.toHaveBeenCalled();
    expect(mockTrackGadsConversion).not.toHaveBeenCalled();
  });

  it("tracks CTA click with destination metadata", () => {
    const { getByTestId } = render(
      <AnalyticsProvider>
        <a
          data-fs-cta-event="fs_cta_siza_click"
          data-fs-cta-target="siza"
          data-fs-cta-location="pricing_hero"
          data-testid="cta"
          href="https://siza.forgespace.co/signup"
        >
          Start
        </a>
      </AnalyticsProvider>,
    );

    fireEvent.click(getByTestId("cta"));

    expect(mockTrackForgeCtaEvent).toHaveBeenCalledWith("fs_cta_siza_click", {
      cta_target: "siza",
      cta_location: "pricing_hero",
      destination_url: "https://siza.forgespace.co/signup",
    });
    expect(mockTrackGadsConversion).toHaveBeenCalledWith("AW-959867732/dV0FCNCgr4YcENTW2ckD");
  });

  it("passes attribution through for opted-in http links", () => {
    const { getByTestId } = render(
      <AnalyticsProvider>
        <a
          data-fs-cta-event="fs_cta_contact_sales_click"
          data-fs-pass-attribution="true"
          data-testid="cta-http"
          href="https://forgespace.co/contact"
        >
          Contact
        </a>
      </AnalyticsProvider>,
    );

    const cta = getByTestId("cta-http") as HTMLAnchorElement;
    fireEvent.click(cta);

    expect(mockGetStoredFirstTouchAttribution).toHaveBeenCalledTimes(1);
    expect(mockAppendAttributionToHttpUrl).toHaveBeenCalledWith(
      "https://forgespace.co/contact",
      expect.any(Object),
    );
    expect(cta.href).toContain("utm_source=google");
  });

  it("passes attribution through for opted-in mailto links", () => {
    const { getByTestId } = render(
      <AnalyticsProvider>
        <a
          data-fs-cta-event="fs_cta_contact_sales_click"
          data-fs-pass-attribution="true"
          data-testid="cta-mailto"
          href="mailto:support@forgespace.co"
        >
          Email
        </a>
      </AnalyticsProvider>,
    );

    const cta = getByTestId("cta-mailto") as HTMLAnchorElement;
    fireEvent.click(cta);

    expect(mockAppendAttributionToMailto).toHaveBeenCalledWith(
      "mailto:support@forgespace.co",
      expect.any(Object),
    );
    expect(cta.href).toContain("body=Attribution");
  });

  it("does not apply attribution when opt-in data attribute is missing", () => {
    const { getByTestId } = render(
      <AnalyticsProvider>
        <a
          data-fs-cta-event="fs_cta_siza_click"
          data-testid="cta-no-attribution"
          href="https://siza.forgespace.co/signup"
        >
          Start
        </a>
      </AnalyticsProvider>,
    );

    fireEvent.click(getByTestId("cta-no-attribution"));

    expect(mockGetStoredFirstTouchAttribution).not.toHaveBeenCalled();
    expect(mockAppendAttributionToHttpUrl).not.toHaveBeenCalled();
    expect(mockAppendAttributionToMailto).not.toHaveBeenCalled();
  });

  it("removes click listener on unmount", () => {
    const addSpy = vi.spyOn(document, "addEventListener");
    const removeSpy = vi.spyOn(document, "removeEventListener");

    const { unmount } = render(
      <AnalyticsProvider>
        <a
          data-fs-cta-event="fs_cta_siza_click"
          data-testid="cta-cleanup"
          href="https://siza.forgespace.co/signup"
        >
          Start
        </a>
      </AnalyticsProvider>,
    );

    const clickHandler = addSpy.mock.calls.find(call => call[0] === "click")?.[1];
    expect(clickHandler).toBeTypeOf("function");

    unmount();
    expect(removeSpy).toHaveBeenCalledWith("click", clickHandler);

    addSpy.mockRestore();
    removeSpy.mockRestore();
  });
});
