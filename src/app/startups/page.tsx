import { getPageMetadata } from "@/app/seo";
import StartupsPage from "./client";
import { getBreadcrumbJsonLd } from "@/app/structured-data";

export const dynamic = "force-dynamic";
export const metadata = getPageMetadata("startups");

const breadcrumb = getBreadcrumbJsonLd([{ name: "For Startups", path: "/startups" }]);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <StartupsPage />
    </>
  );
}
