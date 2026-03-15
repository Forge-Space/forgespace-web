import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SocialProof } from "@/components/landing/SocialProof";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { ArchitectureDiagram } from "@/components/landing/ArchitectureDiagram";
import { CTASection } from "@/components/landing/CTASection";
import { type EcosystemSnapshot } from "@/lib/ecosystem-data";

const snapshot: EcosystemSnapshot = {
  repoCount: 11,
  releasedRepoCount: 9,
  lastSyncedAt: "2026-03-10T00:00:00.000Z",
  stats: {
    updatedLast30d: 10,
    updatedLast7d: 8,
  },
  repos: [],
};

vi.mock("motion/react", () => ({
  motion: {
    div: ({
      children,
      className,
      ...rest
    }: {
      children?: React.ReactNode;
      className?: string;
      [key: string]: unknown;
    }) => {
      const sanitizedProps = { ...rest };
      delete sanitizedProps.initial;
      delete sanitizedProps.animate;
      delete sanitizedProps.exit;
      delete sanitizedProps.transition;
      delete sanitizedProps.whileHover;
      delete sanitizedProps.whileTap;
      delete sanitizedProps.whileInView;
      delete sanitizedProps.viewport;

      return (
        <div className={className} {...sanitizedProps}>
          {children}
        </div>
      );
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

describe("SocialProof", () => {
  it("renders all 4 stats", () => {
    render(<SocialProof snapshot={snapshot} />);
    expect(screen.getByText("11")).toBeInTheDocument();
    expect(screen.getByText("9")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("MIT")).toBeInTheDocument();
  });

  it("renders updated stat labels", () => {
    render(<SocialProof snapshot={snapshot} />);
    expect(screen.getByText("Product Repos")).toBeInTheDocument();
    expect(screen.getByText("Repos With Releases")).toBeInTheDocument();
  });
});

describe("FeaturesGrid", () => {
  it("renders section heading", () => {
    render(<FeaturesGrid repoCount={snapshot.repoCount} />);
    expect(
      screen.getByText("Built for developers who ship"),
    ).toBeInTheDocument();
  });

  it("renders feature cards", () => {
    render(<FeaturesGrid repoCount={snapshot.repoCount} />);
    expect(screen.getByText("AI-Powered Generation")).toBeInTheDocument();
    expect(screen.getByText("MCP-Native Architecture")).toBeInTheDocument();
    expect(screen.getByText("Privacy-First BYOK")).toBeInTheDocument();
    expect(screen.getByText("Zero-Cost Start")).toBeInTheDocument();
    expect(screen.getByText("Self-Hostable")).toBeInTheDocument();
    expect(screen.getByText("Multi-Model Workflows")).toBeInTheDocument();
  });
});

describe("HowItWorks", () => {
  it("renders section heading", () => {
    render(<HowItWorks />);
    expect(screen.getByText("From prompt to production")).toBeInTheDocument();
  });

  it("renders 3 steps with numbers", () => {
    render(<HowItWorks />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("03")).toBeInTheDocument();
  });

  it("renders step titles", () => {
    render(<HowItWorks />);
    expect(screen.getByText("Generate")).toBeInTheDocument();
    expect(screen.getByText("Score")).toBeInTheDocument();
    expect(screen.getByText("Ship")).toBeInTheDocument();
  });
});

describe("ArchitectureDiagram", () => {
  it("renders section heading", () => {
    render(
      <ArchitectureDiagram
        repoCount={snapshot.repoCount}
        releasedRepoCount={snapshot.releasedRepoCount}
      />,
    );
    expect(
      screen.getByText("Four layers. 11 product repos."),
    ).toBeInTheDocument();
  });

  it("renders all 4 layers", () => {
    render(
      <ArchitectureDiagram
        repoCount={snapshot.repoCount}
        releasedRepoCount={snapshot.releasedRepoCount}
      />,
    );
    expect(screen.getByText("Siza")).toBeInTheDocument();
    expect(screen.getByText("ui-mcp + branding-mcp")).toBeInTheDocument();
    expect(screen.getByText("mcp-gateway")).toBeInTheDocument();
    expect(screen.getByText("core")).toBeInTheDocument();
  });
});

describe("CTASection", () => {
  it("renders CTA heading", () => {
    render(<CTASection />);
    expect(
      screen.getByText("Get visibility where it matters"),
    ).toBeInTheDocument();
  });

  it("renders action buttons", () => {
    render(<CTASection />);
    expect(screen.getByText("Read the Docs")).toBeInTheDocument();
    expect(screen.getByText("Join Discussions")).toBeInTheDocument();
    expect(screen.getByText("Start Siza Beta")).toBeInTheDocument();
  });

  it("links to correct destinations", () => {
    render(<CTASection />);
    const docs = screen.getByText("Read the Docs").closest("a");
    expect(docs).toHaveAttribute("href", "https://docs.forgespace.co/docs");
    expect(docs).toHaveAttribute("data-fs-cta-event", "fs_cta_docs_click");
    const discussions = screen.getByText("Join Discussions").closest("a");
    expect(discussions).toHaveAttribute(
      "href",
      "https://github.com/Forge-Space/siza/discussions",
    );
    expect(discussions).toHaveAttribute(
      "data-fs-cta-event",
      "fs_cta_community_click",
    );
    const siza = screen.getByText("Start Siza Beta").closest("a");
    expect(siza).toHaveAttribute("href", "https://siza.forgespace.co/signup");
    expect(siza).toHaveAttribute("data-fs-cta-event", "fs_cta_siza_click");
    expect(siza).toHaveAttribute("data-fs-pass-attribution", "true");
  });
});
