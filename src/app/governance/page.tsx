"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { FileText, Vote, GitBranch } from "lucide-react";
import { PageSection } from "@/components/layout/PageSection";

import { EASE_SIZA } from "@/lib/constants";

const GOVERNANCE_ITEMS = [
  {
    icon: FileText,
    title: "RFC Process",
    desc: "Propose and discuss changes to the ecosystem.",
  },
  {
    icon: Vote,
    title: "Community Decisions",
    desc: "Open discussions and consensus-driven updates.",
  },
  {
    icon: GitBranch,
    title: "Contribution Guide",
    desc: "How to contribute to Forge Space repos.",
  },
];

export default function GovernancePage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--forge-gradient-hero)" }}
        aria-hidden
      />
      <main className="relative">
        <PageSection
          label="GOVERNANCE"
          title="Ecosystem Governance & RFCs"
          subtitle="Open-source, community-driven. Propose changes and participate."
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {GOVERNANCE_ITEMS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  ease: EASE_SIZA,
                  delay: 0.1 + i * 0.08,
                }}
                className="rounded-xl border border-forge-border bg-forge-surface/50 p-6"
              >
                <item.icon className="w-5 h-5 text-forge-primary mb-3" />
                <h3 className="font-display font-semibold text-foreground mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-forge-text-muted">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE_SIZA, delay: 0.4 }}
          >
            <Link
              href="https://github.com/Forge-Space"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-forge-border rounded-lg px-6 py-3 text-sm font-medium text-foreground/90 hover:bg-forge-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--forge-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--forge-bg)]"
            >
              GitHub Discussions
            </Link>
          </motion.div>
        </PageSection>
      </main>
    </div>
  );
}
