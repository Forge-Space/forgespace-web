"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Map } from "lucide-react";
import { PageSection } from "@/components/layout/PageSection";

import { EASE_SIZA } from '@/lib/constants';

const MILESTONES = [
  {
    quarter: "Q4 2023",
    items: ["MCP Gateway", "Siza MVP", "Core patterns"],
  },
  {
    quarter: "Q1 2024",
    items: ["Branding MCP", "siza-mcp expansion", "Self-hosting"],
  },
  {
    quarter: "Q2 2024",
    items: ["Collaborative multi-agent workspaces", "Enterprise features"],
  },
];

export default function RoadmapPage() {
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
          label="ROADMAP"
          title="The path to v3.0"
          subtitle="From MCP Gateway to collaborative workspaces."
        >
          <div className="space-y-8">
            {MILESTONES.map((m, i) => (
              <motion.div
                key={m.quarter}
                initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.4,
                  ease: EASE_SIZA,
                  delay: 0.15 + i * 0.1,
                }}
                className="rounded-xl border border-forge-border bg-forge-surface/50 p-6"
              >
                <h3 className="font-display font-semibold text-forge-primary mb-3 flex items-center gap-2">
                  <Map className="w-4 h-4" />
                  {m.quarter}
                </h3>
                <ul className="space-y-2">
                  {m.items.map((item) => (
                    <li
                      key={item}
                      className="text-forge-text-muted flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-forge-primary/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE_SIZA, delay: 0.5 }}
            className="mt-12 flex flex-wrap gap-4"
          >
            <Link
              href="https://siza.forgespace.co"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-forge-primary hover:bg-forge-primary-hover text-white rounded-lg px-6 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--forge-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--forge-bg)]"
            >
              Try Siza
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="https://github.com/Forge-Space"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-forge-border rounded-lg px-6 py-3 text-sm font-medium text-foreground/90 hover:bg-forge-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--forge-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--forge-bg)]"
            >
              View on GitHub
            </Link>
          </motion.div>
        </PageSection>
      </main>
    </div>
  );
}
