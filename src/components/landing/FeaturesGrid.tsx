"use client";

import { motion } from "motion/react";
import {
  Sparkles,
  Plug,
  Shield,
  Gift,
  Server,
  Cpu,
} from "lucide-react";
import { EASE_SIZA } from "@/lib/constants";
import { type LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    icon: Sparkles,
    title: "AI-Powered Generation",
    description:
      "Natural language to production UI. Describe a dashboard, form, or landing page — get React components with proper architecture, types, and tests.",
  },
  {
    icon: Plug,
    title: "MCP-Native Architecture",
    description:
      "30+ composable tools via Model Context Protocol. UI generation, branding, scaffolding — swap or extend any tool without code changes.",
  },
  {
    icon: Shield,
    title: "Privacy-First BYOK",
    description:
      "Bring your own API key with client-side AES-256 encryption. Your credentials never touch our servers. SOC 2-ready by design.",
  },
  {
    icon: Gift,
    title: "Zero-Cost Start",
    description:
      "Runs on Cloudflare Workers + Supabase + Gemini free tiers. No credit card, no trial expiration. Start generating today at $0/month.",
  },
  {
    icon: Server,
    title: "Self-Hostable",
    description:
      "Run the entire stack locally with Docker. MIT licensed, no vendor lock-in. Full control over your data and infrastructure.",
  },
  {
    icon: Cpu,
    title: "Multi-LLM Support",
    description:
      "Swap between Gemini, Claude, GPT, and Ollama without code changes. Use the best model for each task — or bring your own.",
  },
];

export function FeaturesGrid() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE_SIZA }}
          className="mb-14 max-w-2xl"
        >
          <p className="text-xs font-mono text-forge-primary tracking-[0.2em] uppercase mb-3">
            Features
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-foreground mb-4">
            Built for developers who ship
          </h2>
          <p className="text-lg text-forge-text-muted leading-relaxed">
            Everything you need to go from idea to production — with governance
            built in from day one.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                ease: EASE_SIZA,
                delay: i * 0.06,
              }}
              className="group rounded-xl border border-forge-border bg-forge-surface/40 p-6 transition-all duration-200 hover:border-forge-primary/40 hover:shadow-[var(--forge-glow-primary-sm)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-forge-primary/10 text-forge-primary mb-4 transition-colors group-hover:bg-forge-primary/20">
                <feature.icon className="w-5 h-5" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-forge-text-muted leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
