import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { SocialProof } from "@/components/landing/SocialProof";
import { ArchitectureDiagram } from "@/components/landing/ArchitectureDiagram";
import { CTASection } from "@/components/landing/CTASection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <HeroSection />
      <SocialProof />
      <FeaturesGrid />
      <HowItWorks />
      <ArchitectureDiagram />
      <CTASection />
    </div>
  );
}
