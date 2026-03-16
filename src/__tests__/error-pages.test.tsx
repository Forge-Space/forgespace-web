import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NotFound from "@/app/not-found";
import GlobalError from "@/app/global-error";

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

describe("NotFound", () => {
  it("renders a 404 heading", () => {
    render(<NotFound />);
    expect(screen.getByText("404")).toBeDefined();
  });

  it("renders a link back to home", () => {
    render(<NotFound />);
    const link = screen.getByRole("link", { name: /back to home/i });
    expect(link.getAttribute("href")).toBe("/");
  });

  it("renders a page not found message", () => {
    render(<NotFound />);
    expect(screen.getByText(/page not found/i)).toBeDefined();
  });
});

describe("GlobalError", () => {
  it("renders something went wrong message", () => {
    const reset = vi.fn();
    render(<GlobalError error={new Error("boom")} reset={reset} />);
    expect(screen.getByText(/something went wrong/i)).toBeDefined();
  });

  it("renders a try again button", () => {
    const reset = vi.fn();
    render(<GlobalError error={new Error("boom")} reset={reset} />);
    expect(screen.getByRole("button", { name: /try again/i })).toBeDefined();
  });

  it("calls reset when the try again button is clicked", async () => {
    const user = userEvent.setup();
    const reset = vi.fn();
    render(<GlobalError error={new Error("boom")} reset={reset} />);
    await user.click(screen.getByRole("button", { name: /try again/i }));
    expect(reset).toHaveBeenCalledOnce();
  });
});
