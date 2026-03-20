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
      "Open-source Internal Developer Platform. AI code generation with scorecards, policy packs, and audit trails.",
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
      "AI code generation with built-in governance. Open source.",
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
      "Open-source IDP for teams that need governed AI development. Start generating governed code today.",
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
      "Enterprise governance at startup speed. AI code generation with scorecards, policy packs, and security guardrails for lean engineering teams.",
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
  pt: {
    title: "Forge Space — IDP open-source para times sem equipe de plataforma",
    description:
      "Plataforma de desenvolvimento open-source com geração de código por IA, scorecards de governança e trilhas de auditoria.",
    canonicalPath: "/pt",
    absoluteTitle: true,
    keywords: [
      "plataforma de desenvolvimento interno",
      "IDP open source",
      "geração de código com IA",
      "governança de software",
      "MCP",
      "ferramentas para desenvolvedores",
      "Backstage alternativa",
    ],
    twitterTitle: "Forge Space — IDP para times sem plataforma",
    twitterDescription:
      "Geração de código com IA e governança integrada. Open source.",
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
  const ogImagePath =
    page.canonicalPath === "/" ? "/opengraph-image" : `${page.canonicalPath}/opengraph-image`;

  return {
    title: page.absoluteTitle ? { absolute: page.title } : page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: {
      canonical: canonicalUrl,
      ...(slug === "home" || slug === "pt"
        ? {
            languages: {
              en: "https://forgespace.co",
              "pt-BR": "https://forgespace.co/pt",
              "x-default": "https://forgespace.co",
            },
          }
        : {}),
    },
    openGraph: {
      title: openGraphTitle,
      description: page.description,
      url: canonicalUrl,
      images: [{ url: ogImagePath, width: 1200, height: 630, alt: openGraphTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.twitterTitle ?? openGraphTitle,
      description: page.twitterDescription ?? page.description,
      images: [ogImagePath],
    },
  };
}
