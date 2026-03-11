import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { SocialProof } from "@/components/landing/SocialProof";
import { ArchitectureDiagram } from "@/components/landing/ArchitectureDiagram";
import { CTASection } from "@/components/landing/CTASection";
import { getEcosystemSnapshot } from "@/lib/ecosystem-data";

export default async function Home() {
  const snapshot = await getEcosystemSnapshot();

  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
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
