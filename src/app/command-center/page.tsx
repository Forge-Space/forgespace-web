"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { Terminal, Book, FolderGit2 } from "lucide-react";
import { PageSection } from "@/components/layout/PageSection";

import { EASE_SIZA } from '@/lib/constants';

const QUICK_ACTIONS = [
  { cmd: "/deploy", label: "Deploy to production" },
  { cmd: "/add-mcp", label: "Add MCP server" },
  { cmd: "/view-docs", label: "Open documentation" },
];

const RECENT_REPOS = ["siza", "mcp-gateway", "forge-patterns"];

export default function CommandCenterPage() {
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
          label="COMMAND CENTER"
          title="Quick Actions"
          subtitle="Run commands, access repos, and jump to docs."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE_SIZA }}
              className="rounded-xl border border-forge-border bg-forge-surface/50 p-6"
            >
              <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-forge-primary" />
                Quick Actions
              </h3>
              <ul className="space-y-3">
                {QUICK_ACTIONS.map((a) => (
                  <li
                    key={a.cmd}
                    className="flex items-center justify-between rounded-lg border border-forge-border bg-forge-bg px-4 py-2 font-mono text-sm"
                  >
                    <code className="text-forge-primary">{a.cmd}</code>
                    <span className="text-forge-text-muted text-xs">
                      {a.label}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE_SIZA, delay: 0.1 }}
              className="rounded-xl border border-forge-border bg-forge-surface/50 p-6"
            >
              <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-forge-primary" />
                Recent Repos
              </h3>
              <ul className="space-y-2">
                {RECENT_REPOS.map((repo) => (
                  <li key={repo}>
                    <Link
                      href={`https://github.com/Forge-Space/${repo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-forge-primary hover:text-forge-primary-hover transition-colors font-mono text-sm"
                    >
                      {repo}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE_SIZA, delay: 0.2 }}
            className="mt-8"
          >
            <Link
              href="/protocol"
              className="inline-flex items-center gap-2 text-forge-primary hover:text-forge-primary-hover transition-colors"
            >
              <Book className="w-4 h-4" />
              Docs & Community
            </Link>
          </motion.div>
        </PageSection>
      </main>
    </div>
  );
}
