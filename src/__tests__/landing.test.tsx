import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SocialProof } from "@/components/landing/SocialProof";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { ArchitectureDiagram } from "@/components/landing/ArchitectureDiagram";
import { CTASection } from "@/components/landing/CTASection";

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
    }) => (
      <div className={className} {...rest}>
        {children}
      </div>
    ),
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
    render(<SocialProof />);
    expect(screen.getByText("9")).toBeInTheDocument();
    expect(screen.getByText("30+")).toBeInTheDocument();
    expect(screen.getByText("$0")).toBeInTheDocument();
    expect(screen.getByText("MIT")).toBeInTheDocument();
  });

  it("renders stat labels", () => {
    render(<SocialProof />);
    expect(screen.getByText("Open Source Repos")).toBeInTheDocument();
    expect(screen.getByText("MCP Tools")).toBeInTheDocument();
  });
});

describe("FeaturesGrid", () => {
  it("renders section heading", () => {
    render(<FeaturesGrid />);
    expect(
      screen.getByText("Built for developers who ship"),
    ).toBeInTheDocument();
  });

  it("renders all 6 feature cards", () => {
    render(<FeaturesGrid />);
    expect(screen.getByText("AI-Powered Generation")).toBeInTheDocument();
    expect(screen.getByText("MCP-Native Architecture")).toBeInTheDocument();
    expect(screen.getByText("Privacy-First BYOK")).toBeInTheDocument();
    expect(screen.getByText("Zero-Cost Start")).toBeInTheDocument();
    expect(screen.getByText("Self-Hostable")).toBeInTheDocument();
    expect(screen.getByText("Multi-LLM Support")).toBeInTheDocument();
  });
});

describe("HowItWorks", () => {
  it("renders section heading", () => {
    render(<HowItWorks />);
    expect(
      screen.getByText("From prompt to production"),
    ).toBeInTheDocument();
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
    render(<ArchitectureDiagram />);
    expect(
      screen.getByText("Four layers. One ecosystem."),
    ).toBeInTheDocument();
  });

  it("renders all 4 layers", () => {
    render(<ArchitectureDiagram />);
    expect(screen.getByText("Siza")).toBeInTheDocument();
    expect(
      screen.getByText("siza-mcp + branding-mcp"),
    ).toBeInTheDocument();
    expect(screen.getByText("mcp-gateway")).toBeInTheDocument();
    expect(screen.getByText("forge-patterns")).toBeInTheDocument();
  });
});

describe("CTASection", () => {
  it("renders CTA heading", () => {
    render(<CTASection />);
    expect(
      screen.getByText("Ready to ship with confidence?"),
    ).toBeInTheDocument();
  });

  it("renders action buttons", () => {
    render(<CTASection />);
    expect(screen.getByText("Get Started Free")).toBeInTheDocument();
    expect(screen.getByText("Explore on GitHub")).toBeInTheDocument();
  });

  it("links to correct destinations", () => {
    render(<CTASection />);
    const getStarted = screen.getByText("Get Started Free").closest("a");
    expect(getStarted).toHaveAttribute(
      "href",
      "https://siza.forgespace.co",
    );
    const github = screen.getByText("Explore on GitHub").closest("a");
    expect(github).toHaveAttribute(
      "href",
      "https://github.com/Forge-Space",
    );
  });
});
