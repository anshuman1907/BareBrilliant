import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Footer } from "./Footer.js";

describe("Footer", () => {
  it("links to every static content page", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: "Terms & Conditions" })).toHaveAttribute(
      "href",
      "/terms-conditions"
    );
    expect(screen.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute(
      "href",
      "/privacy-policy"
    );
    expect(screen.getByRole("link", { name: "Shipping & Returns" })).toHaveAttribute(
      "href",
      "/shipping-returns"
    );
    expect(screen.getByRole("link", { name: "About Us" })).toHaveAttribute("href", "/about-us");
    expect(screen.getByRole("link", { name: "Contact Us" })).toHaveAttribute("href", "/contact-us");
  });

  it("shows a copyright line", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByText(/BareBrilliant/)).toBeInTheDocument();
  });
});
