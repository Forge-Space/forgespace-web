import {
  appendAttributionToHttpUrl,
  appendAttributionToMailto,
  captureFirstTouchAttribution,
  FIRST_TOUCH_ATTRIBUTION_STORAGE_KEY,
  getStoredFirstTouchAttribution,
} from "@/lib/analytics/first-touch-attribution";

describe("first-touch-attribution", () => {
  beforeEach(() => {
    localStorage.removeItem(FIRST_TOUCH_ATTRIBUTION_STORAGE_KEY);
  });

  it("captures first-touch attribution from URL params", () => {
    const payload = captureFirstTouchAttribution(
      new URL(
        "https://forgespace.co/?utm_source=google&utm_medium=cpc&utm_campaign=forgespace_v2&utm_term=idp&utm_content=hero&gclid=test-gclid",
      ),
    );

    expect(payload.utm_source).toBe("google");
    expect(payload.utm_medium).toBe("cpc");
    expect(payload.utm_campaign).toBe("forgespace_v2");
    expect(payload.utm_term).toBe("idp");
    expect(payload.utm_content).toBe("hero");
    expect(payload.gclid).toBe("test-gclid");
    expect(payload.landing_path).toBe("/");
    expect(typeof payload.first_seen_at).toBe("string");
    expect(
      localStorage.getItem(FIRST_TOUCH_ATTRIBUTION_STORAGE_KEY),
    ).not.toBeNull();
  });

  it("does not overwrite first-touch attribution after initial capture", () => {
    const first = captureFirstTouchAttribution(
      new URL(
        "https://forgespace.co/?utm_source=google&utm_medium=cpc&utm_campaign=first",
      ),
    );

    const second = captureFirstTouchAttribution(
      new URL(
        "https://forgespace.co/pricing?utm_source=linkedin&utm_medium=paid&utm_campaign=second",
      ),
    );

    expect(second.utm_source).toBe("google");
    expect(second.utm_campaign).toBe("first");
    expect(second.first_seen_at).toBe(first.first_seen_at);
  });

  it("returns null for invalid payload in storage", () => {
    localStorage.setItem(FIRST_TOUCH_ATTRIBUTION_STORAGE_KEY, "{\"invalid\":true}");
    expect(getStoredFirstTouchAttribution()).toBeNull();
  });

  it("appends attribution data to HTTP URLs without overriding existing params", () => {
    const payload = captureFirstTouchAttribution(
      new URL(
        "https://forgespace.co/?utm_source=google&utm_medium=cpc&utm_campaign=forgespace_v2&gclid=test-gclid",
      ),
    );

    const targetUrl = appendAttributionToHttpUrl(
      "https://siza.forgespace.co/signup?utm_source=manual",
      payload,
    );

    const parsed = new URL(targetUrl);
    expect(parsed.searchParams.get("utm_source")).toBe("manual");
    expect(parsed.searchParams.get("utm_medium")).toBe("cpc");
    expect(parsed.searchParams.get("utm_campaign")).toBe("forgespace_v2");
    expect(parsed.searchParams.get("gclid")).toBe("test-gclid");
    expect(parsed.searchParams.get("landing_path")).toBe("/");
    expect(parsed.searchParams.get("first_seen_at")).toBe(payload.first_seen_at);
  });

  it("appends attribution body to mailto links", () => {
    const payload = captureFirstTouchAttribution(
      new URL(
        "https://forgespace.co/?utm_source=google&utm_medium=cpc&utm_campaign=forgespace_v2",
      ),
    );

    const mailto = appendAttributionToMailto("mailto:hello@forgespace.co", payload);

    const parsed = new URL(mailto);
    const body = parsed.searchParams.get("body") ?? "";

    expect(body).toContain("Attribution:");
    expect(body).toContain("utm_source=google");
    expect(body).toContain("utm_campaign=forgespace_v2");
    expect(body).toContain(`first_seen_at=${payload.first_seen_at}`);
  });
});
