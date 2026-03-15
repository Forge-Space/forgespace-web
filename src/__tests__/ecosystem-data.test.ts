import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getEcosystemSnapshot, getFallbackEcosystemSnapshot } from "@/lib/ecosystem-data";

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

describe("ecosystem-data", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("maps GitHub repos and releases into normalized snapshot data", async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);

      if (url.includes(`/orgs/Forge-Space/repos`)) {
        return jsonResponse([
          {
            name: "core",
            html_url: "https://github.com/Forge-Space/core",
            description: "Core repo",
            updated_at: "2026-03-10T19:01:18Z",
          },
          {
            name: "siza-desktop",
            html_url: "https://github.com/Forge-Space/siza-desktop",
            description: "Desktop",
            updated_at: "2026-02-28T04:27:04Z",
          },
        ]);
      }

      if (url.includes(`/repos/Forge-Space/core/releases/latest`)) {
        return jsonResponse({
          tag_name: "v1.10.2",
          published_at: "2026-03-10T19:30:00Z",
        });
      }

      if (url.includes(`/repos/Forge-Space/siza-desktop/releases/latest`)) {
        return jsonResponse({}, 404);
      }

      return jsonResponse({}, 404);
    });

    vi.stubGlobal("fetch", fetchMock);

    const snapshot = await getEcosystemSnapshot();

    expect(snapshot.repoCount).toBe(11);
    expect(snapshot.releasedRepoCount).toBeGreaterThan(0);

    const core = snapshot.repos.find((repo) => repo.name === "core");
    expect(core?.latestReleaseTag).toBe("v1.10.2");
    expect(core?.latestReleaseDate).toBe("2026-03-10T19:30:00Z");
    expect(core?.updatedAtLabel).toBe("Mar 10, 2026");
    expect(core?.latestReleaseDateLabel).toBe("Mar 10, 2026");
    expect(snapshot.lastSyncedAtLabel).toMatch(/^[A-Z][a-z]{2} \d{2}, \d{4}$/);

    const desktop = snapshot.repos.find((repo) => repo.name === "siza-desktop");
    expect(desktop?.latestReleaseTag).toBeNull();
    expect(desktop?.latestReleaseDateLabel).toBe("No release");
  });

  it("falls back to cached release metadata when release API fails", async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);

      if (url.includes(`/orgs/Forge-Space/repos`)) {
        return jsonResponse([
          {
            name: "core",
            html_url: "https://github.com/Forge-Space/core",
            description: "Core repo",
            updated_at: "2026-03-10T19:01:18Z",
          },
        ]);
      }

      if (url.includes(`/repos/Forge-Space/core/releases/latest`)) {
        return jsonResponse({}, 403);
      }

      return jsonResponse({}, 404);
    });

    vi.stubGlobal("fetch", fetchMock);

    const snapshot = await getEcosystemSnapshot();
    const core = snapshot.repos.find((repo) => repo.name === "core");

    expect(core?.latestReleaseTag).toBe("v1.12.2");
    expect(core?.latestReleaseDate).toBe("2026-03-15T00:00:00Z");
  });

  it("returns fallback snapshot when org repo fetch fails", async () => {
    const fetchMock = vi.fn(async () => jsonResponse({}, 500));
    vi.stubGlobal("fetch", fetchMock);

    const snapshot = await getEcosystemSnapshot();
    const fallback = getFallbackEcosystemSnapshot();

    expect(snapshot.repoCount).toBe(11);
    expect(snapshot.lastSyncedAt).toBe(fallback.lastSyncedAt);
    expect(snapshot.repos[0].name).toBe(fallback.repos[0].name);
  });

  it("uses fallback dataset shape with required fields", () => {
    const fallback = getFallbackEcosystemSnapshot();

    expect(fallback.repoCount).toBe(11);
    expect(fallback.releasedRepoCount).toBeGreaterThan(0);
    expect(fallback.repos.every((repo) => Boolean(repo.url))).toBe(true);
    expect(fallback.repos.every((repo) => Boolean(repo.updatedAt))).toBe(true);
    expect(fallback.repos.every((repo) => Boolean(repo.updatedAtLabel))).toBe(true);
  });
});
