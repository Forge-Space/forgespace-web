import { getPageMetadata } from "@/app/seo";
import EnterprisePage from "./client";

export const dynamic = "force-dynamic";
export const metadata = getPageMetadata("enterprise");

export default function Page() {
  return <EnterprisePage />;
}
