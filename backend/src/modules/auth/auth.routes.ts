import { Router } from "express";
import * as authController from "./auth.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

export const authRoutes: Router = Router();

authRoutes.post("/login", authController.login);
authRoutes.get("/me", authMiddleware, authController.getMe);
authRoutes.put("/profile", authMiddleware, authController.updateProfile);
