import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { CatalogPage } from "./CatalogPage.js";
import { WishlistProvider } from "../contexts/WishlistContext.js";
import type { CatalogResponseDTO } from "../lib/catalogTypes.js";

function buildResponse(overrides: Partial<CatalogResponseDTO> = {}): CatalogResponseDTO {
  return {
    items: [
      {
        productId: 1,
        itemId: "241257",
        name: "Low Dome Basket Lab-Grown Diamond Eternity Ring",
        slug: "low-dome-basket-lab-grown-diamond-eternity-ring",
        price: 2620,
        compareAtPrice: null,
        imageUrl: null,
        hoverMedia: null,
        metal: "14K White Gold",
        diamondType: "Lab-Grown Diamond",
        totalCarat: 3,
        stoneShape: "Round",
        avgRating: null,
        reviewCount: 0
      }
    ],
    total: 1,
    page: 1,
    pageSize: 24,
    availableFilters: [
      {
        key: "metal",
        label: "Metal Type",
        values: [{ value: "14K White Gold", label: "14K White Gold", count: 1 }]
      }
    ],
    ...overrides
  };
}

function mockFetchOnce(body: unknown, status = 200): void {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: status >= 200 && status < 300,
      status,
      json: () => Promise.resolve(body)
    })
  );
}

function renderCatalogPage(initialEntry = "/wedding-rings"): void {
  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <WishlistProvider>
        <Routes>
          <Route path="/:category" element={<CatalogPage />} />
        </Routes>
      </WishlistProvider>
    </MemoryRouter>
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("CatalogPage", () => {
  it("renders the breadcrumb, title and product grid once data loads", async () => {
    mockFetchOnce(buildResponse());
    renderCatalogPage();

    expect(await screen.findByRole("heading", { name: "Shop Wedding Rings" })).toBeInTheDocument();
    expect(screen.getByText("Wedding Rings", { selector: "span" })).toBeInTheDocument();
    expect(screen.getByText("Low Dome Basket Lab-Grown Diamond Eternity Ring")).toBeInTheDocument();
    expect(screen.getByText("1 Result")).toBeInTheDocument();
  });

  it("shows an explicit empty state when there are zero results", async () => {
    mockFetchOnce(buildResponse({ items: [], total: 0 }));
    renderCatalogPage();

    expect(await screen.findByText(/no products match/i)).toBeInTheDocument();
  });

  it("shows a not-found message for an unknown category", async () => {
    mockFetchOnce({ message: "category not found" }, 404);
    renderCatalogPage("/not-a-real-category");

    expect(await screen.findByText(/this category could not be found/i)).toBeInTheDocument();
  });

  it("refetches with the selected filter applied", async () => {
    mockFetchOnce(buildResponse());
    renderCatalogPage();
    await screen.findByRole("heading", { name: "Shop Wedding Rings" });

    fireEvent.change(screen.getByLabelText("Metal"), { target: { value: "14K White Gold" } });

    await waitFor(() => {
      const lastCallUrl = String(vi.mocked(fetch).mock.calls.at(-1)?.[0]);
      expect(lastCallUrl).toContain("metal=14K+White+Gold");
    });
  });
});
