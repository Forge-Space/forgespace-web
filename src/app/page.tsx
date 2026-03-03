'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Github, Layers } from 'lucide-react';

const EASE_SIZA = [0.16, 1, 0.3, 1] as const;

export default function Home() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'var(--forge-gradient-hero)' }}
        aria-hidden
      />
      <main className="relative max-w-4xl mx-auto px-6 py-24">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            prefersReducedMotion ? { duration: 0 } : { duration: 0.6, ease: EASE_SIZA }
          }
          className="text-center"
        >
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            <span className="inline-flex items-center rounded-full border border-forge-primary/40 bg-forge-primary/10 px-3 py-1 text-xs font-medium text-forge-primary">
              Open Source
            </span>
            <span className="text-sm font-mono text-forge-primary tracking-wider uppercase">
              Developer Workspace
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Forge Space
          </h1>
          <p className="text-lg text-forge-text-muted max-w-2xl mx-auto mb-10">
            Open-source ecosystem for AI-powered development. Siza, MCP tools, and shared
            patterns — one vision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={prefersReducedMotion ? undefined : { y: -2 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            >
              <Link
                href="https://siza.forgespace.co"
                className="inline-flex items-center gap-2 bg-forge-primary hover:bg-forge-primary-hover text-white rounded-lg px-6 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--forge-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--forge-bg)]"
              >
                Try Siza
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.a
              href="https://github.com/Forge-Space"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={prefersReducedMotion ? undefined : { y: -2 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              className="inline-flex items-center gap-2 border border-forge-border rounded-lg px-6 py-3 text-sm font-medium text-foreground/90 hover:bg-forge-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--forge-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--forge-bg)]"
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            prefersReducedMotion ? { duration: 0 } : { duration: 0.6, ease: EASE_SIZA, delay: 0.2 }
          }
          className="mt-24"
        >
          <h2 className="text-sm font-mono text-forge-primary tracking-wider uppercase mb-6 text-center">
            Ecosystem
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Siza', desc: 'AI workspace for code generation', href: 'https://siza.forgespace.co' },
              { name: 'siza-mcp', desc: 'MCP server for UI generation', href: 'https://github.com/Forge-Space/ui-mcp' },
              { name: 'mcp-gateway', desc: 'AI routing hub', href: 'https://github.com/Forge-Space/mcp-gateway' },
            ].map((repo, i) => (
              <motion.a
                key={repo.name}
                href={repo.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.4, ease: EASE_SIZA, delay: 0.3 + i * 0.08 }
                }
                whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                className="block rounded-xl border border-forge-border bg-forge-surface/50 p-6 transition-all duration-200 hover:border-forge-primary/50 hover:shadow-[var(--forge-glow-primary-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--forge-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--forge-bg)]"
              >
                <Layers className="w-5 h-5 text-forge-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-1">{repo.name}</h3>
                <p className="text-sm text-forge-text-muted">{repo.desc}</p>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
