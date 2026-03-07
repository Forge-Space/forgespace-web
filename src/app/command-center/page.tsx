import { getPageMetadata } from "@/app/seo";
import CommandCenterPage from "./client";

export const metadata = getPageMetadata("command-center");

export default function Page() {
  return <CommandCenterPage />;
}
