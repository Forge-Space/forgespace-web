export interface FirstTouchAttribution {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  gclid: string | null;
  gbraid: string | null;
  wbraid: string | null;
  landing_path: string;
  first_seen_at: string;
}

const FIRST_TOUCH_ATTRIBUTION_STORAGE_KEY =
  "forgespace_first_touch_v1";

function normalizeParam(value: string | null): string | null {
  const normalized = value?.trim();
  return normalized ? normalized : null;
}

function canUseStorage(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.localStorage !== "undefined"
  );
}

function isFirstTouchAttribution(value: unknown): value is FirstTouchAttribution {
  if (!value || typeof value !== "object") {
    return false;
  }

  const payload = value as Record<string, unknown>;

  return (
    (typeof payload.utm_source === "string" || payload.utm_source === null) &&
    (typeof payload.utm_medium === "string" || payload.utm_medium === null) &&
    (typeof payload.utm_campaign === "string" || payload.utm_campaign === null) &&
    (typeof payload.utm_term === "string" || payload.utm_term === null) &&
    (typeof payload.utm_content === "string" || payload.utm_content === null) &&
    (typeof payload.gclid === "string" || payload.gclid === null) &&
    (typeof payload.gbraid === "string" || payload.gbraid === null) &&
    (typeof payload.wbraid === "string" || payload.wbraid === null) &&
    typeof payload.landing_path === "string" &&
    typeof payload.first_seen_at === "string"
  );
}

function createAttributionPayload(url: URL): FirstTouchAttribution {
  const params = url.searchParams;

  return {
    utm_source: normalizeParam(params.get("utm_source")),
    utm_medium: normalizeParam(params.get("utm_medium")),
    utm_campaign: normalizeParam(params.get("utm_campaign")),
    utm_term: normalizeParam(params.get("utm_term")),
    utm_content: normalizeParam(params.get("utm_content")),
    gclid: normalizeParam(params.get("gclid")),
    gbraid: normalizeParam(params.get("gbraid")),
    wbraid: normalizeParam(params.get("wbraid")),
    landing_path: url.pathname || "/",
    first_seen_at: new Date().toISOString(),
  };
}

export function getStoredFirstTouchAttribution(): FirstTouchAttribution | null {
  if (!canUseStorage()) {
    return null;
  }

  const rawValue = window.localStorage.getItem(FIRST_TOUCH_ATTRIBUTION_STORAGE_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawValue) as unknown;
    return isFirstTouchAttribution(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function captureFirstTouchAttribution(url: URL): FirstTouchAttribution {
  const existingAttribution = getStoredFirstTouchAttribution();

  if (existingAttribution) {
    return existingAttribution;
  }

  const payload = createAttributionPayload(url);

  if (canUseStorage()) {
    window.localStorage.setItem(
      FIRST_TOUCH_ATTRIBUTION_STORAGE_KEY,
      JSON.stringify(payload),
    );
  }

  return payload;
}

function setIfMissing(
  params: URLSearchParams,
  key: string,
  value: string | null | undefined,
): void {
  if (!value || params.has(key)) {
    return;
  }

  params.set(key, value);
}

export function appendAttributionToHttpUrl(
  href: string,
  attribution: FirstTouchAttribution | null,
): string {
  if (!attribution) {
    return href;
  }

  try {
    const targetUrl = new URL(href);

    setIfMissing(targetUrl.searchParams, "utm_source", attribution.utm_source);
    setIfMissing(targetUrl.searchParams, "utm_medium", attribution.utm_medium);
    setIfMissing(targetUrl.searchParams, "utm_campaign", attribution.utm_campaign);
    setIfMissing(targetUrl.searchParams, "utm_term", attribution.utm_term);
    setIfMissing(targetUrl.searchParams, "utm_content", attribution.utm_content);
    setIfMissing(targetUrl.searchParams, "gclid", attribution.gclid);
    setIfMissing(targetUrl.searchParams, "gbraid", attribution.gbraid);
    setIfMissing(targetUrl.searchParams, "wbraid", attribution.wbraid);
    setIfMissing(targetUrl.searchParams, "landing_path", attribution.landing_path);
    setIfMissing(targetUrl.searchParams, "first_seen_at", attribution.first_seen_at);

    return targetUrl.toString();
  } catch {
    return href;
  }
}

export function appendAttributionToMailto(
  href: string,
  attribution: FirstTouchAttribution | null,
): string {
  if (!attribution || !href.startsWith("mailto:")) {
    return href;
  }

  const mailtoUrl = new URL(href);
  const existingBody = mailtoUrl.searchParams.get("body")?.trim();

  const attributionBody = [
    `utm_source=${attribution.utm_source ?? ""}`,
    `utm_medium=${attribution.utm_medium ?? ""}`,
    `utm_campaign=${attribution.utm_campaign ?? ""}`,
    `utm_term=${attribution.utm_term ?? ""}`,
    `utm_content=${attribution.utm_content ?? ""}`,
    `gclid=${attribution.gclid ?? ""}`,
    `gbraid=${attribution.gbraid ?? ""}`,
    `wbraid=${attribution.wbraid ?? ""}`,
    `landing_path=${attribution.landing_path}`,
    `first_seen_at=${attribution.first_seen_at}`,
  ].join("\n");

  const body = existingBody
    ? `${existingBody}\n\nAttribution:\n${attributionBody}`
    : `Attribution:\n${attributionBody}`;

  mailtoUrl.searchParams.set("body", body);

  return mailtoUrl.toString();
}
