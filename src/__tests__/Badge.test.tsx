import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/ui/Badge";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>Open Source</Badge>);
    expect(screen.getByText("Open Source")).toBeInTheDocument();
  });

  it("renders as span with pill shape", () => {
    render(<Badge>Tag</Badge>);
    const badge = screen.getByText("Tag");
    expect(badge.tagName).toBe("SPAN");
    expect(badge).toHaveClass("rounded-full");
  });

  it("applies default variant", () => {
    render(<Badge>Default</Badge>);
    expect(screen.getByText("Default")).toHaveClass("bg-forge-primary/10");
  });

  it("applies outline variant", () => {
    render(<Badge variant="outline">Outline</Badge>);
    expect(screen.getByText("Outline")).toHaveClass("border-forge-border");
  });

  it("applies solid variant", () => {
    render(<Badge variant="solid">Solid</Badge>);
    expect(screen.getByText("Solid")).toHaveClass("bg-forge-primary");
  });
});
