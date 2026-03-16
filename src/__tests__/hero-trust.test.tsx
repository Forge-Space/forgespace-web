import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroSection } from "@/components/landing/HeroSection";
import { TrustStrip } from "@/components/landing/TrustStrip";

vi.mock("next/dynamic", () => ({
  default: () => () => null,
}));

vi.mock("motion/react", () => ({
  motion: new Proxy(
    {},
    {
      get: (_target, prop) => {
        const tag = String(prop);
        return ({
          children,
          ...rest
        }: React.PropsWithChildren<Record<string, unknown>>) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { initial, animate, transition, whileInView, viewport, ...domProps } = rest;
          return React.createElement(tag === "div" ? "div" : tag, domProps, children);
        };
      },
    }
  ),
  AnimatePresence: ({ children }: React.PropsWithChildren) => children,
}));

import React from "react";

describe("HeroSection", () => {
  it("renders the primary headline", () => {
    render(<HeroSection />);
    expect(screen.getByText("Open-source IDP")).toBeInTheDocument();
    expect(screen.getByText("for teams that ship.")).toBeInTheDocument();
  });

  it("renders the Explore on GitHub primary CTA with correct tracking", () => {
    render(<HeroSection />);
    const btn = screen.getByRole("link", { name: /explore on github/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute("data-fs-cta-event", "fs_cta_github_click");
    expect(btn).toHaveAttribute("data-fs-cta-location", "hero_primary");
  });

  it("renders the Try Siza Demo secondary CTA with correct tracking", () => {
    render(<HeroSection />);
    const btn = screen.getByRole("link", { name: /try siza demo/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute("data-fs-cta-event", "fs_cta_siza_click");
    expect(btn).toHaveAttribute("data-fs-cta-location", "hero_secondary");
  });

  it("renders the terminal mockup with siza scan label", () => {
    render(<HeroSection />);
    expect(screen.getByText("siza scan")).toBeInTheDocument();
  });

  it("renders the trust line", () => {
    render(<HeroSection />);
    expect(
      screen.getByText(/MIT License · No login required/i)
    ).toBeInTheDocument();
  });
});

describe("TrustStrip", () => {
  it("renders the Open source ecosystem heading", () => {
    render(<TrustStrip />);
    expect(screen.getByText("Open source ecosystem")).toBeInTheDocument();
  });

  it("renders ecosystem items", () => {
    render(<TrustStrip />);
    // Items are doubled for marquee — getAllByText to handle duplicates
    expect(screen.getAllByText("TypeScript").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("GitHub").length).toBeGreaterThanOrEqual(1);
  });

  it("renders the MIT Licensed footer line", () => {
    render(<TrustStrip />);
    expect(
      screen.getByText(/MIT Licensed · Works with any Git provider/i)
    ).toBeInTheDocument();
  });
});
