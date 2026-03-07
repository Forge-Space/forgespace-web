import { getPageMetadata } from "@/app/seo";
import HowItWorksPage from "./client";

export const metadata = getPageMetadata("how-it-works");

export default function Page() {
  return <HowItWorksPage />;
}
