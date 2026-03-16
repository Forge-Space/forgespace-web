"use client";

import { motion } from "motion/react";
import { Github, ArrowRight } from "lucide-react";
import { EASE_SIZA } from "@/lib/constants";
import { FORGE_CTA_EVENTS } from "@/lib/analytics/ga4";
import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 80% 50% at 50% 0%, rgba(124, 58, 237, 0.15) 0%, transparent 70%),
          radial-gradient(ellipse 60% 40% at 20% 100%, rgba(139, 92, 246, 0.08) 0%, transparent 60%),
          var(--forge-bg)
        `,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='1'%3E%3Cpath d='M0 0h60v60H0z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
        aria-hidden
      />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_SIZA }}
        >
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-forge-primary mb-6">
            Get started today
          </p>

          <h2 className="text-display-lg font-display font-extrabold tracking-tight mb-6">
            Your codebase,{" "}
            <span className="bg-gradient-to-r from-[#A78BFA] to-[#8B5CF6] bg-clip-text text-transparent">
              finally visible.
            </span>
          </h2>

          <p className="text-xl text-forge-text-muted max-w-xl mx-auto mb-10 leading-relaxed">
            One scan. A living catalog. Governance built in. Open source and
            free to start.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-8 text-xs text-forge-text-subtle">
            <span>✓ Open source · MIT License</span>
            <span>✓ No login required to start</span>
            <span>✓ Works with any Git host</span>
            <span>✓ BYOK · Client-side encryption</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 justify-center">
            <Button
              href="https://github.com/Forge-Space"
              external
              size="lg"
              ctaEvent={FORGE_CTA_EVENTS.GITHUB}
              ctaTarget="github"
              ctaLocation="landing_cta_primary"
            >
              <Github className="w-4 h-4" />
              View on GitHub
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              href="https://siza.forgespace.co"
              external
              variant="outline"
              size="lg"
              ctaEvent={FORGE_CTA_EVENTS.SIZA}
              ctaTarget="siza"
              ctaLocation="landing_cta_secondary"
              passAttribution
            >
              Try Siza Demo
            </Button>
          </div>

          <p className="mt-8 text-sm text-forge-text-subtle">
            MIT Licensed · Self-hostable · No vendor lock-in
          </p>
        </motion.div>
      </div>
    </section>
  );
}
