import type { Metadata } from "next";

type PageSEO = {
  title: string;
  description: string;
  canonicalPath: string;
  keywords?: string[];
  absoluteTitle?: boolean;
  twitterTitle?: string;
  twitterDescription?: string;
};

const SITE_URL = "https://forgespace.co";

const pages: Record<string, PageSEO> = {
  home: {
    title: "Forge Space — Generate code with AI. Ship it with confidence.",
    description:
      "Open-source Internal Developer Platform. AI code generation with scorecards, policy packs, and audit trails. Free for individuals.",
    canonicalPath: "/",
    absoluteTitle: true,
    keywords: [
      "internal developer platform",
      "IDP",
      "AI code generation",
      "governance",
      "scorecard",
      "MCP",
      "open source",
    ],
    twitterTitle: "Forge Space — IDP for the rest of us",
    twitterDescription:
      "AI code generation with built-in governance. Free & open source.",
  },
  features: {
    title: "Features",
    description:
      "AI code generation, governance scorecards, policy packs, golden path templates, and MCP-native architecture. Everything you need to ship with confidence.",
    canonicalPath: "/features",
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
      "legacy migration",
      "migration assessment",
    ],
  },
  pricing: {
    title: "Pricing",
    description:
      "Free for individuals, affordable for teams. Open-source IDP with no vendor lock-in. Start generating governed code today.",
    canonicalPath: "/pricing",
    keywords: ["IDP pricing", "free developer platform", "open source IDP"],
  },
  ecosystem: {
    title: "Ecosystem",
    description:
      "11 product repositories powering Forge Space. Explore live release tags, update activity, and ecosystem architecture synced from GitHub.",
    canonicalPath: "/ecosystem",
    keywords: ["open source ecosystem", "MCP gateway", "developer tools"],
  },
  enterprise: {
    title: "Enterprise",
    description:
      "Enterprise-grade governance at startup speed. Custom policies, SSO, dedicated support, and org-wide dashboards.",
    canonicalPath: "/enterprise",
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
    canonicalPath: "/roadmap",
    keywords: ["product roadmap", "upcoming features", "IDP roadmap"],
  },
  startups: {
    title: "For Startups",
    description:
      "Enterprise governance at startup speed. Free for teams under 15 devs. AI code generation with scorecards, policy packs, and zero-config security — no platform team required.",
    canonicalPath: "/startups",
    keywords: [
      "startup developer tools",
      "startup governance",
      "free IDP for startups",
      "accelerator program",
      "AI code governance",
      "startup platform engineering",
    ],
  },
};

type PageMetadataSlug = keyof typeof pages;

function toAbsoluteUrl(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

export function getPageMetadata(slug: PageMetadataSlug): Metadata {
  const page = pages[slug];
  const canonicalUrl = toAbsoluteUrl(page.canonicalPath);
  const openGraphTitle = page.absoluteTitle ? page.title : `${page.title} | Forge Space`;

  return {
    title: page.absoluteTitle ? { absolute: page.title } : page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: openGraphTitle,
      description: page.description,
      url: canonicalUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: page.twitterTitle ?? openGraphTitle,
      description: page.twitterDescription ?? page.description,
      images: ["/og.png"],
    },
  };
}
