/**
 * Pricing page CTA tracking contract tests
 *
 * Verifies that /pricing carries tier CTAs with correct tracking attributes
 * so fs_cta_siza_click and fs_cta_contact_sales_click conversions can fire.
 * Each pricing tier must have a CTA with the correct event, target, and
 * location so ad traffic from smb_en/oss_en/startups_en can be attributed.
 */
import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PricingPage from "@/app/pricing/client";
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

describe("PricingPage — CTA tracking contract", () => {
  it("renders pricing trust badges", () => {
    render(<PricingPage />);

    expect(screen.getAllByText("MIT Licensed").length).toBeGreaterThan(0);
    expect(screen.getByText("SOC 2 Ready")).toBeInTheDocument();
    expect(screen.getByText("BYOK Encryption")).toBeInTheDocument();
  });

  it("renders Free tier Get Started CTA", () => {
    render(<PricingPage />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("Free tier CTA has siza event tracking", () => {
    render(<PricingPage />);
    const link = screen.getByText("Get Started").closest("a");
    expect(link).toHaveAttribute("data-fs-cta-event", FORGE_CTA_EVENTS.SIZA);
  });

  it("Free tier CTA has correct target and location", () => {
    render(<PricingPage />);
    const link = screen.getByText("Get Started").closest("a");
    expect(link).toHaveAttribute("data-fs-cta-target", "siza");
    expect(link).toHaveAttribute("data-fs-cta-location", "pricing_tier_free");
  });

  it("Free tier CTA links to siza signup", () => {
    render(<PricingPage />);
    const link = screen.getByText("Get Started").closest("a");
    expect(link?.getAttribute("href")).toContain("siza.forgespace.co/signup");
  });

  it("renders Pro tier Start Free Trial CTA", () => {
    render(<PricingPage />);
    expect(screen.getByText("Start Free Trial")).toBeInTheDocument();
  });

  it("Pro tier CTA has siza event tracking", () => {
    render(<PricingPage />);
    const link = screen.getByText("Start Free Trial").closest("a");
    expect(link).toHaveAttribute("data-fs-cta-event", FORGE_CTA_EVENTS.SIZA);
  });

  it("Pro tier CTA has correct target and location", () => {
    render(<PricingPage />);
    const link = screen.getByText("Start Free Trial").closest("a");
    expect(link).toHaveAttribute("data-fs-cta-target", "siza");
    expect(link).toHaveAttribute("data-fs-cta-location", "pricing_tier_pro");
  });

  it("Pro tier CTA links to siza signup with plan=pro", () => {
    render(<PricingPage />);
    const link = screen.getByText("Start Free Trial").closest("a");
    expect(link?.getAttribute("href")).toContain("plan=pro");
  });

  it("renders Team tier Contact Us CTA", () => {
    render(<PricingPage />);
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
  });

  it("Team tier CTA has contact_sales event tracking", () => {
    render(<PricingPage />);
    const link = screen.getByText("Contact Us").closest("a");
    expect(link).toHaveAttribute(
      "data-fs-cta-event",
      FORGE_CTA_EVENTS.CONTACT_SALES,
    );
  });

  it("Team tier CTA has correct target and location", () => {
    render(<PricingPage />);
    const link = screen.getByText("Contact Us").closest("a");
    expect(link).toHaveAttribute("data-fs-cta-target", "contact_sales");
    expect(link).toHaveAttribute("data-fs-cta-location", "pricing_tier_team");
  });

  it("footer contact link has contact_sales event tracking", () => {
    render(<PricingPage />);
    const link = screen.getByText("Contact us").closest("a");
    expect(link).toHaveAttribute(
      "data-fs-cta-event",
      FORGE_CTA_EVENTS.CONTACT_SALES,
    );
    expect(link).toHaveAttribute("data-fs-cta-target", "contact_sales");
    expect(link).toHaveAttribute(
      "data-fs-cta-location",
      "pricing_footer_contact",
    );
  });

  it("footer contact link passes attribution", () => {
    render(<PricingPage />);
    const link = screen.getByText("Contact us").closest("a");
    expect(link).toHaveAttribute("data-fs-pass-attribution", "true");
  });
});
