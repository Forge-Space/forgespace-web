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
  }) => {
    const anchorProps = { ...props } as Record<string, unknown>;
    delete anchorProps.prefetch;

    return (
      <a href={href} {...anchorProps}>
        {children}
      </a>
    );
  },
}));

describe("Footer", () => {
  it("renders footer sections", () => {
    render(<Footer />);
    expect(screen.getByText("Siza")).toBeInTheDocument();
    expect(screen.getByText("Features")).toBeInTheDocument();
    expect(screen.getByText("Ecosystem")).toBeInTheDocument();
    expect(screen.getByText("Enterprise")).toBeInTheDocument();
    expect(screen.getByText("MIT License")).toBeInTheDocument();
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
    expect(github).toHaveAttribute("data-fs-cta-event", "fs_cta_github_click");

    const x = screen.getByLabelText("Forge Space on X");
    expect(x).toHaveAttribute("target", "_blank");
    expect(x).toHaveAttribute("rel", "noopener noreferrer");
    expect(x).toHaveAttribute("href", "https://x.com/ForgeSpaceDev");
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

  it("marks outbound contact links for analytics", () => {
    render(<Footer />);
    const contact = screen.getByText("Contact").closest("a");
    expect(contact).toHaveAttribute(
      "data-fs-cta-event",
      "fs_cta_contact_sales_click",
    );
    expect(contact).toHaveAttribute("data-fs-pass-attribution", "true");
  });

  it("renders newsletter call-to-action with attribution", () => {
    render(<Footer />);
    const newsletter = screen
      .getByRole("link", { name: /join roadmap updates/i })
      .closest("a");

    expect(newsletter).toHaveAttribute(
      "href",
      "mailto:support@forgespace.co?subject=Forge%20Space%20newsletter%20updates",
    );
    expect(newsletter).toHaveAttribute(
      "data-fs-cta-event",
      "fs_cta_contact_sales_click",
    );
    expect(newsletter).toHaveAttribute(
      "data-fs-cta-location",
      "footer_newsletter_join_updates",
    );
    expect(newsletter).toHaveAttribute("data-fs-pass-attribution", "true");
  });
});
