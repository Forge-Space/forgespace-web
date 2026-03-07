import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/Button";

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

describe("Button", () => {
  it("renders as button by default", () => {
    render(<Button>Click me</Button>);
    const btn = screen.getByRole("button", { name: "Click me" });
    expect(btn).toBeInTheDocument();
    expect(btn.tagName).toBe("BUTTON");
  });

  it("renders as internal link when href provided", () => {
    render(<Button href="/features">Features</Button>);
    const link = screen.getByText("Features");
    expect(link.closest("a")).toHaveAttribute("href", "/features");
    expect(link.closest("a")).not.toHaveAttribute("target");
  });

  it("renders as external link with security attrs", () => {
    render(
      <Button href="https://example.com" external>
        External
      </Button>,
    );
    const link = screen.getByText("External").closest("a");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("applies variant classes", () => {
    const { rerender } = render(
      <Button variant="primary">Primary</Button>,
    );
    expect(screen.getByRole("button")).toHaveClass("bg-forge-primary");

    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole("button")).toHaveClass("border");
  });

  it("applies size classes", () => {
    render(<Button size="lg">Large</Button>);
    expect(screen.getByRole("button")).toHaveClass("px-6");
  });
});
