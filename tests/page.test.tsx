import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import DashboardPage from "../src/app/page";

// Mock the shared component library
vi.mock("@rodrigo-barraza/components-library", () => ({
  StatsCardComponent: ({ label, value }: any) => (
    <div data-testid={`stat-${label}`}>{value}</div>
  ),
  EmptyStateComponent: ({ title, description }: any) => (
    <div data-testid="empty-state">{title}</div>
  ),
  PageLayoutComponent: ({ children }: any) => <div>{children}</div>,
  useTheme: () => ({
    theme: "dark",
    themes: ["light", "dark"],
    setTheme: vi.fn(),
    mounted: true,
  }),
}));

describe("DashboardPage", () => {
  it("renders the dashboard heading", () => {
    render(<DashboardPage />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });
});
