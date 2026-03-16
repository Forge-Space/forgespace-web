import { getPageMetadata } from "@/app/seo";
import StartupsPage from "./client";

export const dynamic = "force-dynamic";
export const metadata = getPageMetadata("startups");

export default function Page() {
  return <StartupsPage />;
}
