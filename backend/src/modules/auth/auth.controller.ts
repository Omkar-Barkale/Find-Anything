import type { Request, Response } from "express";
import * as authService from "./auth.service.js";

export function login(req: Request, res: Response): void {
  const { username } = req.body as { username: string };

  if (!username || typeof username !== "string" || !username.trim()) {
    res.status(400).json({ error: "Username is required" });
    return;
  }

  const user = authService.login(username.trim());
  res.json({ data: user });
}

export function getMe(req: Request, res: Response): void {
  const user = authService.getMe(req.userId!);
  res.json({ data: user });
}

export function updateProfile(req: Request, res: Response): void {
  const { username } = req.body as { username: string };

  if (!username || typeof username !== "string" || !username.trim()) {
    res.status(400).json({ error: "Username is required" });
    return;
  }

  try {
    const user = authService.updateProfile(req.userId!, username.trim());
    res.json({ data: user });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(400).json({ error: message });
  }
}
