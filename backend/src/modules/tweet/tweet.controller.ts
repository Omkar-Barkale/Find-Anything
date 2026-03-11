import type { Request, Response } from "express";
import * as tweetService from "./tweet.service.js";

export function getAll(_req: Request, res: Response): void {
  const tweets = tweetService.getAll();
  res.json({ data: tweets });
}

export function create(req: Request, res: Response): void {
  const { content } = req.body as { content: string };

  if (!content || typeof content !== "string" || !content.trim()) {
    res.status(400).json({ error: "Content is required" });
    return;
  }

  const tweet = tweetService.create(content.trim(), req.userId!);
  res.status(201).json({ data: tweet });
}

export function update(req: Request, res: Response): void {
  const { id } = req.params;
  const { content } = req.body as { content: string };

  if (!content || typeof content !== "string" || !content.trim()) {
    res.status(400).json({ error: "Content is required" });
    return;
  }

  try {
    const tweet = tweetService.update(id, content.trim(), req.userId!);
    res.json({ data: tweet });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    const status = message === "Not authorized" ? 403 : 404;
    res.status(status).json({ error: message });
  }
}

export function remove(req: Request, res: Response): void {
  const { id } = req.params;

  try {
    const result = tweetService.remove(id, req.userId!);
    res.json({ data: result });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    const status = message === "Not authorized" ? 403 : 404;
    res.status(status).json({ error: message });
  }
}
