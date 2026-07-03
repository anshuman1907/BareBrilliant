import { describe, it, expect } from "vitest";
import express from "express";
import request from "supertest";
import { catalogRoutes } from "./catalog.routes.js";

describe("catalogRoutes", () => {
  it("responds 501 not implemented when listing products", async () => {
    const app = express();
    app.use("/api/catalog", catalogRoutes);

    const response = await request(app).get("/api/catalog");

    expect(response.status).toBe(501);
    expect(response.body).toEqual({ message: "Not implemented yet" });
  });
});
