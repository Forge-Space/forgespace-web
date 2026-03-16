import { getPageMetadata } from "@/app/seo";
import PtPage from "./client";
import { getBreadcrumbJsonLd, softwareApplicationJsonLd } from "@/app/structured-data";

export const dynamic = "force-dynamic";
export const metadata = getPageMetadata("pt");

const breadcrumb = getBreadcrumbJsonLd([{ name: "Forge Space PT", path: "/pt" }]);

export default function Page() {
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
      <PtPage />
    </>
  );
}
