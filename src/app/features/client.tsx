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

const FEATURES: FeatureDetail[] = [
  {
    icon: Sparkles,
    label: "Generation",
    title: "AI that writes production code, not prototypes",
    description:
      "Describe what you need — a dashboard, a checkout flow, an API route. Siza generates components with proper architecture: TypeScript types, error boundaries, loading states, and accessibility baked in.",
    bullets: [
      "React, Next.js, Vue, and plain HTML support",
      "Atomic Design structure — atoms, molecules, organisms",
      "Live preview with hot-reload before you commit",
      "Multi-LLM: Gemini, Claude, GPT, or your own Ollama",
    ],
  },
  {
    icon: Shield,
    label: "Governance",
    title: "Every generation scored A-F automatically",
    description:
      "The post-generation scorecard evaluates security, accessibility, code quality, type safety, and responsive design. No manual review needed — governance is built into the generation loop.",
    bullets: [
      "5 quality gates: security (3x weight), a11y, lint, types, responsive",
      "A-F letter grade on every output",
      "Policy packs for org-level rules",
      "CI integration — scorecards run in your pipeline",
    ],
  },
  {
    icon: Plug,
    label: "MCP-Native",
    title: "30+ composable tools, zero lock-in",
    description:
      "Built on Model Context Protocol from the ground up. Every capability — UI generation, branding, scaffolding — is an MCP tool you can use independently, extend, or replace.",
    bullets: [
      "21 UI generation tools + 9 branding tools",
      "mcp-gateway routes and authenticates requests",
      "Bring your own MCP tools or swap providers",
      "Self-hostable with Docker, MIT licensed",
    ],
  },
  {
    icon: Lock,
    label: "Security",
    title: "Your keys never touch our servers",
    description:
      "BYOK (Bring Your Own Key) with client-side AES-256 encryption. API keys are encrypted in your browser before storage. We literally cannot read them.",
    bullets: [
      "Client-side AES-256 encryption for all API keys",
      "Supabase Row-Level Security on every table",
      "Audit trails from prompt to merge",
      "SOC 2-ready architecture",
    ],
  },
  {
    icon: BarChart3,
    label: "Observability",
    title: "Full visibility from prompt to production",
    description:
      "Track every generation, score trend over time, and audit who generated what. The service catalog gives you a dependency graph across your entire organization.",
    bullets: [
      "Generation count and trend analytics",
      "Scorecard history per project",
      "Service catalog with dependency graph",
      "catalog-info.yaml import from Backstage",
    ],
  },
  {
    icon: GitBranch,
    label: "Golden Paths",
    title: "Scaffold projects the right way, every time",
    description:
      "Golden Path templates encode your organization's best practices into one-click project scaffolds. New services start with the right structure, CI, and governance from day one.",
    bullets: [
      "5 official templates: Next.js, API, Library, MCP Tool, Monorepo",
      "Custom templates with your own conventions",
      "Auto-configures CI, linting, testing, and security scanning",
      "forge-init CLI for terminal-based scaffolding",
    ],
  },
  {
    icon: ShieldCheck,
    label: "CI Quality Gates",
    title: "Quality enforcement in every pull request",
    description:
      "Forge AI Action is a GitHub Marketplace extension that runs forge-ai-init governance checks as part of your CI pipeline. Every PR gets an automatic quality score, grade card comment, and inline annotations.",
    bullets: [
      "One-line setup: Forge-Space/forge-ai-action@v1",
      "PR comments with score, grade, delta, and findings table",
      "Inline annotations on files with issues",
      "Configurable threshold — block merges below your standard",
    ],
  },
  {
    icon: LayoutGrid,
    label: "Gallery",
    title: "Browse and reuse AI-generated components",
    description:
      "The public generation gallery showcases featured components with quality scores, framework badges, and one-click code copying. Use any generation as a starting point or learn from high-scoring examples.",
    bullets: [
      "Quality grade badges (A-F) on every component",
      "Filter by framework: React, Next.js, Vue, HTML",
      "Copy code or reuse the original prompt",
      "Curated by the community — feature your best work",
    ],
  },
  {
    icon: ArrowRightLeft,
    label: "Migration",
    title: "Escape legacy code with a governed roadmap",
    description:
      "The migration toolkit assesses your project's health across 5 categories, identifies strangler boundaries for safe decomposition, and generates a phased roadmap with quality gates at every milestone.",
    bullets: [
      "5-category health assessment: deps, architecture, security, quality, readiness",
      "Strangler boundary detection for module decomposition",
      "TypeScript migration plan with prioritized file list",
      "Phased roadmap with quality gates: stabilize → modernize → harden",
    ],
  },
  {
    icon: Compass,
    label: "Onboarding",
    title: "Interactive tour for zero-friction adoption",
    description:
      "New users get a guided walkthrough of every major feature on their first visit. The tour highlights sidebar navigation items with a spotlight overlay — no docs required to get started.",
    bullets: [
      "6-step tour: generate, projects, templates, catalog, golden paths, settings",
      "Auto-triggers for new users, dismissible anytime",
      "Re-triggerable from settings for team demos",
      "Zero dependencies — custom portal-based overlay",
    ],
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Section
        variant="gradient"
        label="Features"
        title="Everything you need to ship with confidence"
        subtitle="From AI generation to governance scorecards — a complete developer platform in one ecosystem."
      >
        <div className="space-y-6">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                ease: EASE_SIZA,
                delay: i * 0.05,
              }}
              className="rounded-xl border border-forge-border bg-forge-surface/40 p-6 md:p-8 transition-all duration-200 hover:border-forge-primary/30"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-forge-primary/10 text-forge-primary">
                  <feature.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-forge-primary tracking-[0.15em] uppercase">
                  {feature.label}
                </span>
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-forge-text-muted leading-relaxed mb-4">
                {feature.description}
              </p>
              <ul className="space-y-2">
                {feature.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-2 text-sm text-forge-text-muted"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-forge-primary/60 shrink-0" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
}
