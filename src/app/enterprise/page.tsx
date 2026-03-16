import { getPageMetadata } from "@/app/seo";
import EnterprisePage from "./client";
import { getBreadcrumbJsonLd, softwareApplicationJsonLd } from "@/app/structured-data";

export const dynamic = "force-dynamic";
export const metadata = getPageMetadata("enterprise");

const breadcrumb = getBreadcrumbJsonLd([{ name: "Enterprise", path: "/enterprise" }]);

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
      <EnterprisePage />
    </>
  );
}
