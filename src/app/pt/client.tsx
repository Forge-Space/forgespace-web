"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { ArrowRight, Github, Mail } from "lucide-react";
import { EASE_SIZA } from "@/lib/constants";
import { FORGE_CTA_EVENTS } from "@/lib/analytics/ga4";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { CTASection } from "@/components/landing/CTASection";

const HeroParticlesBackground = dynamic(
  () =>
    import("@/components/shared/HeroParticlesBackground").then(
      (m) => m.HeroParticlesBackground,
    ),
  { ssr: false },
);

export default function PtPage() {
  return (
    <main
      id="main-content"
      className="min-h-screen bg-background font-sans text-foreground"
      lang="pt-BR"
    >
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
              <Badge variant="outline">Plataforma de Desenvolvimento</Badge>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight mb-6 leading-[1.1]">
              IDP open-source para times
              <br />
              <span className="bg-gradient-to-r from-[#A78BFA] to-[#8B5CF6] bg-clip-text text-transparent">
                sem equipe de plataforma.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-forge-text-muted max-w-2xl mx-auto mb-3 leading-relaxed">
              Entregue produtos com IA e governança prática. Forge Space dá a
              times pequenos uma alternativa ao Backstage sem a complexidade de
              plataforma pesada.
            </p>
            <p className="text-sm text-forge-text-subtle max-w-xl mx-auto mb-10">
              Open source primeiro. Comece pelo GitHub, teste o Siza, ou fale
              com a gente sobre o seu time.
            </p>

            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 justify-center">
              <Button
                href="https://github.com/Forge-Space"
                external
                size="lg"
                ctaEvent={FORGE_CTA_EVENTS.GITHUB}
                ctaTarget="github"
                ctaLocation="pt_hero_primary"
              >
                <Github className="w-4 h-4" />
                Ver no GitHub
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                href="mailto:hello@forgespace.co?subject=Forge%20Space%20para%20meu%20time"
                external
                variant="outline"
                size="lg"
                ctaEvent={FORGE_CTA_EVENTS.CONTACT_SALES}
                ctaTarget="contact_sales"
                ctaLocation="pt_hero_secondary"
                passAttribution
              >
                <Mail className="w-4 h-4" />
                Falar com Forge Space
              </Button>
              <Button
                href="https://siza.forgespace.co"
                external
                variant="ghost"
                size="lg"
                ctaEvent={FORGE_CTA_EVENTS.SIZA}
                ctaTarget="siza"
                ctaLocation="pt_hero_tertiary"
                passAttribution
              >
                Testar o Siza
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <FeaturesGrid repoCount={11} />
      <HowItWorks />
      <CTASection />
    </main>
  );
}
