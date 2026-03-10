import { getPageMetadata } from "@/app/seo";
import RoadmapPage from "./client";
import { getEcosystemSnapshot } from "@/lib/ecosystem-data";

export const metadata = getPageMetadata("roadmap");

export default async function Page() {
  const snapshot = await getEcosystemSnapshot();
  return <RoadmapPage repoCount={snapshot.repoCount} />;
}
