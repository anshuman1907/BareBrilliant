import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { App } from "./App.js";

describe("App", () => {
  it("renders the header nav and footer on the homepage", () => {
    render(<App />);

    expect(screen.getByRole("link", { name: "Rings" })).toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveTextContent("BareBrilliant");
    expect(screen.getByRole("link", { name: "Terms & Conditions" })).toBeInTheDocument();
  });
});
