import { ogTemplate, OG_SIZE } from "../_og-template";

export const runtime = "edge";
export const alt = "Features | Forge Space";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogTemplate({
    title: "Everything you need\nto ship with confidence.",
    subtitle:
      "AI generation, governance scorecards, policy packs, golden path templates, and MCP-native architecture.",
    badge: "Features",
  });
}
