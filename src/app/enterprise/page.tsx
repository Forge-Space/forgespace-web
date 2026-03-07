import { getPageMetadata } from "@/app/seo";
import EnterprisePage from "./client";

export const metadata = getPageMetadata("enterprise");

export default function Page() {
  return <EnterprisePage />;
}
