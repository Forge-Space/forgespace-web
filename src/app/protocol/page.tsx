import { getPageMetadata } from "@/app/seo";
import ProtocolPage from "./client";

export const metadata = getPageMetadata("protocol");

export default function Page() {
  return <ProtocolPage />;
}
