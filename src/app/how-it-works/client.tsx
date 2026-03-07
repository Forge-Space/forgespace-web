"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, ArrowDown, Box } from "lucide-react";
import { PageSection } from "@/components/layout/PageSection";

import { EASE_SIZA } from "@/lib/constants";

const FLOW = [
  "forge-patterns",
  "mcp-gateway",
  "siza-mcp + branding-mcp",
  "siza",
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--forge-gradient-hero)" }}
        aria-hidden
      />
      <main className="relative">
        <PageSection
          label="HOW IT WORKS"
          title="From prompt to production"
          subtitle="MCP-native. Composable. Self-hostable."
        >
          <div className="space-y-4 max-w-md mx-auto">
            {FLOW.map((node, i) => (
              <motion.div
                key={node}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.4,
                  ease: EASE_SIZA,
                  delay: 0.1 + i * 0.1,
                }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-full rounded-lg border border-forge-border bg-forge-surface/50 px-4 py-3 font-mono text-sm text-forge-primary flex items-center gap-2">
                  <Box className="w-4 h-4 flex-shrink-0" />
                  {node}
                </div>
                {i < FLOW.length - 1 && (
                  <ArrowDown className="w-4 h-4 text-forge-text-muted" />
                )}
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 justify-center mt-8">
            {[
              "BYOK — Bring your own key",
              "MCP-Native — 21+ tools",
              "Self-Hostable — MIT licensed",
            ].map((pill) => (
              <span
                key={pill}
                className="inline-flex rounded-full border border-forge-primary/40 bg-forge-primary/10 px-3 py-1 text-xs font-medium text-forge-primary"
              >
                {pill}
              </span>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE_SIZA, delay: 0.6 }}
            className="mt-12 flex flex-wrap gap-4 justify-center"
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
              href="/protocol"
              className="inline-flex items-center gap-2 border border-forge-border rounded-lg px-6 py-3 text-sm font-medium text-foreground/90 hover:bg-forge-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--forge-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--forge-bg)]"
            >
              Read the Docs
            </Link>
          </motion.div>
        </PageSection>
      </main>
    </div>
  );
}
