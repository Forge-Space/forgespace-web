import { getPageMetadata } from "@/app/seo";
import PtPage from "./client";

export const dynamic = "force-dynamic";
export const metadata = getPageMetadata("pt");

export default function Page() {
  return <PtPage />;
}
