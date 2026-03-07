"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { EASE_SIZA } from "@/lib/constants";
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
            Ready to ship with confidence?
          </h2>
          <p className="text-lg text-forge-text-muted mb-8 leading-relaxed">
            Start generating production-ready code with built-in governance.
            Free forever for individual developers.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button href="https://siza.forgespace.co" external size="lg">
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              href="https://github.com/Forge-Space"
              external
              variant="outline"
              size="lg"
            >
              Explore on GitHub
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
