"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { ArrowRight, Github } from "lucide-react";
import { EASE_SIZA } from "@/lib/constants";
import { FORGE_CTA_EVENTS } from "@/lib/analytics/ga4";
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
    <section className="relative min-h-[75vh] sm:min-h-[90vh] flex items-center overflow-hidden">
      <HeroParticlesBackground />
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
            <h1 className="text-display-xl font-display font-extrabold tracking-tight leading-[1.15] mb-6">
              <span className="text-white">Open-source IDP </span>
              <br className="hidden sm:block" />
              <span className="text-gradient-primary">
                for teams that ship.
              </span>
            </h1>

            <p className="text-lg text-forge-text-muted max-w-md mb-8 leading-relaxed">
              The Backstage alternative built for speed. Siza scans your
              codebase and generates a living catalog — AI governance without
              the overhead.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <Button
                href="https://github.com/Forge-Space"
                external
                size="lg"
                ctaEvent={FORGE_CTA_EVENTS.GITHUB}
                ctaTarget="github"
                ctaLocation="hero_primary"
              >
                <Github className="w-4 h-4" />
                Explore on GitHub
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                href="https://siza.forgespace.co"
                external
                variant="outline"
                size="lg"
                ctaEvent={FORGE_CTA_EVENTS.SIZA}
                ctaTarget="siza"
                ctaLocation="hero_secondary"
                passAttribution
              >
                Try Siza Demo
              </Button>
            </div>

            <span className="text-xs text-forge-text-subtle">
              MIT License · No login required · Works with any Git host
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
                <div className="border border-forge-border rounded-lg bg-forge-surface/30 px-3 py-2.5 space-y-2">
                  <p className="text-forge-text-subtle">forge-space/forgespace-web</p>
                  <div className="flex items-center gap-2.5">
                    <span className="text-forge-text-muted">Score</span>
                    <span className="text-violet-400 font-semibold">94/100</span>
                    <div className="flex-1 h-1 rounded-full overflow-hidden bg-forge-surface">
                      <div className="h-full bg-violet-400/80 rounded-full" style={{width: "94%"}} />
                    </div>
                  </div>
                  <p className="text-forge-text-muted">Components: 23 · Issues: 2</p>
                </div>
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
  );
}
