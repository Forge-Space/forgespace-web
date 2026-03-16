import { ogTemplate, OG_SIZE } from "../_og-template";

export const runtime = "edge";
export const alt = "Pricing | Forge Space";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogTemplate({
    title: "Start free.\nShip with confidence.",
    subtitle:
      "Free for individuals, affordable for teams. Open-source IDP with no vendor lock-in.",
    badge: "Pricing",
  });
}
