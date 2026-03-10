import "server-only";

const GITHUB_ORG = "Forge-Space";
const GITHUB_API_BASE = "https://api.github.com";
const REVALIDATE_SECONDS = 21_600;
const FALLBACK_LAST_SYNCED_AT = "2026-03-10T00:00:00.000Z";

const PRODUCT_REPO_ALLOWLIST = [
  "core",
  "mcp-gateway",
  "siza",
  "ui-mcp",
  "siza-gen",
  "forge-ai-init",
  "forge-ai-action",
  "branding-mcp",
  "brand-guide",
  "forgespace-web",
  "siza-desktop",
] as const;

type ProductRepoName = (typeof PRODUCT_REPO_ALLOWLIST)[number];
export type RepoGroup =
  | "Generation Engine"
  | "Governance & Quality"
  | "Design & Brand";

interface RepoMetadata {
  group: RepoGroup;
  description: string;
  highlights: string[];
  npm?: string;
  fallbackUpdatedAt: string;
  fallbackReleaseTag?: string;
  fallbackReleaseDate?: string;
}

export interface EcosystemRepo {
  name: string;
  url: string;
  description: string;
  updatedAt: string;
  latestReleaseTag: string | null;
  latestReleaseDate: string | null;
  group: RepoGroup;
  highlights: string[];
  npm?: string;
}

export interface EcosystemSnapshot {
  repoCount: number;
  releasedRepoCount: number;
  lastSyncedAt: string;
  repos: EcosystemRepo[];
  stats: {
    updatedLast30d: number;
    updatedLast7d: number;
  };
}

interface GitHubRepoResponse {
  name: string;
  html_url: string;
  description: string | null;
  updated_at: string;
}

interface GitHubReleaseResponse {
  tag_name: string;
  published_at: string;
}

type RepoDefinition = readonly [
  name: ProductRepoName,
  group: RepoGroup,
  description: string,
  highlights: readonly [string, string, string],
  fallbackUpdatedAt: string,
  npm?: string,
  fallbackReleaseTag?: string,
  fallbackReleaseDate?: string,
];

const REPO_DEFINITIONS: readonly RepoDefinition[] = [
  [
    "core",
    "Governance & Quality",
    "Shared standards library for governance, scorecards, policy checks, and bootstrap tooling.",
    [
      "Cross-repo governance contracts",
      "Quality scorecards and policy engine",
      "Scaffolding and migration assessment CLI",
    ],
    "2026-03-10T19:01:18Z",
    "@forgespace/core",
    "v1.10.1",
    "2026-03-08T16:24:14Z",
  ],
  [
    "mcp-gateway",
    "Governance & Quality",
    "MCP orchestration hub for routing, auth, rate limits, observability, and reliability controls.",
    [
      "JSON-RPC + streamable HTTP",
      "Circuit breaker and provider failover",
      "Security and audit middleware",
    ],
    "2026-03-10T18:59:27Z",
    undefined,
    "v1.9.0",
    "2026-03-07T19:33:45Z",
  ],
  [
    "siza",
    "Generation Engine",
    "Open full-stack AI workspace for generation, governance, catalog, and delivery workflows.",
    [
      "Next.js 16 + React 19 workspace",
      "Post-generation scorecards",
      "Golden Paths, catalog, and plugins",
    ],
    "2026-03-10T16:37:23Z",
    undefined,
    "v0.41.0",
    "2026-03-08T05:23:23Z",
  ],
  [
    "ui-mcp",
    "Generation Engine",
    "MCP protocol adapter with generation and migration tools for UI, backend, and project scaffolding.",
    [
      "32 MCP tools",
      "Migration assessment and planning",
      "Brand-aware generation pipeline",
    ],
    "2026-03-10T18:04:24Z",
    "@forgespace/ui-mcp",
    "v0.18.0",
    "2026-03-08T21:50:24Z",
  ],
  [
    "siza-gen",
    "Generation Engine",
    "AI generation engine with framework adapters, context assembly, and benchmarked quality scoring.",
    [
      "528 curated snippets",
      "Lite runtime for edge workers",
      "Benchmark suite across providers",
    ],
    "2026-03-10T17:47:34Z",
    "@forgespace/siza-gen",
    "v0.10.0",
    "2026-03-08T22:22:19Z",
  ],
  [
    "forge-ai-init",
    "Governance & Quality",
    "Governance CLI with scanner rules, migration analysis, CI gates, and automated test-autogen checks.",
    [
      "119 scanner rules",
      "Migration + score gate commands",
      "Test-autogen workflow support",
    ],
    "2026-03-10T18:47:46Z",
    undefined,
    "v0.24.0",
    "2026-03-09T01:47:42Z",
  ],
  [
    "forge-ai-action",
    "Governance & Quality",
    "GitHub Action for governance checks, migration reports, quality deltas, and PR annotations.",
    [
      "Assess and migrate commands",
      "Phased test-autogen enforcement",
      "PR-grade comments + annotations",
    ],
    "2026-03-10T18:47:56Z",
    undefined,
    "v1.1.0",
    "2026-03-08T21:37:21Z",
  ],
  [
    "branding-mcp",
    "Design & Brand",
    "Brand identity MCP toolkit for palette generation, typography, tokens, and design system exports.",
    [
      "Design token exporters",
      "WCAG validation helpers",
      "Asset and logo generation tools",
    ],
    "2026-03-10T15:42:51Z",
    "@forgespace/branding-mcp",
    "v0.7.0",
    "2026-03-08T02:08:48Z",
  ],
  [
    "brand-guide",
    "Design & Brand",
    "Source of truth for visual identity, logos, tokens, and sub-brand packaging.",
    [
      "Published identity package",
      "Siza sub-brand token exports",
      "Modern Horn logo system",
    ],
    "2026-03-10T16:03:43Z",
    "@forgespace/brand-guide",
    "v0.6.0",
    "2026-03-06T00:00:00Z",
  ],
  [
    "forgespace-web",
    "Design & Brand",
    "Forge Space marketing site with ecosystem narrative, docs entry points, and live metadata panels.",
    [
      "Next.js marketing surface",
      "SEO and structured metadata",
      "Live ecosystem sync",
    ],
    "2026-03-10T15:11:55Z",
    undefined,
    "v0.3.0",
    "2026-03-07T00:00:00Z",
  ],
  [
    "siza-desktop",
    "Generation Engine",
    "Desktop companion for local-first generation workflows and offline development environments.",
    [
      "Desktop runtime packaging",
      "Local model and MCP integrations",
      "Cross-platform distribution",
    ],
    "2026-02-28T04:27:04Z",
  ],
];

const REPO_METADATA = Object.fromEntries(
  REPO_DEFINITIONS.map(
    ([
      name,
      group,
      description,
      highlights,
      fallbackUpdatedAt,
      npm,
      fallbackReleaseTag,
      fallbackReleaseDate,
    ]) => [
      name,
      {
        group,
        description,
        highlights: [...highlights],
        npm,
        fallbackUpdatedAt,
        fallbackReleaseTag,
        fallbackReleaseDate,
      } satisfies RepoMetadata,
    ],
  ),
) as Record<ProductRepoName, RepoMetadata>;

function getGitHubHeaders() {
  const token = process.env.FORGE_SPACE_GITHUB_TOKEN ?? process.env.GITHUB_TOKEN;
  return {
    Accept: "application/vnd.github+json",
    "User-Agent": "forgespace-web-ecosystem-sync",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

function toProductRepoName(name: string): ProductRepoName | null {
  return PRODUCT_REPO_ALLOWLIST.includes(name as ProductRepoName)
    ? (name as ProductRepoName)
    : null;
}

function countUpdatedSince(repos: EcosystemRepo[], days: number): number {
  const now = Date.now();
  const rangeMs = days * 24 * 60 * 60 * 1000;
  return repos.filter((repo) => now - new Date(repo.updatedAt).getTime() <= rangeMs).length;
}

function buildSnapshot(repos: EcosystemRepo[], lastSyncedAt: string): EcosystemSnapshot {
  return {
    repoCount: repos.length,
    releasedRepoCount: repos.filter((repo) => repo.latestReleaseTag).length,
    lastSyncedAt,
    repos,
    stats: {
      updatedLast30d: countUpdatedSince(repos, 30),
      updatedLast7d: countUpdatedSince(repos, 7),
    },
  };
}

function buildFallbackRepo(name: ProductRepoName): EcosystemRepo {
  const metadata = REPO_METADATA[name];
  return {
    name,
    url: `https://github.com/${GITHUB_ORG}/${name}`,
    description: metadata.description,
    updatedAt: metadata.fallbackUpdatedAt,
    latestReleaseTag: metadata.fallbackReleaseTag ?? null,
    latestReleaseDate: metadata.fallbackReleaseDate ?? null,
    group: metadata.group,
    highlights: metadata.highlights,
    npm: metadata.npm,
  };
}

export function getFallbackEcosystemSnapshot(): EcosystemSnapshot {
  const repos = PRODUCT_REPO_ALLOWLIST.map((name) => buildFallbackRepo(name));
  return buildSnapshot(repos, FALLBACK_LAST_SYNCED_AT);
}

async function fetchOrganizationRepos(): Promise<GitHubRepoResponse[]> {
  const response = await fetch(
    `${GITHUB_API_BASE}/orgs/${GITHUB_ORG}/repos?per_page=100&type=public`,
    {
      headers: getGitHubHeaders(),
      next: { revalidate: REVALIDATE_SECONDS },
    },
  );

  if (!response.ok) {
    throw new Error(`GitHub repos request failed with status ${response.status}`);
  }

  return (await response.json()) as GitHubRepoResponse[];
}

async function fetchLatestRelease(name: ProductRepoName): Promise<{
  tag: string | null;
  publishedAt: string | null;
}> {
  const response = await fetch(
    `${GITHUB_API_BASE}/repos/${GITHUB_ORG}/${name}/releases/latest`,
    {
      headers: getGitHubHeaders(),
      next: { revalidate: REVALIDATE_SECONDS },
    },
  );

  if (response.status === 404) {
    return { tag: null, publishedAt: null };
  }

  if (!response.ok) {
    throw new Error(`GitHub release request failed for ${name} (${response.status})`);
  }

  const data = (await response.json()) as GitHubReleaseResponse;
  return {
    tag: data.tag_name,
    publishedAt: data.published_at,
  };
}

export async function getEcosystemSnapshot(): Promise<EcosystemSnapshot> {
  try {
    const reposFromApi = await fetchOrganizationRepos();
    const repoMap = new Map<ProductRepoName, GitHubRepoResponse>();

    for (const repo of reposFromApi) {
      const repoName = toProductRepoName(repo.name);
      if (repoName) {
        repoMap.set(repoName, repo);
      }
    }

    const repos = await Promise.all(
      PRODUCT_REPO_ALLOWLIST.map(async (name) => {
        const metadata = REPO_METADATA[name];
        const apiRepo = repoMap.get(name);

        if (!apiRepo) {
          return buildFallbackRepo(name);
        }

        let release = {
          tag: metadata.fallbackReleaseTag ?? null,
          publishedAt: metadata.fallbackReleaseDate ?? null,
        };

        try {
          release = await fetchLatestRelease(name);
        } catch {
          release = {
            tag: metadata.fallbackReleaseTag ?? null,
            publishedAt: metadata.fallbackReleaseDate ?? null,
          };
        }

        return {
          name,
          url: apiRepo.html_url,
          description: apiRepo.description ?? metadata.description,
          updatedAt: apiRepo.updated_at,
          latestReleaseTag: release.tag,
          latestReleaseDate: release.publishedAt,
          group: metadata.group,
          highlights: metadata.highlights,
          npm: metadata.npm,
        } satisfies EcosystemRepo;
      }),
    );

    return buildSnapshot(repos, new Date().toISOString());
  } catch {
    return getFallbackEcosystemSnapshot();
  }
}
