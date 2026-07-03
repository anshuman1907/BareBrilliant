import { describe, it, expect } from "vitest";
import express from "express";
import request from "supertest";
import { pagesRoutes } from "./pages.routes.js";

describe("pagesRoutes", () => {
  it("responds 501 not implemented when fetching a static page by slug", async () => {
    const app = express();
    app.use("/api/pages", pagesRoutes);

    const response = await request(app).get("/api/pages/terms-conditions");

    expect(response.status).toBe(501);
    expect(response.body).toEqual({ message: "Not implemented yet" });
  });
});
