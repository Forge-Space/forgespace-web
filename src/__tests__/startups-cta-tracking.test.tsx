/**
 * Startups page CTA tracking contract tests
 *
 * Verifies that /startups carries GitHub CTAs with correct tracking attributes
 * so fs_cta_github_click (primary conversion) can fire when startups_en ad
 * traffic lands here. The page has GitHub CTAs in both the hero section and
 * the shared CTASection at the bottom for maximum conversion opportunity.
 */
import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import StartupsPage from "@/app/startups/client";
import { CTASection } from "@/components/landing/CTASection";
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

vi.mock("@/components/layout/PageSection", () => ({
  PageSection: ({
    children,
    title,
    subtitle,
  }: {
    children?: React.ReactNode;
    title?: string;
    subtitle?: string;
    [key: string]: unknown;
  }) => (
    <section>
      {title && <h1>{title}</h1>}
      {subtitle && <p>{subtitle}</p>}
      {children}
    </section>
  ),
}));

describe("StartupsPage — CTA tracking contract", () => {
  it("renders at least one GitHub CTA for primary conversion", () => {
    render(<StartupsPage />);
    const githubLinks = screen
      .getAllByRole("link")
      .filter(
        (el) => el.getAttribute("data-fs-cta-event") === FORGE_CTA_EVENTS.GITHUB,
      );
    expect(githubLinks.length).toBeGreaterThanOrEqual(1);
  });

  it("hero GitHub CTA has correct tracking event", () => {
    render(<StartupsPage />);
    const heroLink = screen
      .getAllByRole("link")
      .find(
        (el) =>
          el.getAttribute("data-fs-cta-event") === FORGE_CTA_EVENTS.GITHUB &&
          el.getAttribute("data-fs-cta-location") === "startups_hero_github",
      );
    expect(heroLink).toBeDefined();
  });

  it("hero GitHub CTA has data-fs-cta-target='github'", () => {
    render(<StartupsPage />);
    const heroLink = screen
      .getAllByRole("link")
      .find(
        (el) => el.getAttribute("data-fs-cta-location") === "startups_hero_github",
      );
    expect(heroLink).toHaveAttribute("data-fs-cta-target", "github");
  });

  it("hero GitHub CTA points to Forge-Space GitHub org", () => {
    render(<StartupsPage />);
    const heroLink = screen
      .getAllByRole("link")
      .find(
        (el) => el.getAttribute("data-fs-cta-location") === "startups_hero_github",
      );
    expect(heroLink).toHaveAttribute("href", "https://github.com/Forge-Space");
  });

  it("hero GitHub CTA opens in new tab with noopener noreferrer", () => {
    render(<StartupsPage />);
    const heroLink = screen
      .getAllByRole("link")
      .find(
        (el) => el.getAttribute("data-fs-cta-location") === "startups_hero_github",
      );
    expect(heroLink).toHaveAttribute("target", "_blank");
    expect(heroLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("Siza CTA is present as primary start-free action", () => {
    render(<StartupsPage />);
    const sizaLinks = screen
      .getAllByRole("link")
      .filter(
        (el) => el.getAttribute("data-fs-cta-event") === FORGE_CTA_EVENTS.SIZA,
      );
    expect(sizaLinks.length).toBeGreaterThanOrEqual(1);
  });

  it("Contact Sales CTA is present as secondary action", () => {
    render(<StartupsPage />);
    const salesLinks = screen
      .getAllByRole("link")
      .filter(
        (el) =>
          el.getAttribute("data-fs-cta-event") === FORGE_CTA_EVENTS.CONTACT_SALES,
      );
    expect(salesLinks.length).toBeGreaterThanOrEqual(1);
  });
});

describe("StartupsPage — bottom CTASection tracking contract", () => {
  it("renders GitHub CTA with correct event and location", () => {
    render(<CTASection />);
    const btn = screen.getByText("Explore on GitHub").closest("a");
    expect(btn).toHaveAttribute("data-fs-cta-event", FORGE_CTA_EVENTS.GITHUB);
    expect(btn).toHaveAttribute("data-fs-cta-target", "github");
    expect(btn).toHaveAttribute("data-fs-cta-location", "landing_cta_primary");
  });

  it("renders Contact Sales CTA with correct event and location", () => {
    render(<CTASection />);
    const btn = screen.getByText("Contact Forge Space").closest("a");
    expect(btn).toHaveAttribute(
      "data-fs-cta-event",
      FORGE_CTA_EVENTS.CONTACT_SALES,
    );
    expect(btn).toHaveAttribute("data-fs-cta-target", "contact_sales");
    expect(btn).toHaveAttribute(
      "data-fs-cta-location",
      "landing_cta_secondary",
    );
  });

  it("renders Siza CTA with correct event and location", () => {
    render(<CTASection />);
    const btn = screen.getByText("Try Siza Demo").closest("a");
    expect(btn).toHaveAttribute("data-fs-cta-event", FORGE_CTA_EVENTS.SIZA);
    expect(btn).toHaveAttribute("data-fs-cta-target", "siza");
    expect(btn).toHaveAttribute(
      "data-fs-cta-location",
      "landing_cta_tertiary",
    );
  });
});
