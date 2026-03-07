"use client";

import { motion } from "motion/react";
import { Sparkles, Plug, Shield, Gift, Server, Cpu } from "lucide-react";
import { PageSection } from "@/components/layout/PageSection";
import { EcosystemCard } from "@/components/shared/EcosystemCard";

import { EASE_SIZA } from "@/lib/constants";

const FEATURES = [
  {
    icon: Sparkles,
    title: "AI-Powered Generation",
    description:
      "Natural language or screenshot to production UI. Build interfaces in minutes, not hours.",
  },
  {
    icon: Plug,
    title: "MCP-Native",
    description:
      "21 UI tools, 9 branding tools, composable via Model Context Protocol.",
  },
  {
    icon: Shield,
    title: "Privacy-First BYOK",
    description:
      "Bring your own key, client-side AES-256 encryption. Your data stays yours.",
  },
  {
    icon: Gift,
    title: "Generous Free Tier",
    description:
      "Cloudflare + Supabase + Gemini at $0/month. Start building today.",
  },
  {
    icon: Server,
    title: "Self-Hostable",
    description: "Run locally with Docker, MIT licensed. No vendor lock-in.",
  },
  {
    icon: Cpu,
    title: "Multi-LLM",
    description:
      "Swap Gemini, Claude, GPT without code changes. Use the best model for each task.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--forge-gradient-hero)" }}
        aria-hidden
      />
      <main className="relative">
        <PageSection
          label="FEATURES"
          title="Built for developers who ship"
          subtitle="Everything you need to go from idea to production."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  ease: EASE_SIZA,
                  delay: 0.1 + i * 0.06,
                }}
              >
                <EcosystemCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              </motion.div>
            ))}
          </div>
        </PageSection>
      </main>
    </div>
  );
}
