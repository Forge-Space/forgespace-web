import { getPageMetadata } from "@/app/seo";
import IntegrationsPage from "./client";

export const metadata = getPageMetadata("integrations");

export default function Page() {
  return <IntegrationsPage />;
}
