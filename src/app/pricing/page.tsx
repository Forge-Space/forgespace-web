import { getPageMetadata } from "@/app/seo";
import PricingPage from "./client";
import { getPricingFaqJsonLd } from "./faq";

export const metadata = getPageMetadata("pricing");

export default function Page() {
  const faqJsonLd = getPricingFaqJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PricingPage />
    </>
  );
}
