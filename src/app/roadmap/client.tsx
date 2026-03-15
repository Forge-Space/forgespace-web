"use client";

import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Circle, Clock } from "lucide-react";
import { EASE_SIZA } from "@/lib/constants";
import { FORGE_CTA_EVENTS } from "@/lib/analytics/ga4";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

type PhaseStatus = "complete" | "active" | "planned";

interface Phase {
  status: PhaseStatus;
  title: string;
  description: string;
  items: string[];
}

interface RoadmapPageProps {
  repoCount: number;
}

function buildPhases(repoCount: number): Phase[] {
  return [
    {
      status: "complete",
      title: "Phase 1 — Foundation",
      description:
        "Core platform capabilities shipped and operating in production workflows.",
      items: [
        "AI code generation with live preview",
        "Post-generation quality scorecards",
        "Golden Path scaffolding workflows",
        "Software catalog with dependency graph",
        "BYOK encryption and model routing",
        "Migration assessment and planning toolchain",
        `${repoCount} product repositories aligned on governance standards`,
      ],
    },
    {
      status: "active",
      title: "Phase 2 — Adoption",
      description:
        "Improve discoverability, onboarding, and decision-ready platform visibility.",
      items: [
        "Live ecosystem metadata sync on marketing surfaces",
        "Expanded docs for governance and migration workflows",
        "Community-ready examples and templates",
        "Contributor onboarding improvements across repos",
        "Website narrative and UX refinement",
      ],
    },
    {
      status: "planned",
      title: "Phase 3 — Scale",
      description:
        "Extend collaboration, enterprise controls, and ecosystem extensibility.",
      items: [
        "Collaborative multi-agent workspaces",
        "Cross-product auth and policy unification",
        "Enterprise SSO and compliance controls",
        "Organization-level quality and trend analytics",
        "Extension and plugin ecosystem growth",
      ],
    },
  ];
}

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

export default function RoadmapPage({ repoCount }: RoadmapPageProps) {
  const phases = buildPhases(repoCount);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Section
        variant="gradient"
        label="Roadmap"
        title="Where we're headed"
        subtitle="A transparent view of what is shipped, what is in progress, and what is next."
      >
        <div className="max-w-3xl space-y-6">
          {phases.map((phase, index) => {
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
                  delay: index * 0.1,
                }}
                className={`rounded-xl border p-6 md:p-8 ${config.bg}`}
              >
                <div className="mb-3 flex items-center gap-3">
                  <Icon className={`h-5 w-5 ${config.color}`} />
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {phase.title}
                  </h3>
                  <span className={`ml-auto text-xs font-mono ${config.color}`}>
                    {config.label}
                  </span>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-forge-text-muted">
                  {phase.description}
                </p>
                <ul className="space-y-2">
                  {phase.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-forge-text-muted"
                    >
                      <span
                        className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
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
          <Button
            href="https://siza.forgespace.co/signup"
            external
            size="lg"
            ctaEvent={FORGE_CTA_EVENTS.SIZA}
            ctaTarget="siza"
            ctaLocation="roadmap_primary"
            passAttribution
          >
            Join Siza Beta
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            href="https://docs.forgespace.co/docs"
            external
            variant="outline"
            size="lg"
            ctaEvent={FORGE_CTA_EVENTS.DOCS}
            ctaTarget="docs"
            ctaLocation="roadmap_secondary"
          >
            Read the Docs
          </Button>
        </motion.div>
      </Section>
    </div>
  );
}
