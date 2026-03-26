import { Router } from "express";
import * as auth from "../../middleware/auth.middleware.js" 
import * as authController from "./auth.controller.js";
export const authRoutes = Router();


authRoutes.get('/token', auth.sendToken);
authRoutes.get('/delete', auth.authMiddleware, authController.deleteUsers);