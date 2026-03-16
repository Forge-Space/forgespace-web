"use client";

import { motion } from "motion/react";
import { ArrowRight, Github, Mail } from "lucide-react";
import { EASE_SIZA } from "@/lib/constants";
import { FORGE_CTA_EVENTS } from "@/lib/analytics/ga4";
import { Button } from "@/components/ui/Button";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { CTASection } from "@/components/landing/CTASection";

export default function PtPage() {
  return (
    <main
      id="main-content"
      className="min-h-screen bg-background font-sans text-foreground"
      lang="pt-BR"
    >
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{ background: "var(--forge-gradient-hero)" }}
          aria-hidden
        />

        <div className="relative z-[2] max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_SIZA }}
            >
              <p className="label-mono mb-4">FORGE SPACE · PT</p>

              <h1 className="text-display-xl font-display font-extrabold tracking-tight leading-[1.1] mb-6">
                <span className="text-white">IDP open-source para times</span>
                <br />
                <span className="bg-gradient-to-r from-[#A78BFA] to-[#8B5CF6] bg-clip-text text-transparent">
                  sem equipe de plataforma.
                </span>
              </h1>

              <p className="text-lg text-forge-text-muted max-w-md mb-3 leading-relaxed">
                Entregue produtos com IA e governança prática. Forge Space dá a
                times pequenos uma alternativa ao Backstage sem a complexidade de
                plataforma pesada.
              </p>
              <p className="text-sm text-forge-text-subtle max-w-xl mb-8">
                Open source primeiro. Comece pelo GitHub, teste o Siza, ou fale
                com a gente sobre o seu time.
              </p>

              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 mb-4">
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
                  href="mailto:support@forgespace.co?subject=Forge%20Space%20para%20meu%20time"
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

              <span className="text-xs font-mono text-forge-text-subtle tracking-wider">
                Open Source · MIT · Self-Hostable
              </span>
            </motion.div>

            {/* Right: Terminal mockup */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE_SIZA }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-violet-500/10 blur-2xl rounded-2xl -z-10" />
              <div className="bg-[#0d0d0f] border border-forge-border rounded-xl overflow-hidden">
                {/* Title bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-forge-border">
                  <span className="w-[10px] h-[10px] rounded-full bg-[#FF5F57]" />
                  <span className="w-[10px] h-[10px] rounded-full bg-[#FFBD2E]" />
                  <span className="w-[10px] h-[10px] rounded-full bg-[#28C840]" />
                  <span className="ml-3 text-xs text-forge-text-subtle font-mono">
                    siza scan
                  </span>
                </div>

                {/* Terminal body */}
                <div className="px-5 py-5 space-y-1 text-xs font-mono">
                  <p className="text-forge-text-muted">
                    $ siza scan --repo forge-space/forgespace-web
                  </p>
                  <p className="text-forge-text-subtle">&nbsp;</p>
                  <p className="text-emerald-400">✓ Scanning 847 files...</p>
                  <p className="text-emerald-400">
                    ✓ Extracting components (23 found)
                  </p>
                  <p className="text-emerald-400">✓ Mapping dependencies</p>
                  <p className="text-emerald-400">
                    ✓ Running AI governance checks
                  </p>
                  <p className="text-forge-text-subtle">&nbsp;</p>
                  <p className="text-forge-text-muted">
                    ┌─────────────────────────────────────────┐
                  </p>
                  <p className="text-forge-text-muted">
                    │&nbsp; forge-space/forgespace-web
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│
                  </p>
                  <p>
                    <span className="text-forge-text-muted">│&nbsp; Score: </span>
                    <span className="text-violet-400">94/100</span>
                    <span className="text-violet-400">
                      &nbsp; ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░
                    </span>
                    <span className="text-forge-text-muted">&nbsp; │</span>
                  </p>
                  <p className="text-forge-text-muted">
                    │&nbsp; Components: 23&nbsp; Issues:
                    2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│
                  </p>
                  <p className="text-forge-text-muted">
                    └─────────────────────────────────────────┘
                  </p>
                  <p className="text-forge-text-subtle">&nbsp;</p>
                  <p className="text-forge-primary">
                    ↗ Catalog published → siza.forgespace.co
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <HowItWorks />
      <CTASection />
    </main>
  );
}
