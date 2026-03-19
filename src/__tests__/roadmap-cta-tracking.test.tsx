/**
 * Roadmap page CTA tracking contract tests
 *
 * Verifies that /roadmap carries GitHub and Siza CTAs with correct tracking
 * attributes so both fs_cta_github_click and fs_cta_siza_click conversions
 * can fire when ad traffic lands here. GitHub is the primary conversion;
 * Siza is the secondary product CTA.
 */
import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import RoadmapPage from "@/app/roadmap/client";
import { FORGE_CTA_EVENTS } from "@/lib/analytics/ga4";

vi.mock("motion/react", () => ({
  motion: new Proxy(
    {},
    {
      get:
        (_t, tag: string) =>
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ({ children, initial, animate, whileInView, viewport, transition, exit, ...rest }: {
          children?: React.ReactNode;
          initial?: unknown;
          animate?: unknown;
          whileInView?: unknown;
          viewport?: unknown;
          transition?: unknown;
          exit?: unknown;
          [key: string]: unknown;
        }) =>
          React.createElement(tag, rest, children),
    },
  ),
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("RoadmapPage — CTA tracking contract", () => {
  it("renders a GitHub CTA button", () => {
    render(<RoadmapPage />);
    expect(screen.getByText("View on GitHub")).toBeInTheDocument();
  });

  it("GitHub CTA has data-fs-cta-event for primary conversion", () => {
    render(<RoadmapPage />);
    const link = screen.getByText("View on GitHub").closest("a");
    expect(link).toHaveAttribute("data-fs-cta-event", FORGE_CTA_EVENTS.GITHUB);
  });

  it("GitHub CTA has correct target and location", () => {
    render(<RoadmapPage />);
    const link = screen.getByText("View on GitHub").closest("a");
    expect(link).toHaveAttribute("data-fs-cta-target", "github");
    expect(link).toHaveAttribute("data-fs-cta-location", "roadmap_secondary");
  });

  it("GitHub CTA points to Forge-Space org", () => {
    render(<RoadmapPage />);
    const link = screen.getByText("View on GitHub").closest("a");
    expect(link).toHaveAttribute("href", "https://github.com/Forge-Space");
  });

  it("GitHub CTA opens in a new tab with noopener noreferrer", () => {
    render(<RoadmapPage />);
    const link = screen.getByText("View on GitHub").closest("a");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders a Siza CTA button", () => {
    render(<RoadmapPage />);
    expect(screen.getByText("Try Siza")).toBeInTheDocument();
  });

  it("Siza CTA has data-fs-cta-event for product conversion", () => {
    render(<RoadmapPage />);
    const link = screen.getByText("Try Siza").closest("a");
    expect(link).toHaveAttribute("data-fs-cta-event", FORGE_CTA_EVENTS.SIZA);
  });

  it("Siza CTA has correct target and location", () => {
    render(<RoadmapPage />);
    const link = screen.getByText("Try Siza").closest("a");
    expect(link).toHaveAttribute("data-fs-cta-target", "siza");
    expect(link).toHaveAttribute("data-fs-cta-location", "roadmap_primary");
  });

  it("Siza CTA passes attribution", () => {
    render(<RoadmapPage />);
    const link = screen.getByText("Try Siza").closest("a");
    expect(link).toHaveAttribute("data-fs-pass-attribution", "true");
  });

  it("Siza CTA appears before GitHub CTA in the DOM", () => {
    render(<RoadmapPage />);
    const siza = screen.getByText("Try Siza").closest("a")!;
    const github = screen.getByText("View on GitHub").closest("a")!;
    expect(
      siza.compareDocumentPosition(github) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("renders roadmap milestone links as external anchors", () => {
    render(<RoadmapPage />);
    const milestone = screen.getByText("AI code generation with live preview");
    const link = milestone.closest("a");

    expect(link).toHaveAttribute("href", "https://github.com/Forge-Space/siza");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("uses fallback repo count when repoCount is not provided", () => {
    render(<RoadmapPage />);

    expect(
      screen.getByText(
        "10 product repositories aligned on governance standards",
      ),
    ).toBeInTheDocument();
  });
});
