"use client";

import { motion } from "motion/react";
import { Layers, ExternalLink } from "lucide-react";
import { EASE_SIZA } from "@/lib/constants";
import { Section } from "@/components/ui/Section";

interface Repo {
  name: string;
  npm?: string;
  description: string;
  highlights: string[];
  href: string;
}

const REPO_GROUPS: { title: string; repos: Repo[] }[] = [
  {
    title: "Generation Engine",
    repos: [
      {
        name: "siza",
        description:
          "AI workspace — generate production-ready code with live preview, scorecards, and audit trails.",
        highlights: [
          "Next.js 16 + React 19 + Supabase",
          "Post-gen A-F scorecard",
          "Golden Path templates",
          "Software catalog",
        ],
        href: "https://siza.forgespace.co",
      },
      {
        name: "siza-gen",
        npm: "@forgespace/siza-gen",
        description:
          "AI generation engine with 502-snippet component registry and context assembler.",
        highlights: [
          "6 composable context sections",
          "Lite bundle (43 KB) for edge",
          "458 tests across 23 suites",
        ],
        href: "https://github.com/Forge-Space/siza-gen",
      },
      {
        name: "ui-mcp",
        npm: "@forgespace/ui-mcp",
        description:
          "21 MCP tools for UI generation, forms, pages, and full-app scaffolding.",
        highlights: [
          "Component, form, page, and app generation",
          "Zod validation on all inputs",
          "437 tests across 35 suites",
        ],
        href: "https://github.com/Forge-Space/ui-mcp",
      },
    ],
  },
  {
    title: "Governance & Routing",
    repos: [
      {
        name: "forge-patterns",
        npm: "@forgespace/core",
        description:
          "Shared standards library — scorecards, policy packs, CLI tools, and governance.",
        highlights: [
          "5 scorecard collectors",
          "forge-init CLI for scaffolding",
          "396 tests across 19 suites",
        ],
        href: "https://github.com/Forge-Space/core",
      },
      {
        name: "mcp-gateway",
        description:
          "Central hub for MCP aggregation, routing, authentication, and rate limiting.",
        highlights: [
          "JSON-RPC with Supabase JWT auth",
          "AI-powered tool routing",
          "OpenAPI documentation",
        ],
        href: "https://github.com/Forge-Space/mcp-gateway",
      },
    ],
  },
  {
    title: "Design & Brand",
    repos: [
      {
        name: "branding-mcp",
        npm: "@forgespace/branding-mcp",
        description:
          "9 MCP tools for AI-powered brand identity generation.",
        highlights: [
          "WCAG-validated color palettes",
          "Multi-format token export",
          "198 tests",
        ],
        href: "https://github.com/Forge-Space/branding-mcp",
      },
      {
        name: "brand-guide",
        npm: "@forgespace/brand-guide",
        description:
          "Design system source of truth — tokens, logos, typography.",
        highlights: [
          "7 logo variants (SVG, PNG, WEBP)",
          "Sub-brand tokens",
          "brand.forgespace.co",
        ],
        href: "https://brand.forgespace.co",
      },
    ],
  },
];

export default function EcosystemPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Section
        variant="gradient"
        label="Ecosystem"
        title="Nine repos. One vision."
        subtitle="Every layer is open source. Use them together as a platform, or independently as libraries."
      >
        <div className="space-y-12">
          {REPO_GROUPS.map((group, gi) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                ease: EASE_SIZA,
                delay: gi * 0.1,
              }}
            >
              <h3 className="text-xs font-mono text-forge-text-subtle tracking-[0.15em] uppercase mb-4">
                {group.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {group.repos.map((repo) => (
                  <a
                    key={repo.name}
                    href={repo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-xl border border-forge-border bg-forge-surface/40 p-6 transition-all duration-200 hover:border-forge-primary/40 hover:shadow-[var(--forge-glow-primary-sm)]"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Layers className="w-4 h-4 text-forge-primary" />
                      <h4 className="font-mono text-sm font-semibold text-foreground">
                        {repo.name}
                      </h4>
                      {repo.npm && (
                        <span className="text-[10px] font-mono text-forge-text-subtle bg-forge-surface rounded px-1.5 py-0.5">
                          {repo.npm}
                        </span>
                      )}
                      <ExternalLink className="w-3 h-3 text-forge-text-subtle ml-auto opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                    <p className="text-sm text-forge-text-muted mb-3 leading-relaxed">
                      {repo.description}
                    </p>
                    <ul className="space-y-1">
                      {repo.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex items-start gap-2 text-xs text-forge-text-subtle"
                        >
                          <span className="mt-1 h-1 w-1 rounded-full bg-forge-primary/50 shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
}
