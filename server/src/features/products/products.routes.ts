import { Router } from "express";
import { getProductByItemId } from "./products.controller.js";

export const productsRoutes = Router();
productsRoutes.get("/:itemId", getProductByItemId);
