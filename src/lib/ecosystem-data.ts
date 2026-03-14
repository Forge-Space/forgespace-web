import "server-only";
import repoMetadataEntries from "./ecosystem-data.fallback.json";

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
  updatedAtLabel: string;
  latestReleaseTag: string | null;
  latestReleaseDate: string | null;
  latestReleaseDateLabel: string;
  group: RepoGroup;
  highlights: string[];
  npm?: string;
}

export interface EcosystemSnapshot {
  repoCount: number;
  releasedRepoCount: number;
  lastSyncedAt: string;
  lastSyncedAtLabel: string;
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

interface RepoDefinition {
  name: ProductRepoName;
  group: RepoGroup;
  description: string;
  highlights: [string, string, string];
  fallbackUpdatedAt: string;
  npm?: string;
  fallbackReleaseTag?: string;
  fallbackReleaseDate?: string;
}

const REPO_DEFINITIONS = repoMetadataEntries as RepoDefinition[];

const REPO_METADATA = Object.fromEntries(
  REPO_DEFINITIONS.map((definition) => [
    definition.name,
    {
      group: definition.group,
      description: definition.description,
      highlights: [...definition.highlights],
      npm: definition.npm,
      fallbackUpdatedAt: definition.fallbackUpdatedAt,
      fallbackReleaseTag: definition.fallbackReleaseTag,
      fallbackReleaseDate: definition.fallbackReleaseDate,
    } satisfies RepoMetadata,
  ]),
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

function formatDisplayDate(iso: string | null): string {
  if (!iso) return "No release";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

function buildSnapshot(repos: EcosystemRepo[], lastSyncedAt: string): EcosystemSnapshot {
  return {
    repoCount: repos.length,
    releasedRepoCount: repos.filter((repo) => repo.latestReleaseTag).length,
    lastSyncedAt,
    lastSyncedAtLabel: formatDisplayDate(lastSyncedAt),
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
    updatedAtLabel: formatDisplayDate(metadata.fallbackUpdatedAt),
    latestReleaseTag: metadata.fallbackReleaseTag ?? null,
    latestReleaseDate: metadata.fallbackReleaseDate ?? null,
    latestReleaseDateLabel: formatDisplayDate(metadata.fallbackReleaseDate ?? null),
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
          updatedAtLabel: formatDisplayDate(apiRepo.updated_at),
          latestReleaseTag: release.tag,
          latestReleaseDate: release.publishedAt,
          latestReleaseDateLabel: formatDisplayDate(release.publishedAt),
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
