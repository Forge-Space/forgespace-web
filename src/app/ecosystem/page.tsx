import { getPageMetadata } from "@/app/seo";
import EcosystemPage from "./client";
import { getEcosystemSnapshot } from "@/lib/ecosystem-data";

export const metadata = getPageMetadata("ecosystem");

export default async function Page() {
  const snapshot = await getEcosystemSnapshot();
  return (
    <>
      <h1 className="sr-only">Forge Space Ecosystem</h1>
      <EcosystemPage snapshot={snapshot} />
    </>
  );
}
