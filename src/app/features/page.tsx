import { getPageMetadata } from "@/app/seo";
import FeaturesPage from "./client";
import { getEcosystemSnapshot } from "@/lib/ecosystem-data";

export const metadata = getPageMetadata("features");

export default async function Page() {
  const snapshot = await getEcosystemSnapshot();
  return (
    <>
      <h1 className="sr-only">Forge Space Features</h1>
      <FeaturesPage repoCount={snapshot.repoCount} />
    </>
  );
}
