"use client";

import { motion } from "motion/react";
import { ArrowRight, Mail } from "lucide-react";
import { EASE_SIZA } from "@/lib/constants";
import { FORGE_CTA_EVENTS } from "@/lib/analytics/ga4";
import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-forge-bg-elevated relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(139, 92, 246, 0.12) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE_SIZA }}
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-foreground mb-4">
            Get visibility where it matters
          </h2>
          <p className="text-lg text-forge-text-muted mb-8 leading-relaxed">
            Explore the ecosystem, share it with your network, and see if Forge
            Space fits your team before investing in heavyweight platform
            engineering.
          </p>
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 justify-center">
            <Button
              href="https://github.com/Forge-Space"
              external
              size="lg"
              ctaEvent={FORGE_CTA_EVENTS.GITHUB}
              ctaTarget="github"
              ctaLocation="landing_cta_primary"
            >
              Explore on GitHub
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              href="mailto:hello@forgespace.co?subject=Forge%20Space%20for%20my%20team"
              external
              variant="outline"
              size="lg"
              ctaEvent={FORGE_CTA_EVENTS.CONTACT_SALES}
              ctaTarget="contact_sales"
              ctaLocation="landing_cta_secondary"
              passAttribution
            >
              <Mail className="w-4 h-4" />
              Contact Forge Space
            </Button>
            <Button
              href="https://siza.forgespace.co"
              external
              variant="ghost"
              size="lg"
              ctaEvent={FORGE_CTA_EVENTS.SIZA}
              ctaTarget="siza"
              ctaLocation="landing_cta_tertiary"
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
