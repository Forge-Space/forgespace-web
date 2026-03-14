import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroParticlesBackground } from "@/components/shared/HeroParticlesBackground";

vi.mock("@react-three/fiber", () => ({
  Canvas: () => <div data-testid="hero-particles-canvas" />,
  useFrame: () => undefined,
}));

describe("HeroParticlesBackground", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the static fallback when WebGL is unavailable", () => {
    const getContext = vi.fn(() => null);

    vi.spyOn(document, "createElement").mockImplementation(((tagName: string) => {
      const element = document.createElementNS("http://www.w3.org/1999/xhtml", tagName);
      if (tagName === "canvas") {
        Object.defineProperty(element, "getContext", {
          configurable: true,
          value: getContext,
        });
      }
      return element;
    }) as typeof document.createElement);

    render(<HeroParticlesBackground />);

    expect(screen.getByTestId("hero-particles-fallback")).toBeInTheDocument();
    expect(screen.queryByTestId("hero-particles-canvas")).not.toBeInTheDocument();
  });

  it("renders the canvas when WebGL is available", () => {
    const getContext = vi.fn((kind: string) => {
      if (kind === "webgl" || kind === "webgl2") {
        return {};
      }
      return null;
    });

    vi.spyOn(document, "createElement").mockImplementation(((tagName: string) => {
      const element = document.createElementNS("http://www.w3.org/1999/xhtml", tagName);
      if (tagName === "canvas") {
        Object.defineProperty(element, "getContext", {
          configurable: true,
          value: getContext,
        });
      }
      return element;
    }) as typeof document.createElement);

    render(<HeroParticlesBackground />);

    expect(screen.getByTestId("hero-particles-fallback")).toBeInTheDocument();
    expect(screen.getByTestId("hero-particles-canvas")).toBeInTheDocument();
  });
});
