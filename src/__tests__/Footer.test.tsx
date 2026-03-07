import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/layout/Footer";

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

describe("Footer", () => {
  it("renders footer sections", () => {
    render(<Footer />);
    expect(screen.getByText("Siza")).toBeInTheDocument();
    expect(screen.getByText("Features")).toBeInTheDocument();
    expect(screen.getByText("Ecosystem")).toBeInTheDocument();
    expect(screen.getByText("Enterprise")).toBeInTheDocument();
  });

  it("displays copyright with current year", () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(
      screen.getByText(`\u00A9 ${year} Forge Space. MIT License.`),
    ).toBeInTheDocument();
  });

  it("external links open in new tab", () => {
    render(<Footer />);
    const github = screen.getByLabelText("Forge Space on GitHub");
    expect(github).toHaveAttribute("target", "_blank");
    expect(github).toHaveAttribute("rel", "noopener noreferrer");
    expect(github).toHaveAttribute(
      "href",
      "https://github.com/Forge-Space",
    );
  });

  it("internal links point to correct routes", () => {
    render(<Footer />);
    expect(screen.getByText("Ecosystem").closest("a")).toHaveAttribute(
      "href",
      "/ecosystem",
    );
    expect(screen.getByText("Pricing").closest("a")).toHaveAttribute(
      "href",
      "/pricing",
    );
  });

  it("renders brand description", () => {
    render(<Footer />);
    expect(
      screen.getByText(/Open-source Internal Developer Platform/),
    ).toBeInTheDocument();
  });
});
