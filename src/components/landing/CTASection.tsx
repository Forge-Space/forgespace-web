"use client";

import { motion } from "motion/react";
import { ArrowRight, BookOpen, MessageSquare } from "lucide-react";
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
              href="https://docs.forgespace.co/docs"
              external
              size="lg"
              ctaEvent={FORGE_CTA_EVENTS.DOCS}
              ctaTarget="docs"
              ctaLocation="landing_cta_primary"
            >
              <BookOpen className="w-4 h-4" />
              Read the Docs
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              href="https://github.com/Forge-Space/siza/discussions"
              external
              variant="outline"
              size="lg"
              ctaEvent={FORGE_CTA_EVENTS.COMMUNITY}
              ctaTarget="community"
              ctaLocation="landing_cta_secondary"
            >
              <MessageSquare className="w-4 h-4" />
              Join Discussions
            </Button>
            <Button
              href="https://siza.forgespace.co/signup"
              external
              variant="ghost"
              size="lg"
              ctaEvent={FORGE_CTA_EVENTS.SIZA}
              ctaTarget="siza"
              ctaLocation="landing_cta_tertiary"
              passAttribution
            >
              Start Siza Beta
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
