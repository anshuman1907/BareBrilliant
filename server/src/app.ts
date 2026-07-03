import express, { type Express } from "express";
import { catalogRoutes } from "./features/catalog/catalog.routes.js";
import { productsRoutes } from "./features/products/products.routes.js";
import { pagesRoutes } from "./features/pages/pages.routes.js";

export function createApp(): Express {
  const app = express();
  app.use(express.json());

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api/catalog", catalogRoutes);
  app.use("/api/products", productsRoutes);
  app.use("/api/pages", pagesRoutes);

  return app;
}
