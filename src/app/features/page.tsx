import { getPageMetadata } from "@/app/seo";
import FeaturesPage from "./client";

export const metadata = getPageMetadata("features");

export default function Page() {
  return <FeaturesPage />;
}
