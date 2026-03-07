"use client";

import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Circle, Clock } from "lucide-react";
import { EASE_SIZA } from "@/lib/constants";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

type PhaseStatus = "complete" | "active" | "planned";

interface Phase {
  status: PhaseStatus;
  title: string;
  description: string;
  items: string[];
}

const PHASES: Phase[] = [
  {
    status: "complete",
    title: "Phase 1 — Foundation",
    description: "Core platform with AI generation, governance, and IDP primitives.",
    items: [
      "AI code generation with live preview",
      "Post-generation A-F scorecard (5 quality gates)",
      "Golden Path templates (5 official scaffolds)",
      "Software catalog with dependency graph",
      "BYOK encryption + multi-LLM support",
      "MCP Gateway with JWT auth and rate limiting",
      "forge-init CLI and 5 scorecard collectors",
      "Brand system with 9 MCP tools",
    ],
  },
  {
    status: "active",
    title: "Phase 2 — User Acquisition",
    description:
      "Documentation, community, and developer experience improvements.",
    items: [
      "IDP messaging and pricing page",
      "Documentation guides (scorecard, policy packs, BYOK)",
      "Good-first-issues across 7 repos",
      "Governance files (LICENSE, CONTRIBUTING, catalog-info.yaml)",
      "Website redesign and content depth",
      "Community Discord server",
      "Launch post and developer outreach",
    ],
  },
  {
    status: "planned",
    title: "Phase 3 — Scale",
    description:
      "Multi-agent workflows, enterprise features, and ecosystem growth.",
    items: [
      "Collaborative multi-agent workspaces",
      "Gateway-webapp auth unification",
      "Enterprise SSO and data residency",
      "Scorecard trends and org analytics",
      "Marketplace for community MCP tools",
      "VS Code and Cursor extensions",
    ],
  },
];

const statusConfig: Record<
  PhaseStatus,
  { icon: typeof CheckCircle2; color: string; bg: string; label: string }
> = {
  complete: {
    icon: CheckCircle2,
    color: "text-green-400",
    bg: "bg-green-400/10 border-green-400/30",
    label: "Complete",
  },
  active: {
    icon: Clock,
    color: "text-forge-primary",
    bg: "bg-forge-primary/10 border-forge-primary/30",
    label: "In Progress",
  },
  planned: {
    icon: Circle,
    color: "text-forge-text-subtle",
    bg: "bg-forge-surface border-forge-border",
    label: "Planned",
  },
};

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Section
        variant="gradient"
        label="Roadmap"
        title="Where we're headed"
        subtitle="A transparent view of what's shipped, what's in progress, and what's next."
      >
        <div className="space-y-6 max-w-3xl">
          {PHASES.map((phase, i) => {
            const config = statusConfig[phase.status];
            const Icon = config.icon;

            return (
              <motion.div
                key={phase.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  ease: EASE_SIZA,
                  delay: i * 0.1,
                }}
                className={`rounded-xl border p-6 md:p-8 ${config.bg}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Icon className={`w-5 h-5 ${config.color}`} />
                  <h3 className="font-display font-semibold text-foreground text-lg">
                    {phase.title}
                  </h3>
                  <span
                    className={`text-xs font-mono ${config.color} ml-auto`}
                  >
                    {config.label}
                  </span>
                </div>
                <p className="text-sm text-forge-text-muted mb-4 leading-relaxed">
                  {phase.description}
                </p>
                <ul className="space-y-2">
                  {phase.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-forge-text-muted"
                    >
                      <span
                        className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${
                          phase.status === "complete"
                            ? "bg-green-400/60"
                            : phase.status === "active"
                              ? "bg-forge-primary/60"
                              : "bg-forge-text-subtle/40"
                        }`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: EASE_SIZA, delay: 0.4 }}
          className="mt-12 flex flex-wrap gap-4"
        >
          <Button href="https://siza.forgespace.co" external size="lg">
            Try Siza
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button
            href="https://github.com/Forge-Space"
            external
            variant="outline"
            size="lg"
          >
            View on GitHub
          </Button>
        </motion.div>
      </Section>
    </div>
  );
}
