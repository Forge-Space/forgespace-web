import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Nav } from "@/components/layout/Nav";

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

describe("Nav", () => {
  it("renders the brand name", () => {
    render(<Nav />);
    expect(screen.getByText("Forge Space")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<Nav />);
    expect(screen.getAllByText("Features").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Ecosystem").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Pricing").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Roadmap").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Docs").length).toBeGreaterThan(0);
  });

  it("renders CTA buttons", () => {
    render(<Nav />);
    expect(screen.getAllByText("Sign in").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Get Started").length).toBeGreaterThan(0);
  });

  it("links to correct internal routes", () => {
    render(<Nav />);
    const featuresLinks = screen.getAllByText("Features");
    expect(featuresLinks[0].closest("a")).toHaveAttribute("href", "/features");
  });

  it("routes docs to the docs site", () => {
    render(<Nav />);
    const docsLinks = screen.getAllByText("Docs");
    const docs = docsLinks[0].closest("a");

    expect(docs).toHaveAttribute("href", "https://docs.forgespace.co/docs");
    expect(docs).toHaveAttribute("data-fs-cta-event", "fs_cta_docs_click");
    expect(docs).toHaveAttribute("data-fs-cta-target", "docs");
  });

  it("external links have security attributes", () => {
    render(<Nav />);
    const signInLinks = screen.getAllByText("Sign in");
    const signIn = signInLinks[0].closest("a");
    const getStartedLinks = screen.getAllByText("Get Started");
    const getStarted = getStartedLinks[0].closest("a");

    expect(signIn).toHaveAttribute("href", "https://siza.forgespace.co/signin");
    expect(signIn).toHaveAttribute("target", "_blank");
    expect(signIn).toHaveAttribute("rel", "noopener noreferrer");
    expect(signIn).toHaveAttribute("data-fs-cta-event", "fs_cta_siza_click");
    expect(signIn).toHaveAttribute("data-fs-pass-attribution", "true");
    expect(getStarted).toHaveAttribute(
      "href",
      "https://siza.forgespace.co/signup",
    );
  });

  it("brand links to home", () => {
    render(<Nav />);
    expect(screen.getByText("Forge Space").closest("a")).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("renders mobile menu button", () => {
    render(<Nav />);
    expect(screen.getByLabelText("Open menu")).toBeInTheDocument();
  });
});
