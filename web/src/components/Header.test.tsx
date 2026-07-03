import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Header } from "./Header.js";

describe("Header", () => {
  it("renders the primary category navigation", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: "Engagement Rings" })).toHaveAttribute(
      "href",
      "/engagement-rings"
    );
    expect(screen.getByRole("link", { name: "Rings" })).toHaveAttribute("href", "/rings");
    expect(screen.getByRole("link", { name: "Earrings" })).toHaveAttribute("href", "/earrings");
    expect(screen.getByRole("link", { name: "Bracelets" })).toHaveAttribute("href", "/bracelets");
    expect(screen.getByRole("link", { name: "Necklaces" })).toHaveAttribute("href", "/necklaces");
    expect(screen.getByRole("link", { name: "Diamonds" })).toHaveAttribute("href", "/diamonds");
    expect(screen.getByRole("link", { name: "Gemstones" })).toHaveAttribute("href", "/gemstones");
    expect(screen.getByRole("link", { name: "Gifts" })).toHaveAttribute("href", "/gifts");
  });

  it("links the logo back to the homepage", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: "BareBrilliant" })).toHaveAttribute("href", "/");
  });
});
