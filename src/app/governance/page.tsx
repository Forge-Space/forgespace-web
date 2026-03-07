import { getPageMetadata } from "@/app/seo";
import GovernancePage from "./client";

export const metadata = getPageMetadata("governance");

export default function Page() {
  return <GovernancePage />;
}
