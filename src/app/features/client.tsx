"use client";

import { motion } from "motion/react";
import {
  Sparkles,
  Shield,
  Plug,
  Lock,
  BarChart3,
  GitBranch,
  ShieldCheck,
  LayoutGrid,
  Compass,
  ArrowRightLeft,
} from "lucide-react";
import { EASE_SIZA } from "@/lib/constants";
import { Section } from "@/components/ui/Section";
import { type LucideIcon } from "lucide-react";

interface FeatureDetail {
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  bullets: string[];
}

interface FeaturesPageProps {
  repoCount: number;
}

const FEATURES: FeatureDetail[] = [
  {
    icon: Sparkles,
    label: "Generation",
    title: "AI that writes production code, not throwaway demos",
    description:
      "Describe what you need and generate implementation-ready output with architecture, typing, loading states, and accessibility in place.",
    bullets: [
      "React, Next.js, Vue, and HTML workflows",
      "Structured output with reviewable diff paths",
      "Live preview loop before merge",
      "Model-agnostic generation pipeline",
    ],
  },
  {
    icon: Shield,
    label: "Governance",
    title: "Quality scoring is built into every generation",
    description:
      "Post-generation scoring evaluates security, accessibility, maintainability, and reliability so quality gates start at generation time.",
    bullets: [
      "Weighted quality categories",
      "Grade-based output summaries",
      "Policy-pack alignment",
      "CI-compatible reporting",
    ],
  },
  {
    icon: Plug,
    label: "MCP-Native",
    title: "Composable architecture with zero lock-in",
    description:
      "Generation, migration, and branding capabilities are exposed as MCP tools, letting teams swap providers and compose custom stacks.",
    bullets: [
      "Tool-router architecture via mcp-gateway",
      "Independent service versioning",
      "Self-hostable runtime options",
      "Open-source contract surface",
    ],
  },
  {
    icon: Lock,
    label: "Security",
    title: "BYOK with encrypted key handling",
    description:
      "Bring-your-own-key flows keep provider credentials encrypted client-side with strict boundary validation across service calls.",
    bullets: [
      "Client-side key encryption",
      "Supabase Row-Level Security enforcement",
      "Audit events from prompt to merge",
      "Security scanning in CI pipelines",
    ],
  },
  {
    icon: BarChart3,
    label: "Observability",
    title: "Trace quality and delivery outcomes over time",
    description:
      "Track generation trends, score evolution, and service relationships with software catalog and API visibility built in.",
    bullets: [
      "Catalog and dependency graph",
      "Generation and score history",
      "CI/CD and API visibility panels",
      "Backstage-compatible imports",
    ],
  },
  {
    icon: GitBranch,
    label: "Golden Paths",
    title: "Scaffold with standards encoded from day one",
    description:
      "Golden Path templates package governance, CI, and quality defaults so new services inherit platform standards automatically.",
    bullets: [
      "Template-driven bootstrap workflows",
      "Parameter-based scaffolding",
      "Governance defaults pre-wired",
      "CLI-first and UI-first entry points",
    ],
  },
  {
    icon: ShieldCheck,
    label: "CI Quality Gates",
    title: "Enforce quality directly in pull requests",
    description:
      "forge-ai-action brings scanner checks, migration reports, and PR annotations directly into your existing GitHub workflows.",
    bullets: [
      "Assess, migrate, and score commands",
      "Inline annotations and PR summaries",
      "Threshold-based blocking rules",
      "Delta tracking on changed files",
    ],
  },
  {
    icon: LayoutGrid,
    label: "Gallery",
    title: "Reuse high-signal generation patterns",
    description:
      "Browse featured outputs with quality context, copy code, and reuse prompts to accelerate onboarding and adoption.",
    bullets: [
      "Framework-level filtering",
      "Prompt and code reuse paths",
      "Quality badges on artifacts",
      "Community curation workflow",
    ],
  },
  {
    icon: ArrowRightLeft,
    label: "Migration",
    title: "Modernize legacy systems with governed plans",
    description:
      "Assessment and migration tooling maps risk, suggests strategy, and builds phased modernization plans with objective gates.",
    bullets: [
      "Health scoring across critical categories",
      "Boundary detection for staged extraction",
      "Phased roadmap with gate thresholds",
      "Actionable findings by priority",
    ],
  },
  {
    icon: Compass,
    label: "Onboarding",
    title: "Adopt faster with guided product flows",
    description:
      "Interactive onboarding introduces generation, catalog, templates, and governance surfaces without requiring separate setup docs.",
    bullets: [
      "Guided in-app walkthrough",
      "Feature discovery overlays",
      "Re-runnable demos for teams",
      "Low-friction setup defaults",
    ],
  },
];

export default function FeaturesPage({ repoCount }: FeaturesPageProps) {
  return (
    <main
      id="main-content"
      className="min-h-screen bg-background font-sans text-foreground"
    >
      <Section
        variant="gradient"
        label="Features"
        title="Everything you need to ship with confidence"
        subtitle={`A complete developer platform across ${repoCount} actively maintained repositories.`}
      >
        <div className="space-y-6">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                ease: EASE_SIZA,
                delay: index * 0.05,
              }}
              className="rounded-xl border border-forge-border bg-forge-surface/40 p-6 transition-all duration-200 hover:border-forge-primary/30 focus-within:border-forge-primary/40 md:p-8"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-forge-primary/10 text-forge-primary">
                  <feature.icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-mono uppercase tracking-[0.15em] text-forge-primary">
                  {feature.label}
                </span>
              </div>
              <h3 className="mb-3 font-display text-xl font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mb-4 leading-relaxed text-forge-text-muted">
                {feature.description}
              </p>
              <ul className="space-y-2">
                {feature.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-2 text-sm text-forge-text-muted"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-forge-primary/60" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Section>
    </main>
  );
}
