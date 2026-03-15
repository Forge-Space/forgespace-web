/**
 * Portuguese landing page (/pt) CTA tracking contract tests
 *
 * Verifies that /pt carries GitHub CTAs with correct tracking attributes
 * so fs_cta_github_click (primary conversion) can fire when smb_pt ad
 * traffic lands here. The page must have GitHub CTAs in both hero and footer
 * sections to maximise conversion opportunity above and below the fold.
 */
import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PtPage from "@/app/pt/client";
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

vi.mock("next/dynamic", () => ({
  default: () => () => null,
}));

vi.mock("@/components/landing/FeaturesGrid", () => ({
  FeaturesGrid: () => <div data-testid="features-grid" />,
}));

vi.mock("@/components/landing/HowItWorks", () => ({
  HowItWorks: () => <div data-testid="how-it-works" />,
}));

vi.mock("@/components/landing/CTASection", () => ({
  CTASection: ({}: Record<string, unknown>) => (
    <section>
      <a
        href="https://github.com/Forge-Space"
        data-fs-cta-event={FORGE_CTA_EVENTS.GITHUB}
        data-fs-cta-target="github"
        data-fs-cta-location="landing_cta_primary"
        target="_blank"
        rel="noopener noreferrer"
      >
        Explore on GitHub
      </a>
      <a
        href="mailto:hello@forgespace.co?subject=Forge%20Space%20para%20meu%20time"
        data-fs-cta-event={FORGE_CTA_EVENTS.CONTACT_SALES}
        data-fs-cta-target="contact_sales"
        data-fs-cta-location="landing_cta_secondary"
      >
        Contact Forge Space
      </a>
      <a
        href="https://siza.forgespace.co"
        data-fs-cta-event={FORGE_CTA_EVENTS.SIZA}
        data-fs-cta-target="siza"
        data-fs-cta-location="landing_cta_tertiary"
      >
        Try Siza Demo
      </a>
    </section>
  ),
}));

describe("PtPage — CTA tracking contract", () => {
  it("renders at least one GitHub CTA for primary conversion", () => {
    render(<PtPage />);
    const githubLinks = screen
      .getAllByRole("link")
      .filter(
        (el) => el.getAttribute("data-fs-cta-event") === FORGE_CTA_EVENTS.GITHUB,
      );
    expect(githubLinks.length).toBeGreaterThanOrEqual(1);
  });

  it("hero GitHub CTA has correct tracking event", () => {
    render(<PtPage />);
    const heroLink = screen
      .getAllByRole("link")
      .find(
        (el) =>
          el.getAttribute("data-fs-cta-event") === FORGE_CTA_EVENTS.GITHUB &&
          el.getAttribute("data-fs-cta-location") === "pt_hero_primary",
      );
    expect(heroLink).toBeDefined();
  });

  it("hero GitHub CTA has data-fs-cta-target='github'", () => {
    render(<PtPage />);
    const heroLink = screen
      .getAllByRole("link")
      .find(
        (el) => el.getAttribute("data-fs-cta-location") === "pt_hero_primary",
      );
    expect(heroLink).toHaveAttribute("data-fs-cta-target", "github");
  });

  it("hero GitHub CTA points to Forge-Space GitHub org", () => {
    render(<PtPage />);
    const heroLink = screen
      .getAllByRole("link")
      .find(
        (el) => el.getAttribute("data-fs-cta-location") === "pt_hero_primary",
      );
    expect(heroLink).toHaveAttribute("href", "https://github.com/Forge-Space");
  });

  it("hero GitHub CTA opens in new tab with noopener noreferrer", () => {
    render(<PtPage />);
    const heroLink = screen
      .getAllByRole("link")
      .find(
        (el) => el.getAttribute("data-fs-cta-location") === "pt_hero_primary",
      );
    expect(heroLink).toHaveAttribute("target", "_blank");
    expect(heroLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("hero Contact Sales CTA has correct tracking event", () => {
    render(<PtPage />);
    const salesLink = screen
      .getAllByRole("link")
      .find(
        (el) =>
          el.getAttribute("data-fs-cta-event") === FORGE_CTA_EVENTS.CONTACT_SALES &&
          el.getAttribute("data-fs-cta-location") === "pt_hero_secondary",
      );
    expect(salesLink).toBeDefined();
  });

  it("hero Contact Sales CTA points to correct mailto", () => {
    render(<PtPage />);
    const salesLink = screen
      .getAllByRole("link")
      .find(
        (el) => el.getAttribute("data-fs-cta-location") === "pt_hero_secondary",
      );
    expect(salesLink).toHaveAttribute(
      "href",
      "mailto:hello@forgespace.co?subject=Forge%20Space%20para%20meu%20time",
    );
  });

  it("hero Siza CTA has correct tracking event", () => {
    render(<PtPage />);
    const sizaLink = screen
      .getAllByRole("link")
      .find(
        (el) =>
          el.getAttribute("data-fs-cta-event") === FORGE_CTA_EVENTS.SIZA &&
          el.getAttribute("data-fs-cta-location") === "pt_hero_tertiary",
      );
    expect(sizaLink).toBeDefined();
  });

  it("hero Siza CTA points to siza.forgespace.co", () => {
    render(<PtPage />);
    const sizaLink = screen
      .getAllByRole("link")
      .find(
        (el) => el.getAttribute("data-fs-cta-location") === "pt_hero_tertiary",
      );
    expect(sizaLink).toHaveAttribute("href", "https://siza.forgespace.co");
  });

  it("footer GitHub CTA is present via CTASection", () => {
    render(<PtPage />);
    const footerLink = screen
      .getAllByRole("link")
      .find(
        (el) =>
          el.getAttribute("data-fs-cta-event") === FORGE_CTA_EVENTS.GITHUB &&
          el.getAttribute("data-fs-cta-location") === "landing_cta_primary",
      );
    expect(footerLink).toBeDefined();
  });

  it("footer Siza CTA is present via CTASection", () => {
    render(<PtPage />);
    const sizaLinks = screen
      .getAllByRole("link")
      .filter(
        (el) => el.getAttribute("data-fs-cta-event") === FORGE_CTA_EVENTS.SIZA,
      );
    expect(sizaLinks.length).toBeGreaterThanOrEqual(1);
  });
});
