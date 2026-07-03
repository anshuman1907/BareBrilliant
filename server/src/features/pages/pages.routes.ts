import { Router } from "express";
import { getPageBySlug } from "./pages.controller.js";

export const pagesRoutes = Router();
pagesRoutes.get("/:slug", getPageBySlug);
