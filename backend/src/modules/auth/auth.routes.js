import { Router } from "express";
import {authMiddleware} from "../../middleware/auth.middleware.js"
import * as userController from "./auth.controller.js"

export const authRoutes = Router();

authRoutes.post('/', authMiddleware, userController.getUserByEmail);