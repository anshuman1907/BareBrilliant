import type { Request, Response } from "express";
import { getCatalogPlaceholderMessage } from "./catalog.service.js";

export function listCatalogProducts(_req: Request, res: Response): void {
  res.status(501).json({ message: getCatalogPlaceholderMessage() });
}
