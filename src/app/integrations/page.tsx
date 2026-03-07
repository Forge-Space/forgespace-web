"use client";

import { motion, useReducedMotion } from "motion/react";
import { Plug } from "lucide-react";
import { PageSection } from "@/components/layout/PageSection";
import { EcosystemCard } from "@/components/shared/EcosystemCard";

import { EASE_SIZA } from '@/lib/constants';

const INTEGRATIONS = [
  { name: "GitHub", desc: "Repos, issues, PRs" },
  { name: "Cloudflare", desc: "Workers, R2, D1" },
  { name: "Supabase", desc: "Auth, DB, storage" },
  { name: "Stripe", desc: "Payments, billing" },
  { name: "OpenAI", desc: "GPT models" },
  { name: "Anthropic", desc: "Claude models" },
  { name: "Google Gemini", desc: "Gemini API" },
  { name: "Slack", desc: "Notifications" },
  { name: "Linear", desc: "Issue tracking" },
];

export default function IntegrationsPage() {
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
          label="INTEGRATIONS"
          title="Extend your workspace"
          subtitle="Connect MCP servers and tools. GitHub, Cloudflare, Supabase, and more."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {INTEGRATIONS.map((int, i) => (
              <motion.div
                key={int.name}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  ease: EASE_SIZA,
                  delay: 0.05 + i * 0.05,
                }}
              >
                <EcosystemCard
                  icon={Plug}
                  title={int.name}
                  description={int.desc}
                />
              </motion.div>
            ))}
          </div>
        </PageSection>
      </main>
    </div>
  );
}
