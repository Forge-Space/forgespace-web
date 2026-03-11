import { ArrowRight, Github } from "lucide-react";
import { FORGE_CTA_EVENTS } from "@/lib/analytics/ga4";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 20%, rgba(124,58,237,0.30), transparent 68%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: "var(--forge-gradient-hero)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(124,58,237,0.22) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
        aria-hidden
      />

      <div className="relative z-[2] max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <Badge>Open Source</Badge>
          <Badge variant="outline">Internal Developer Platform</Badge>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight mb-6 leading-[1.1]">
          Generate code with AI.
          <br />
          <span className="bg-gradient-to-r from-[#A78BFA] to-[#8B5CF6] bg-clip-text text-transparent">
            Ship it with confidence.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-forge-text-muted max-w-2xl mx-auto mb-3 leading-relaxed">
          Platform-grade governance without a platform team. Scorecards, policy
          packs, and audit trails — from prompt to production in minutes.
        </p>
        <p className="text-sm text-forge-text-subtle max-w-xl mx-auto mb-10">
          Free &amp; open source. No enterprise contract required.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            href="https://siza.forgespace.co"
            external
            size="lg"
            ctaEvent={FORGE_CTA_EVENTS.SIZA}
            ctaTarget="siza"
            ctaLocation="hero_primary"
            passAttribution
          >
            Try Siza Free
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button
            href="https://github.com/Forge-Space"
            external
            variant="outline"
            size="lg"
            ctaEvent={FORGE_CTA_EVENTS.GITHUB}
            ctaTarget="github"
            ctaLocation="hero_secondary"
          >
            <Github className="w-4 h-4" />
            View on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
}
