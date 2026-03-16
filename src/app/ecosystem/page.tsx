import { getPageMetadata } from "@/app/seo";
import EcosystemPage from "./client";
import { getEcosystemSnapshot } from "@/lib/ecosystem-data";
import { getBreadcrumbJsonLd, softwareApplicationJsonLd } from "@/app/structured-data";

export const metadata = getPageMetadata("ecosystem");

const breadcrumb = getBreadcrumbJsonLd([{ name: "Ecosystem", path: "/ecosystem" }]);

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
      <h1 className="sr-only">Forge Space Ecosystem</h1>
      <EcosystemPage snapshot={snapshot} />
    </>
  );
}
