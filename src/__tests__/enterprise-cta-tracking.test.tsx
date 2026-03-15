/**
 * Enterprise page CTA tracking contract tests
 *
 * Verifies that the enterprise page carries a primary GitHub CTA with the
 * correct tracking attributes, so fs_cta_github_click conversions can fire
 * when smb_en ad traffic lands here.
 *
 * Prior to the v3.3 fix, this page only had a "Contact Sales" mailto link.
 * The primary conversion (fs_cta_github_click) could never fire, meaning
 * every smb_en ad click was a guaranteed 0-conversion session.
 */
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import EnterprisePage from "@/app/enterprise/client";
import { FORGE_CTA_EVENTS } from "@/lib/analytics/ga4";

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
      delete rest.transition;
      return <div {...rest}>{children}</div>;
    },
  },
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

describe("EnterprisePage — CTA tracking contract", () => {
  it("renders a GitHub CTA button as the primary action", () => {
    render(<EnterprisePage />);
    const btn = screen.getByText("Explore on GitHub");
    expect(btn).toBeInTheDocument();
  });

  it("GitHub CTA has data-fs-cta-event for primary conversion", () => {
    render(<EnterprisePage />);
    const link = screen.getByText("Explore on GitHub").closest("a");
    expect(link).toHaveAttribute("data-fs-cta-event", FORGE_CTA_EVENTS.GITHUB);
  });

  it("GitHub CTA has data-fs-cta-target='github'", () => {
    render(<EnterprisePage />);
    const link = screen.getByText("Explore on GitHub").closest("a");
    expect(link).toHaveAttribute("data-fs-cta-target", "github");
  });

  it("GitHub CTA has data-fs-cta-location identifying this page", () => {
    render(<EnterprisePage />);
    const link = screen.getByText("Explore on GitHub").closest("a");
    expect(link).toHaveAttribute(
      "data-fs-cta-location",
      "enterprise_github_primary",
    );
  });

  it("GitHub CTA points to the Forge-Space GitHub org", () => {
    render(<EnterprisePage />);
    const link = screen.getByText("Explore on GitHub").closest("a");
    expect(link).toHaveAttribute("href", "https://github.com/Forge-Space");
  });

  it("GitHub CTA opens in a new tab with noopener noreferrer", () => {
    render(<EnterprisePage />);
    const link = screen.getByText("Explore on GitHub").closest("a");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("Contact Sales CTA is still present as secondary action", () => {
    render(<EnterprisePage />);
    const link = screen.getByText("Contact Sales").closest("a");
    expect(link).toHaveAttribute(
      "data-fs-cta-event",
      FORGE_CTA_EVENTS.CONTACT_SALES,
    );
    expect(link).toHaveAttribute("data-fs-pass-attribution", "true");
  });

  it("Contact Sales CTA links to the enterprise email", () => {
    render(<EnterprisePage />);
    const link = screen.getByText("Contact Sales").closest("a");
    expect(link).toHaveAttribute("href", "mailto:enterprise@forgespace.co");
  });

  it("GitHub CTA appears before Contact Sales in the DOM", () => {
    render(<EnterprisePage />);
    const github = screen.getByText("Explore on GitHub").closest("a")!;
    const sales = screen.getByText("Contact Sales").closest("a")!;
    expect(
      github.compareDocumentPosition(sales) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });
});
