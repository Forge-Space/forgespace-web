import { ogTemplate, OG_SIZE } from "../_og-template";

export const runtime = "edge";
export const alt = "Ecosystem | Forge Space";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogTemplate({
    title: "11 product repos.\nOne coherent platform.",
    subtitle:
      "Explore live release tags, update activity, and ecosystem architecture synced from GitHub.",
    badge: "Ecosystem",
  });
}
