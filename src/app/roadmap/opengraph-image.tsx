import { ogTemplate, OG_SIZE } from "../_og-template";

export const runtime = "edge";
export const alt = "Roadmap | Forge Space";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogTemplate({
    title: "Transparent roadmap.\nBuilt in public.",
    subtitle:
      "From AI generation to enterprise features — see what we've shipped and what's coming next.",
    badge: "Roadmap",
  });
}
