import { getPageMetadata } from "@/app/seo";
import PtPage from "./client";

export const metadata = getPageMetadata("pt");

export default function Page() {
  return <PtPage />;
}
