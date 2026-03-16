import { getPageMetadata } from "@/app/seo";
import RoadmapPage from "./client";
import { getEcosystemSnapshot } from "@/lib/ecosystem-data";
import { getBreadcrumbJsonLd } from "@/app/structured-data";

export const metadata = getPageMetadata("roadmap");

const breadcrumb = getBreadcrumbJsonLd([{ name: "Roadmap", path: "/roadmap" }]);

export default async function Page() {
  const snapshot = await getEcosystemSnapshot();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <h1 className="sr-only">Forge Space Roadmap</h1>
      <RoadmapPage repoCount={snapshot.repoCount} />
    </>
  );
}
