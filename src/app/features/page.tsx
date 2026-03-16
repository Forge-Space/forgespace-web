import { getPageMetadata } from "@/app/seo";
import FeaturesPage from "./client";
import { getEcosystemSnapshot } from "@/lib/ecosystem-data";
import { getBreadcrumbJsonLd, softwareApplicationJsonLd } from "@/app/structured-data";

export const metadata = getPageMetadata("features");

const breadcrumb = getBreadcrumbJsonLd([{ name: "Features", path: "/features" }]);

export default async function Page() {
  const snapshot = await getEcosystemSnapshot();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd) }}
      />
      <h1 className="sr-only">Forge Space Features</h1>
      <FeaturesPage repoCount={snapshot.repoCount} />
    </>
  );
}
