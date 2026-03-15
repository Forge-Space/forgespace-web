/**
 * AnalyticsProvider — Google Ads tag contract tests
 *
 * These tests verify the source code contract: that the AW-959867732 tag
 * constant exists and is wired into the inline gtag script alongside GA4.
 * We use source-level checks because the NEXT_PUBLIC_* env vars are
 * resolved at module-load time, making runtime injection tests impractical
 * in the jsdom/vitest environment without complex module reloading.
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const ANALYTICS_PROVIDER_PATH = resolve(
  __dirname,
  "../components/analytics/AnalyticsProvider.tsx",
);
const GADS_TRACKING_ID = "AW-959867732";

const source = readFileSync(ANALYTICS_PROVIDER_PATH, "utf-8");

describe("AnalyticsProvider — Google Ads tag contract", () => {
  it("declares the GADS_TRACKING_ID constant with the correct value", () => {
    expect(source).toContain(`const GADS_TRACKING_ID = "${GADS_TRACKING_ID}"`);
  });

  it("includes a gtag config call referencing GADS_TRACKING_ID in the inline script", () => {
    // The template literal body interpolates GADS_TRACKING_ID via ${GADS_TRACKING_ID}
    expect(source).toContain("gtag('config', '${GADS_TRACKING_ID}')");
  });

  it("places the Google Ads config call after the GA4 config call in the script body", () => {
    const ga4Index = source.indexOf("gtag('config', '${GA4_TRACKING_ID}'");
    const gadsIndex = source.indexOf("gtag('config', '${GADS_TRACKING_ID}')");
    expect(ga4Index).toBeGreaterThan(-1);
    expect(gadsIndex).toBeGreaterThan(-1);
    expect(gadsIndex).toBeGreaterThan(ga4Index);
  });

  it("has exactly one external gtag.js script src assignment (shared runtime)", () => {
    const srcAssignments = (source.match(/scriptTag\.src\s*=/g) ?? []).length;
    expect(srcAssignments).toBe(1);
  });

  it("GADS config is inside the GA4 setup useEffect, not a separate effect", () => {
    // The GA4 setup effect starts where scriptTag is created
    const ga4EffectStart = source.indexOf('const scriptTag = document.createElement("script")');
    // The GADS call must exist inside that block (before the next useEffect)
    const gadsCallIndex = source.indexOf("gtag('config', '${GADS_TRACKING_ID}')");
    const nextEffectAfterGA4 = source.indexOf("useEffect(() => {", ga4EffectStart + 1);
    expect(ga4EffectStart).toBeGreaterThan(-1);
    expect(gadsCallIndex).toBeGreaterThan(ga4EffectStart);
    expect(gadsCallIndex).toBeLessThan(nextEffectAfterGA4);
  });
});
