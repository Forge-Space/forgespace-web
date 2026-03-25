"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { EASE_SIZA } from "@/lib/constants";
import { FORGE_CTA_EVENTS } from "@/lib/analytics/ga4";
import { Button } from "@/components/ui/Button";

type PhaseStatus = "complete" | "active" | "planned";

interface PhaseItem {
  text: string;
  status: PhaseStatus;
  href?: string;
}

interface Phase {
  number: string;
  status: PhaseStatus;
  title: string;
  subtitle: string;
  description: string;
  stat: string;
  items: PhaseItem[];
}

interface RoadmapPageProps {
  repoCount: number;
}

function buildPhases(repoCount: number): Phase[] {
  return [
    {
      number: "01",
      status: "complete",
      title: "Foundation",
      subtitle: "Core platform capabilities",
      description:
        "Core platform capabilities shipped and operating in production workflows.",
      stat: "7 items shipped",
      items: [
        {
          text: "AI code generation with live preview",
          status: "complete",
          href: "https://github.com/Forge-Space/siza",
        },
        {
          text: "Post-generation quality scorecards",
          status: "complete",
          href: "https://github.com/Forge-Space/core",
        },
        {
          text: "Golden Path scaffolding workflows",
          status: "complete",
          href: "https://github.com/Forge-Space/siza-gen",
        },
        {
          text: "Software catalog with dependency graph",
          status: "complete",
          href: "https://github.com/Forge-Space/siza",
        },
        {
          text: "BYOK encryption and model routing",
          status: "complete",
          href: "https://github.com/Forge-Space/siza#readme",
        },
        {
          text: "Migration assessment and planning toolchain",
          status: "complete",
          href: "https://github.com/Forge-Space/forge-ai-init",
        },
        {
          text: `${repoCount} product repositories aligned on governance standards`,
          status: "complete",
          href: "https://github.com/Forge-Space",
        },
      ],
    },
    {
      number: "02",
      status: "active",
      title: "Adoption",
      subtitle: "Discoverability & onboarding",
      description:
        "Improve discoverability, onboarding, and decision-ready platform visibility.",
      stat: "5 items in progress",
      items: [
        {
          text: "Live ecosystem metadata sync on marketing surfaces",
          status: "active",
          href: "https://github.com/Forge-Space/forgespace-web/pull/82",
        },
        {
          text: "Expanded docs for governance and migration workflows",
          status: "active",
          href: "https://github.com/Forge-Space/siza#readme",
        },
        {
          text: "Community-ready examples and templates",
          status: "active",
          href: "https://github.com/Forge-Space/siza/issues",
        },
        {
          text: "Contributor onboarding improvements across repos",
          status: "active",
          href: "https://github.com/Forge-Space/.github",
        },
        {
          text: "Website narrative and UX refinement",
          status: "active",
          href: "https://github.com/Forge-Space/forgespace-web/pull/82",
        },
      ],
    },
    {
      number: "03",
      status: "planned",
      title: "Scale",
      subtitle: "Enterprise & extensibility",
      description:
        "Extend collaboration, enterprise controls, and ecosystem extensibility.",
      stat: "5 items planned",
      items: [
        {
          text: "Collaborative multi-agent workspaces",
          status: "planned",
          href: "https://github.com/Forge-Space/siza/issues",
        },
        {
          text: "Cross-product auth and policy unification",
          status: "planned",
          href: "https://github.com/Forge-Space/mcp-gateway",
        },
        {
          text: "Enterprise SSO and compliance controls",
          status: "planned",
          href: "https://github.com/Forge-Space/siza/issues",
        },
        {
          text: "Organization-level quality and trend analytics",
          status: "planned",
          href: "https://github.com/Forge-Space/core",
        },
        {
          text: "Extension and plugin ecosystem growth",
          status: "planned",
          href: "https://github.com/Forge-Space/ui-mcp",
        },
      ],
    },
  ];
}

const statusConfig: Record<
  PhaseStatus,
  {
    badge: string;
    bullet: string;
    pillBg: string;
    pillLabel: string;
    pillLabelCompact: string;
  }
> = {
  complete: {
    badge: "bg-green-500/15 text-green-400 border border-green-500/25",
    bullet: "text-green-400",
    pillBg: "bg-green-500",
    pillLabel: "Foundation · Complete",
    pillLabelCompact: "Foundation",
  },
  active: {
    badge:
      "bg-forge-primary/15 text-forge-primary border border-forge-primary/25",
    bullet: "text-forge-primary",
    pillBg: "bg-forge-primary",
    pillLabel: "Adoption · Active",
    pillLabelCompact: "Adoption",
  },
  planned: {
    badge: "bg-forge-surface text-forge-text-subtle border border-forge-border",
    bullet: "text-forge-text-subtle",
    pillBg: "bg-forge-surface border border-forge-border",
    pillLabel: "Scale · Planned",
    pillLabelCompact: "Scale",
  },
};

function ItemBullet({ status }: { status: PhaseStatus }) {
  if (status === "complete") {
    return (
      <span className="mt-0.5 shrink-0 text-green-400 text-sm leading-none">
        ✓
      </span>
    );
  }
  if (status === "active") {
    return (
      <span className="mt-1 shrink-0 h-2 w-2 rounded-full bg-forge-primary block" />
    );
  }
  return (
    <span className="mt-0.5 shrink-0 text-forge-text-subtle text-sm leading-none">
      ○
    </span>
  );
}

export default function RoadmapPage({ repoCount = 10 }: RoadmapPageProps) {
  const phases = buildPhases(repoCount);

  return (
    <main
      id="main-content"
      className="min-h-screen bg-background font-sans text-foreground"
    >
      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Radial gradient backdrop */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,0.18) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_SIZA }}
          >
            <p className="label-mono mb-6">ROADMAP</p>
            <h1 className="font-display text-display-lg font-bold tracking-tight text-foreground leading-[1.15] mb-6">
              Building the future of{" "}
              <br className="hidden sm:block" />
              <span className="text-gradient-primary">AI governance.</span>
            </h1>
            <p className="text-lg md:text-xl text-forge-text-muted leading-relaxed max-w-2xl">
              A transparent view of what is shipped, in progress, and what
              comes next.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Phase Progress Bar */}
      <div className="max-w-5xl mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_SIZA, delay: 0.2 }}
          className="flex items-center gap-0"
        >
          {phases.map((phase, i) => {
            const config = statusConfig[phase.status];
            return (
              <div key={phase.number} className="flex items-center flex-1">
                <div className="flex min-w-0 flex-col items-center gap-2 flex-1">
                  <div
                    className={`h-2 w-full rounded-full ${config.pillBg}`}
                  />
                  <span className="text-[10px] sm:text-xs font-mono text-forge-text-subtle text-center leading-tight max-w-[7.5rem] sm:max-w-none">
                    <span className="sm:hidden">{config.pillLabelCompact}</span>
                    <span className="hidden sm:inline">{config.pillLabel}</span>
                  </span>
                </div>
                {i < phases.length - 1 && (
                  <div className="h-[1px] w-4 bg-forge-border shrink-0" />
                )}
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Phase Sections */}
      <div className="max-w-5xl mx-auto px-6 pb-24">
        {phases.map((phase, index) => {
          const config = statusConfig[phase.status];
          return (
            <motion.div
              key={phase.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                ease: EASE_SIZA,
                delay: index * 0.1,
              }}
            >
              {index > 0 && (
                <div className="border-t border-forge-border" />
              )}
              <div className={`lg:grid lg:grid-cols-[1fr_2fr] gap-12 py-14 ${phase.status === "active" ? "border-l-2 border-l-forge-primary pl-4 lg:pl-6" : ""}`}>
                {/* Left: phase meta */}
                <div className="mb-8 lg:mb-0">
                  <p className={`font-mono text-6xl font-bold leading-none mb-4 select-none ${phase.status === "active" ? "text-forge-primary/30" : "text-forge-border"}`}>
                    {phase.number}
                  </p>
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono font-medium mb-4 ${config.badge}`}
                  >
                    {phase.status === "complete"
                      ? "Complete"
                      : phase.status === "active"
                        ? "Active"
                        : "Planned"}
                  </span>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                    {phase.title}
                  </h2>
                  <p className="text-sm text-forge-text-muted leading-relaxed mb-4">
                    {phase.description}
                  </p>
                  <p className="text-xs font-mono text-forge-text-subtle">
                    {phase.stat}
                  </p>
                </div>

                {/* Right: item list */}
                <ul className="space-y-3">
                  {phase.items.map((item) => (
                    <li
                      key={item.text}
                      className="flex items-start gap-3 text-sm text-forge-text-muted"
                    >
                      <ItemBullet status={item.status} />
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={
                            item.status === "complete"
                              ? "text-foreground/80 underline decoration-forge-border underline-offset-4 transition-colors hover:text-foreground"
                              : item.status === "active"
                                ? "text-foreground/70 underline decoration-forge-border underline-offset-4 transition-colors hover:text-foreground"
                                : "text-forge-text-subtle underline decoration-forge-border underline-offset-4 transition-colors hover:text-foreground"
                          }
                        >
                          {item.text}
                        </a>
                      ) : (
                        <span
                          className={
                            item.status === "complete"
                              ? "text-foreground/80"
                              : item.status === "active"
                                ? "text-foreground/70"
                                : "text-forge-text-subtle"
                          }
                        >
                          {item.text}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CTA Row */}
      <div className="border-t border-forge-border">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: EASE_SIZA }}
            className="flex flex-wrap gap-4"
          >
            <Button
              href="https://siza.forgespace.co"
              external
              size="lg"
              ctaEvent={FORGE_CTA_EVENTS.SIZA}
              ctaTarget="siza"
              ctaLocation="roadmap_primary"
              passAttribution
            >
              Try Siza
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              href="https://github.com/Forge-Space"
              external
              variant="outline"
              size="lg"
              ctaEvent={FORGE_CTA_EVENTS.GITHUB}
              ctaTarget="github"
              ctaLocation="roadmap_secondary"
            >
              View on GitHub
            </Button>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
