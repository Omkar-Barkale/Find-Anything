import type { Request, Response, NextFunction } from "express";
import * as authRepository from "../modules/auth/auth.repository.js";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const userId: string | undefined = req.headers["x-user-id"] as
    | string
    | undefined;

  if (!userId) {
    res.status(401).json({ error: "Missing X-User-Id header" });
    return;
  }

  const user = authRepository.findById(userId);
  if (!user) {
    res.status(401).json({ error: "Invalid user" });
    return;
  }

  req.userId = userId;
  next();
}

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}
