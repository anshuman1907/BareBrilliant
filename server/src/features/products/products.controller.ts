import type { Request, Response } from "express";
import { getProductPlaceholderMessage } from "./products.service.js";

export function getProductByItemId(_req: Request, res: Response): void {
  res.status(501).json({ message: getProductPlaceholderMessage() });
}
