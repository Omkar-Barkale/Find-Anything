import { Router } from "express";
import * as auth from "../../middleware/auth.middleware.js" 
import * as authController from "./auth.controller.js";
import * as userRepo from "./auth.repository.js"
export const authRoutes = Router();
//import { log } from './logging.middleware.js';

authRoutes.post('/token', auth.sendToken);
authRoutes.delete('/delete/:id', authController.deleteUsers);
authRoutes.get('/users', authController.getAllUsers)
//authRoutes.get('/logs', auth)