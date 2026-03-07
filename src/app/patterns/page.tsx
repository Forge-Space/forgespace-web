import { getPageMetadata } from "@/app/seo";
import PatternsPage from "./client";

export const metadata = getPageMetadata("patterns");

export default function Page() {
  return <PatternsPage />;
}
