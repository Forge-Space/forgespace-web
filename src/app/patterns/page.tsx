"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Layers, Box, GitMerge, FileCode } from "lucide-react";
import { PageSection } from "@/components/layout/PageSection";

import { EASE_SIZA } from "@/lib/constants";

const PATTERNS = [
  {
    icon: Layers,
    title: "MCP Context",
    desc: "Shared context server for MCP tools.",
  },
  {
    icon: Box,
    title: "Component Patterns",
    desc: "Reusable UI and API patterns.",
  },
  {
    icon: GitMerge,
    title: "Repo Structure",
    desc: "Consistent layout across Forge Space repos.",
  },
  {
    icon: FileCode,
    title: "Code Conventions",
    desc: "TypeScript, naming, and style guides.",
  },
];

export default function PatternsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--forge-gradient-hero)" }}
        aria-hidden
      />
      <main className="relative">
        <PageSection
          label="PATTERNS"
          title="Forge Space Universal Patterns"
          subtitle="Shared standards across the ecosystem."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {PATTERNS.map((pattern, i) => (
              <motion.div
                key={pattern.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  ease: EASE_SIZA,
                  delay: 0.1 + i * 0.08,
                }}
                className="rounded-xl border border-forge-border bg-forge-surface/50 p-6"
              >
                <pattern.icon className="w-5 h-5 text-forge-primary mb-3" />
                <h3 className="font-display font-semibold text-foreground mb-1">
                  {pattern.title}
                </h3>
                <p className="text-sm text-forge-text-muted">{pattern.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE_SIZA, delay: 0.5 }}
          >
            <Link
              href="https://github.com/Forge-Space/core"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-forge-primary hover:bg-forge-primary-hover text-white rounded-lg px-6 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--forge-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--forge-bg)]"
            >
              forge-patterns on GitHub
            </Link>
          </motion.div>
        </PageSection>
      </main>
    </div>
  );
}
