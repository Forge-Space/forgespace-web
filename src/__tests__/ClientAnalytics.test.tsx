import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { ClientAnalytics } from "@/components/analytics/ClientAnalytics";

vi.mock("next/dynamic", () => ({
  default: vi.fn((_loader) => {
    const MockComponent = ({ children }: { children: React.ReactNode }) => (
      <div data-testid="mock-analytics-provider">{children}</div>
    );
    return MockComponent;
  }),
}));

describe("ClientAnalytics", () => {
  it("renders with children", () => {
    const { getByText } = render(
      <ClientAnalytics>
        <div>Test Content</div>
      </ClientAnalytics>
    );
    expect(getByText("Test Content")).toBeDefined();
  });

  it("wraps children in AnalyticsProvider", () => {
    const { getByTestId } = render(
      <ClientAnalytics>
        <span>Analytics Test</span>
      </ClientAnalytics>
    );
    expect(getByTestId("mock-analytics-provider")).toBeDefined();
  });
});
