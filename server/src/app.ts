import express, { type Express, type NextFunction, type Request, type Response } from "express";
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

  app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  });

  return app;
}
