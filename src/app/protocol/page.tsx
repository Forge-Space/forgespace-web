"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { FileCode, Book, Server, Wrench } from "lucide-react";
import { PageSection } from "@/components/layout/PageSection";

import { EASE_SIZA } from '@/lib/constants';

const DOC_LINKS = [
  {
    icon: FileCode,
    title: "Quick Start",
    desc: "Get up and running in minutes.",
    href: "https://github.com/Forge-Space/siza#readme",
  },
  {
    icon: Server,
    title: "Self-Hosting",
    desc: "Run locally with Docker.",
    href: "https://github.com/Forge-Space/siza#self-hosting",
  },
  {
    icon: Wrench,
    title: "MCP Integration",
    desc: "Connect MCP servers and tools.",
    href: "https://github.com/Forge-Space/ui-mcp#readme",
  },
  {
    icon: Book,
    title: "API Reference",
    desc: "REST and MCP APIs.",
    href: "https://github.com/Forge-Space",
  },
];

export default function ProtocolPage() {
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
          label="PROTOCOL"
          title="Forge Space Protocol Standards"
          subtitle="MCP-native. Composable. Self-hostable."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {DOC_LINKS.map((doc, i) => (
              <motion.a
                key={doc.title}
                href={doc.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  ease: EASE_SIZA,
                  delay: 0.1 + i * 0.08,
                }}
                className="block rounded-xl border border-forge-border bg-forge-surface/50 p-6 transition-all duration-200 hover:border-forge-primary/50 hover:shadow-[var(--forge-glow-primary-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--forge-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--forge-bg)]"
              >
                <doc.icon className="w-5 h-5 text-forge-primary mb-3" />
                <h3 className="font-display font-semibold text-foreground mb-1">
                  {doc.title}
                </h3>
                <p className="text-sm text-forge-text-muted">{doc.desc}</p>
              </motion.a>
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
              Start Generating Free
            </Link>
          </motion.div>
        </PageSection>
      </main>
    </div>
  );
}
