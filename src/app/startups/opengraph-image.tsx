import { ogTemplate, OG_SIZE } from "../_og-template";

export const runtime = "edge";
export const alt = "For Startups | Forge Space";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogTemplate({
    title: "Enterprise governance\nat startup speed.",
    subtitle:
      "Free for teams under 15 devs. AI code generation with scorecards, policy packs, and zero-config security.",
    badge: "For Startups",
  });
}
