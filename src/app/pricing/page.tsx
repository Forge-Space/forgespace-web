import { getPageMetadata } from "@/app/seo";
import PricingPage from "./client";

export const metadata = getPageMetadata("pricing");

export default function Page() {
  return <PricingPage />;
}
