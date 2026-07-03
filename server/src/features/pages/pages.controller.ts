import type { Request, Response } from "express";
import { getPagePlaceholderMessage } from "./pages.service.js";

export function getPageBySlug(_req: Request, res: Response): void {
  res.status(501).json({ message: getPagePlaceholderMessage() });
}
