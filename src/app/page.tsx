"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Github, Shield, Cpu, BookOpen } from "lucide-react";
import { EASE_SIZA } from "@/lib/constants";

const HeroParticlesBackground = dynamic(
  () =>
    import("@/components/shared/HeroParticlesBackground").then(
      (m) => m.HeroParticlesBackground,
    ),
  { ssr: false },
);

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative">
      <HeroParticlesBackground />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: "var(--forge-gradient-hero)" }}
        aria-hidden
      />
      <main className="relative max-w-4xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_SIZA }}
          className="text-center"
        >
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            <span className="inline-flex items-center rounded-full border border-forge-primary/40 bg-forge-primary/10 px-3 py-1 text-xs font-medium text-forge-primary">
              Open Source
            </span>
            <span className="text-sm font-mono text-forge-primary tracking-wider uppercase">
              Internal Developer Platform
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Generate code with AI.
            <br />
            <span className="text-forge-primary">Ship it with confidence.</span>
          </h1>
          <p className="text-lg text-forge-text-muted max-w-2xl mx-auto mb-4">
            Platform-grade governance without a platform team. Scorecards,
            policy packs, and audit trails — from prompt to production in
            minutes.
          </p>
          <p className="text-sm text-forge-text-muted/70 max-w-xl mx-auto mb-10">
            Free &amp; open source. No enterprise contract required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
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
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 border border-forge-border rounded-lg px-6 py-3 text-sm font-medium text-foreground/90 hover:bg-forge-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--forge-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--forge-bg)]"
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_SIZA, delay: 0.2 }}
          className="mt-24"
        >
          <h2 className="text-sm font-mono text-forge-primary tracking-wider uppercase mb-6 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: Cpu,
                name: "Generate",
                desc: "Describe what you need. Siza generates production-ready code with live preview.",
                href: "https://siza.forgespace.co",
              },
              {
                icon: Shield,
                name: "Score",
                desc: "Every output gets an A-F scorecard — security, quality, accessibility, compliance.",
                href: "https://github.com/Forge-Space/core",
              },
              {
                icon: BookOpen,
                name: "Ship",
                desc: "Policy checks run in CI. Audit trails track everything from prompt to merge.",
                href: "https://github.com/Forge-Space/mcp-gateway",
              },
            ].map((item, i) => (
              <motion.a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  ease: EASE_SIZA,
                  delay: 0.3 + i * 0.08,
                }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="block rounded-xl border border-forge-border bg-forge-surface/50 p-6 transition-all duration-200 hover:border-forge-primary/50 hover:shadow-[var(--forge-glow-primary-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--forge-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--forge-bg)]"
              >
                <item.icon className="w-5 h-5 text-forge-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-1">
                  {item.name}
                </h3>
                <p className="text-sm text-forge-text-muted">{item.desc}</p>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
