import { getPageMetadata } from "@/app/seo";
import PricingPage from "./client";
import { getPricingFaqJsonLd } from "./faq";
import { getBreadcrumbJsonLd, softwareApplicationJsonLd } from "@/app/structured-data";

export const dynamic = "force-dynamic";
export const metadata = getPageMetadata("pricing");

const breadcrumb = getBreadcrumbJsonLd([{ name: "Pricing", path: "/pricing" }]);

export default function Page() {
  const faqJsonLd = getPricingFaqJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd) }}
      />
      <PricingPage />
    </>
  );
}
