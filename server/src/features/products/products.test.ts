import { describe, it, expect } from "vitest";
import express from "express";
import request from "supertest";
import { productsRoutes } from "./products.routes.js";

describe("productsRoutes", () => {
  it("responds 501 not implemented when fetching a product by item id", async () => {
    const app = express();
    app.use("/api/products", productsRoutes);

    const response = await request(app).get("/api/products/241257");

    expect(response.status).toBe(501);
    expect(response.body).toEqual({ message: "Not implemented yet" });
  });
});
