import { ogTemplate, OG_SIZE } from "./_og-template";

export const runtime = "edge";
export const alt = "Forge Space — Generate code with AI. Ship it with confidence.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogTemplate({
    title: "Generate code with AI.\nShip it with confidence.",
    subtitle:
      "Open-source Internal Developer Platform with governance scorecards, policy packs, and audit trails.",
    badge: "Open Source IDP",
  });
}
