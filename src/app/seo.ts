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
      "AI code generation, governance scorecards, policy packs, golden path templates, and MCP-native architecture. Everything you need to ship with confidence.",
    keywords: [
      "AI code generation",
      "governance scorecards",
      "policy packs",
      "golden paths",
      "MCP tools",
      "CI quality gates",
      "GitHub Action",
      "component gallery",
      "onboarding tour",
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
      "9 open-source repositories powering the Forge Space platform. Generation engine, governance hub, and brand system — explore the ecosystem.",
    keywords: ["open source ecosystem", "MCP gateway", "developer tools"],
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
  roadmap: {
    title: "Roadmap",
    description:
      "See what we've shipped and what's next. From AI generation to enterprise features — our transparent development roadmap.",
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
