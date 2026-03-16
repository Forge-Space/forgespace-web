import { ogTemplate, OG_SIZE } from "../_og-template";

export const runtime = "edge";
export const alt = "Enterprise | Forge Space";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogTemplate({
    title: "Enterprise governance.\nZero compromise.",
    subtitle:
      "Custom policies, SSO, dedicated support, and org-wide dashboards. Enterprise-grade at startup speed.",
    badge: "Enterprise",
  });
}
