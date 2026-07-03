import { Router } from "express";
import { listCatalogProducts } from "./catalog.controller.js";

export const catalogRoutes = Router();
catalogRoutes.get("/", listCatalogProducts);
