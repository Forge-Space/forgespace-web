"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { ArrowRight, Github, Mail } from "lucide-react";
import { EASE_SIZA } from "@/lib/constants";
import { FORGE_CTA_EVENTS } from "@/lib/analytics/ga4";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const HeroParticlesBackground = dynamic(
  () =>
    import("@/components/shared/HeroParticlesBackground").then(
      (m) => m.HeroParticlesBackground,
    ),
  { ssr: false },
);

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <HeroParticlesBackground />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: "var(--forge-gradient-hero)" }}
        aria-hidden
      />

      <div className="relative z-[2] max-w-4xl mx-auto px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_SIZA }}
        >
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <Badge>Open Source</Badge>
            <Badge variant="outline">Internal Developer Platform</Badge>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight mb-6 leading-[1.1]">
            Open-source IDP for teams
            <br />
            <span className="bg-gradient-to-r from-[#A78BFA] to-[#8B5CF6] bg-clip-text text-transparent">
              without a platform department.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-forge-text-muted max-w-2xl mx-auto mb-3 leading-relaxed">
            Ship AI-assisted products with practical governance and visibility.
            Forge Space gives small teams a Backstage alternative without heavy
            platform overhead.
          </p>
          <p className="text-sm text-forge-text-subtle max-w-xl mx-auto mb-10">
            Open source first. Start with GitHub, test Siza, or talk to us
            about SMB fit.
          </p>

          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 justify-center">
            <Button
              href="https://github.com/Forge-Space"
              external
              size="lg"
              ctaEvent={FORGE_CTA_EVENTS.GITHUB}
              ctaTarget="github"
              ctaLocation="hero_primary"
            >
              <Github className="w-4 h-4" />
              View on GitHub
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              href="mailto:hello@forgespace.co?subject=Forge%20Space%20for%20my%20team"
              external
              variant="outline"
              size="lg"
              ctaEvent={FORGE_CTA_EVENTS.CONTACT_SALES}
              ctaTarget="contact_sales"
              ctaLocation="hero_secondary"
              passAttribution
            >
              <Mail className="w-4 h-4" />
              Talk to Forge Space
            </Button>
            <Button
              href="https://siza.forgespace.co"
              external
              variant="ghost"
              size="lg"
              ctaEvent={FORGE_CTA_EVENTS.SIZA}
              ctaTarget="siza"
              ctaLocation="hero_tertiary"
              passAttribution
            >
              Try Siza Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
