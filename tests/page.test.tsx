import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import HomePage from "../src/app/page";

// Mock the shared component library
vi.mock("@rodrigo-barraza/components-library", () => ({
  StatsCardComponent: ({ label, value }: any) => (
    <div data-testid={`stat-${label}`}>{value}</div>
  ),
  EmptyStateComponent: ({ title }: any) => <div data-testid="empty-state">{title}</div>,
  PageHeroComponent: ({ title, subtitle }: any) => (
    <header>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </header>
  ),
  PageLayoutComponent: ({ children }: any) => <div>{children}</div>,
  useTheme: () => ({
    theme: "dark",
    themes: ["light", "dark"],
    setTheme: vi.fn(),
    mounted: true,
  }),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useParams: () => ({}),
}));

const fetchListingStats = vi.fn();
const fetchListings = vi.fn();
vi.mock("../src/services/ListingsService", () => ({
  fetchListingStats: (...args: unknown[]) => fetchListingStats(...args),
  fetchListings: (...args: unknown[]) => fetchListings(...args),
}));

describe("HomePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.localStorage.clear();
  });

  it("renders the hero and action cards", async () => {
    fetchListingStats.mockResolvedValue({ adoptable: 0, bySpecies: {}, byStatus: {}, bySource: {} });
    fetchListings.mockResolvedValue({ count: 0, total: 0, items: [] });

    render(<HomePage />);
    expect(screen.getByText("Every animal deserves a home")).toBeInTheDocument();
    expect(screen.getByText("Adopt")).toBeInTheDocument();
    expect(screen.getByText("Donate")).toBeInTheDocument();
    expect(screen.getByText("For Shelters")).toBeInTheDocument();
    await waitFor(() => expect(fetchListings).toHaveBeenCalled());
  });

  it("renders featured listings and stats when the service responds", async () => {
    fetchListingStats.mockResolvedValue({
      adoptable: 42,
      bySpecies: { dog: 30, cat: 12 },
      byStatus: { adoptable: 42 },
      bySource: { sample: 42 },
    });
    fetchListings.mockResolvedValue({
      count: 1,
      total: 42,
      items: [
        {
          _id: "abc123",
          source: "sample",
          sourceId: "pet-luna",
          name: "Luna",
          species: "dog",
          breed: "Border Collie",
          breedSecondary: "",
          mixedBreed: false,
          age: "young",
          sex: "female",
          size: "medium",
          status: "adoptable",
          description: "",
          photos: [],
          attributes: {},
          organizationSourceId: "org-1",
          location: { city: "Vancouver", state: "BC", country: "CA", postcode: "", coordinates: null },
          url: null,
          publishedAt: null,
          createdAt: "",
          updatedAt: "",
        },
      ],
    });

    render(<HomePage />);
    await waitFor(() => expect(screen.getByText("Luna")).toBeInTheDocument());
    expect(screen.getByTestId("stat-Adoptable animals")).toHaveTextContent("42");
    expect(screen.getByText("Looking for a home")).toBeInTheDocument();
  });

  it("shows the empty-state guidance when no listings exist", async () => {
    fetchListingStats.mockResolvedValue({ adoptable: 0, bySpecies: {}, byStatus: {}, bySource: {} });
    fetchListings.mockResolvedValue({ count: 0, total: 0, items: [] });

    render(<HomePage />);
    await waitFor(() => expect(screen.getByText(/No listings yet/)).toBeInTheDocument());
  });
});
