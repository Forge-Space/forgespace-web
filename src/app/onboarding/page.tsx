"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Link2, RefreshCw, Rocket } from "lucide-react";
import { PageSection } from "@/components/layout/PageSection";

import { EASE_SIZA } from '@/lib/constants';

const STEPS = [
  {
    icon: Link2,
    title: "Connect your Ecosystem",
    desc: "OAuth handshake with Siza and your tools.",
  },
  {
    icon: RefreshCw,
    title: "Sync MCP Tools",
    desc: "Discover and enable MCP servers.",
  },
  {
    icon: Rocket,
    title: "Launch Workspace",
    desc: "Start building with AI-powered generation.",
  },
];

export default function OnboardingPage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--forge-gradient-hero)" }}
        aria-hidden
      />
      <main className="relative">
        <PageSection
          label="ONBOARDING"
          title="Connect Forge to Siza"
          subtitle="Connect your ecosystem in three steps."
        >
          <div className="space-y-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.4,
                  ease: EASE_SIZA,
                  delay: 0.1 + i * 0.12,
                }}
                className="flex gap-4 rounded-xl border border-forge-border bg-forge-surface/50 p-6"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-forge-primary/10 flex items-center justify-center">
                  <step.icon className="w-5 h-5 text-forge-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-1">
                    {step.title}
                  </h3>
                  <p className="text-forge-text-muted text-sm">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE_SIZA, delay: 0.5 }}
            className="mt-12"
          >
            <Link
              href="https://siza.forgespace.co"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-forge-primary hover:bg-forge-primary-hover text-white rounded-lg px-6 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--forge-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--forge-bg)]"
            >
              Connect Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </PageSection>
      </main>
    </div>
  );
}
