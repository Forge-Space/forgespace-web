import type { Metadata } from "next";

type PageSEO = {
  title: string;
  description: string;
  keywords?: string[];
};

const pages: Record<string, PageSEO> = {
  features: {
    title: "Features",
    description:
      "AI code generation, governance scorecards, policy packs, golden path templates, and MCP-native integrations. Everything you need to ship with confidence.",
    keywords: [
      "AI code generation",
      "governance scorecards",
      "policy packs",
      "golden paths",
      "MCP tools",
    ],
  },
  governance: {
    title: "Governance",
    description:
      "Built-in policy engine, quality scorecards, and audit trails. Prevent AI limbo engineering with automated governance from prompt to production.",
    keywords: [
      "code governance",
      "policy engine",
      "quality scorecard",
      "audit trail",
      "compliance",
    ],
  },
  pricing: {
    title: "Pricing",
    description:
      "Free for individuals, affordable for teams. Open-source IDP with no vendor lock-in. Start generating governed code today.",
    keywords: ["IDP pricing", "free developer platform", "open source IDP"],
  },
  ecosystem: {
    title: "Ecosystem",
    description:
      "9 repositories powering the Forge Space platform. From MCP gateway to brand system — explore the open-source ecosystem.",
    keywords: ["open source ecosystem", "MCP gateway", "developer tools"],
  },
  "how-it-works": {
    title: "How It Works",
    description:
      "Three steps: describe what you need, AI generates governed code, ship with confidence. See how Forge Space transforms your development workflow.",
    keywords: [
      "AI workflow",
      "code generation pipeline",
      "developer experience",
    ],
  },
  integrations: {
    title: "Integrations",
    description:
      "Connect with your existing tools. MCP protocol, CI/CD pipelines, Supabase, Cloudflare Workers, and more.",
    keywords: ["MCP integration", "CI/CD", "developer tools integration"],
  },
  patterns: {
    title: "Patterns",
    description:
      "Architectural patterns, security templates, and quality configurations shared across your organization. The foundation of governed development.",
    keywords: ["architectural patterns", "code templates", "security patterns"],
  },
  enterprise: {
    title: "Enterprise",
    description:
      "Enterprise-grade governance at startup speed. Custom policies, SSO, dedicated support, and org-wide dashboards.",
    keywords: [
      "enterprise IDP",
      "SSO",
      "custom policies",
      "enterprise governance",
    ],
  },
  "command-center": {
    title: "Command Center",
    description:
      "Your developer portal dashboard. Monitor scorecards, manage golden paths, track governance compliance across all projects.",
    keywords: [
      "developer portal",
      "project dashboard",
      "governance monitoring",
    ],
  },
  onboarding: {
    title: "Getting Started",
    description:
      "Set up Forge Space in minutes. Connect your AI provider, configure governance rules, and start generating production-ready code.",
    keywords: ["getting started", "developer onboarding", "IDP setup"],
  },
  protocol: {
    title: "Protocol",
    description:
      "MCP-native architecture. Learn how Forge Space uses the Model Context Protocol to connect AI providers with governance guardrails.",
    keywords: ["MCP protocol", "Model Context Protocol", "AI architecture"],
  },
  roadmap: {
    title: "Roadmap",
    description:
      "See what we are building next. From ecosystem growth to enterprise features — our transparent development roadmap.",
    keywords: ["product roadmap", "upcoming features", "IDP roadmap"],
  },
};

export function getPageMetadata(slug: string): Metadata {
  const page = pages[slug];
  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    openGraph: {
      title: `${page.title} | Forge Space`,
      description: page.description,
    },
  };
}
