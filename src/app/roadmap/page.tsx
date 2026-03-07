import { getPageMetadata } from "@/app/seo";
import RoadmapPage from "./client";

export const metadata = getPageMetadata("roadmap");

export default function Page() {
  return <RoadmapPage />;
}
