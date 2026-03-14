import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { SocialProof } from "@/components/landing/SocialProof";
import { ArchitectureDiagram } from "@/components/landing/ArchitectureDiagram";
import { CTASection } from "@/components/landing/CTASection";
import { getEcosystemSnapshot } from "@/lib/ecosystem-data";
import { getPageMetadata } from "@/app/seo";
import { softwareApplicationJsonLd } from "@/app/structured-data";

export const metadata = getPageMetadata("home");

export default async function Home() {
  const snapshot = await getEcosystemSnapshot();

  return (
    <main
      id="main-content"
      className="min-h-screen bg-background font-sans text-foreground"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd) }}
      />
      <HeroSection />
      <SocialProof snapshot={snapshot} />
      <FeaturesGrid repoCount={snapshot.repoCount} />
      <HowItWorks />
      <ArchitectureDiagram
        repoCount={snapshot.repoCount}
        releasedRepoCount={snapshot.releasedRepoCount}
      />
      <CTASection />
    </main>
  );
}
