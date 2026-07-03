import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { App } from "./App.js";

describe("App", () => {
  it("renders the BareBrilliant placeholder shell", () => {
    render(<App />);
    expect(screen.getByText("BareBrilliant")).toBeInTheDocument();
  });
});
