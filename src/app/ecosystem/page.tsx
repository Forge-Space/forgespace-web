import { getPageMetadata } from "@/app/seo";
import EcosystemPage from "./client";

export const metadata = getPageMetadata("ecosystem");

export default function Page() {
  return <EcosystemPage />;
}
