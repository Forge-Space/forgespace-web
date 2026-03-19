import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import type { ReactNode } from "react";
import { MobileMenu } from "@/components/layout/MobileMenu";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("motion/react", () => ({
  motion: {
    aside: ({ children, ...props }: { children: ReactNode; [key: string]: unknown }) => (
      <aside {...props}>{children}</aside>
    ),
  },
}));

const LINKS = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "https://github.com/Forge-Space", external: true },
];

describe("MobileMenu", () => {
  it("renders links and CTA when open", () => {
    render(<MobileMenu isOpen onClose={vi.fn()} links={LINKS} />);

    expect(screen.getByRole("dialog", { name: "Navigation menu" })).toBeInTheDocument();
    expect(screen.getByText("Features")).toBeInTheDocument();
    expect(screen.getByText("Pricing")).toBeInTheDocument();
    expect(screen.getByText("Docs")).toBeInTheDocument();
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("calls onClose on Escape", () => {
    const onClose = vi.fn();
    render(<MobileMenu isOpen onClose={onClose} links={LINKS} />);

    fireEvent.keyDown(document, { key: "Escape" });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("traps focus with Tab and Shift+Tab", () => {
    render(<MobileMenu isOpen onClose={vi.fn()} links={LINKS} />);

    const closeButton = screen.getByRole("button", { name: "Close menu" });
    const getStarted = screen.getByRole("link", { name: "Get Started" });

    closeButton.focus();
    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    expect(getStarted).toHaveFocus();

    getStarted.focus();
    fireEvent.keyDown(document, { key: "Tab" });
    expect(closeButton).toHaveFocus();
  });
});
