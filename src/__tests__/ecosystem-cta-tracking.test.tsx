/**
 * Ecosystem page CTA tracking contract tests
 *
 * Verifies that every GitHub repo link on the Ecosystem page carries the
 * correct data-fs-cta-event, data-fs-cta-target, and data-fs-cta-location
 * attributes so the AnalyticsProvider click-delegation picks them up.
 *
 * These are conversion-critical: oss_en ad group routes to /ecosystem and
 * the primary conversion is fs_cta_github_click. If these attributes are
 * missing, 0 conversions will be reported despite real user clicks.
 */
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import EcosystemPage from "@/app/ecosystem/client";
import { FORGE_CTA_EVENTS } from "@/lib/analytics/ga4";
import type { EcosystemSnapshot, EcosystemRepo } from "@/lib/ecosystem-data";

vi.mock("motion/react", () => ({
  motion: {
    div: ({
      children,
      ...props
    }: {
      children?: React.ReactNode;
      [key: string]: unknown;
    }) => {
      const rest = { ...(props as Record<string, unknown>) };
      delete rest.initial;
      delete rest.animate;
      delete rest.whileInView;
      delete rest.viewport;
      delete rest.transition;
      return <div {...rest}>{children}</div>;
    },
  },
}));

function makeRepo(overrides: Partial<EcosystemRepo> = {}): EcosystemRepo {
  return {
    name: "test-repo",
    description: "A test repository",
    url: "https://github.com/Forge-Space/test-repo",
    group: "Generation Engine",
    highlights: ["Feature one", "Feature two"],
    updatedAt: "2026-03-01T00:00:00Z",
    updatedAtLabel: "Mar 1, 2026",
    latestReleaseTag: "v1.0.0",
    npm: null,
    ...overrides,
  };
}

function makeSnapshot(repos: EcosystemRepo[]): EcosystemSnapshot {
  return {
    repos,
    repoCount: repos.length,
    releasedRepoCount: repos.filter((r) => r.latestReleaseTag).length,
    lastSyncedAt: "2026-03-15T00:00:00Z",
    lastSyncedAtLabel: "Mar 15, 2026",
    stats: { updatedLast7d: repos.length, updatedLast30d: repos.length },
  };
}

describe("EcosystemPage — CTA tracking contract", () => {
  it("attaches data-fs-cta-event to GitHub repo links", () => {
    const repo = makeRepo({ url: "https://github.com/Forge-Space/core" });
    render(<EcosystemPage snapshot={makeSnapshot([repo])} />);
    const link = screen.getByText("test-repo").closest("a");
    expect(link).toHaveAttribute("data-fs-cta-event", FORGE_CTA_EVENTS.GITHUB);
  });

  it("attaches data-fs-cta-target='github' to GitHub repo links", () => {
    const repo = makeRepo({ url: "https://github.com/Forge-Space/core" });
    render(<EcosystemPage snapshot={makeSnapshot([repo])} />);
    const link = screen.getByText("test-repo").closest("a");
    expect(link).toHaveAttribute("data-fs-cta-target", "github");
  });

  it("attaches data-fs-cta-location with slugified repo name", () => {
    const repo = makeRepo({
      name: "My Repo",
      url: "https://github.com/Forge-Space/my-repo",
    });
    render(<EcosystemPage snapshot={makeSnapshot([repo])} />);
    const link = screen.getByText("My Repo").closest("a");
    expect(link).toHaveAttribute(
      "data-fs-cta-location",
      "ecosystem_repo_my_repo",
    );
  });

  it("slugifies repo names with hyphens correctly", () => {
    const repo = makeRepo({
      name: "mcp-gateway",
      url: "https://github.com/Forge-Space/mcp-gateway",
    });
    render(<EcosystemPage snapshot={makeSnapshot([repo])} />);
    const link = screen.getByText("mcp-gateway").closest("a");
    expect(link).toHaveAttribute(
      "data-fs-cta-location",
      "ecosystem_repo_mcp_gateway",
    );
  });

  it("does not attach GitHub tracking to non-GitHub URLs", () => {
    const repo = makeRepo({ url: "https://npm.example.com/package/foo" });
    render(<EcosystemPage snapshot={makeSnapshot([repo])} />);
    const link = screen.getByText("test-repo").closest("a");
    expect(link).not.toHaveAttribute("data-fs-cta-event");
    expect(link).not.toHaveAttribute("data-fs-cta-target");
  });

  it("still attaches data-fs-cta-location to non-GitHub URLs", () => {
    const repo = makeRepo({ url: "https://npm.example.com/package/foo" });
    render(<EcosystemPage snapshot={makeSnapshot([repo])} />);
    const link = screen.getByText("test-repo").closest("a");
    expect(link).toHaveAttribute(
      "data-fs-cta-location",
      "ecosystem_repo_test_repo",
    );
  });

  it("all GitHub repo links in a multi-repo snapshot carry tracking", () => {
    const repos = [
      makeRepo({ name: "core", url: "https://github.com/Forge-Space/core" }),
      makeRepo({ name: "siza", url: "https://github.com/Forge-Space/siza" }),
      makeRepo({
        name: "mcp-gateway",
        url: "https://github.com/Forge-Space/mcp-gateway",
      }),
    ];
    render(<EcosystemPage snapshot={makeSnapshot(repos)} />);

    for (const repo of repos) {
      const link = screen.getByText(repo.name).closest("a");
      expect(link).toHaveAttribute(
        "data-fs-cta-event",
        FORGE_CTA_EVENTS.GITHUB,
      );
    }
  });

  it("repo links open in a new tab with noopener noreferrer", () => {
    const repo = makeRepo();
    render(<EcosystemPage snapshot={makeSnapshot([repo])} />);
    const link = screen.getByText("test-repo").closest("a");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
