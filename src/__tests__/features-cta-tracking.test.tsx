/**
 * Features page CTA tracking contract tests
 *
 * Verifies that /features carries GitHub and Siza CTAs with correct tracking
 * attributes so fs_cta_github_click (primary conversion) can fire when
 * oss_en ad traffic lands here. GitHub is the primary CTA; Siza is secondary.
 */
import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import FeaturesPage from "@/app/features/client";
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

describe("FeaturesPage — CTA tracking contract", () => {
  it("renders a GitHub CTA as the primary action", () => {
    render(<FeaturesPage repoCount={11} />);
    expect(screen.getByText("Explore on GitHub")).toBeInTheDocument();
  });

  it("GitHub CTA has data-fs-cta-event for primary conversion", () => {
    render(<FeaturesPage repoCount={11} />);
    const link = screen.getByText("Explore on GitHub").closest("a");
    expect(link).toHaveAttribute("data-fs-cta-event", FORGE_CTA_EVENTS.GITHUB);
  });

  it("GitHub CTA has correct target and location", () => {
    render(<FeaturesPage repoCount={11} />);
    const link = screen.getByText("Explore on GitHub").closest("a");
    expect(link).toHaveAttribute("data-fs-cta-target", "github");
    expect(link).toHaveAttribute(
      "data-fs-cta-location",
      "features_github_primary",
    );
  });

  it("GitHub CTA points to Forge-Space org", () => {
    render(<FeaturesPage repoCount={11} />);
    const link = screen.getByText("Explore on GitHub").closest("a");
    expect(link).toHaveAttribute("href", "https://github.com/Forge-Space");
  });

  it("GitHub CTA opens in a new tab with noopener noreferrer", () => {
    render(<FeaturesPage repoCount={11} />);
    const link = screen.getByText("Explore on GitHub").closest("a");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders a Siza CTA as the secondary action", () => {
    render(<FeaturesPage repoCount={11} />);
    expect(screen.getByText("Try Siza Free")).toBeInTheDocument();
  });

  it("Siza CTA has data-fs-cta-event for product conversion", () => {
    render(<FeaturesPage repoCount={11} />);
    const link = screen.getByText("Try Siza Free").closest("a");
    expect(link).toHaveAttribute("data-fs-cta-event", FORGE_CTA_EVENTS.SIZA);
  });

  it("Siza CTA has correct target and location", () => {
    render(<FeaturesPage repoCount={11} />);
    const link = screen.getByText("Try Siza Free").closest("a");
    expect(link).toHaveAttribute("data-fs-cta-target", "siza");
    expect(link).toHaveAttribute(
      "data-fs-cta-location",
      "features_siza_secondary",
    );
  });

  it("Siza CTA passes attribution", () => {
    render(<FeaturesPage repoCount={11} />);
    const link = screen.getByText("Try Siza Free").closest("a");
    expect(link).toHaveAttribute("data-fs-pass-attribution", "true");
  });

  it("GitHub CTA appears before Siza CTA in the DOM", () => {
    render(<FeaturesPage repoCount={11} />);
    const github = screen.getByText("Explore on GitHub").closest("a")!;
    const siza = screen.getByText("Try Siza Free").closest("a")!;
    expect(
      github.compareDocumentPosition(siza) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });
});
