import { Router } from "express";
import {authMiddleware, sendToken} from "../../middleware/auth.middleware.js"


export const authRoutes = Router();


authRoutes.post('/token', sendToken);