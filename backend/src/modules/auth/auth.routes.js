import { Router } from "express";
import * as auth from "../../middleware/auth.middleware.js" 
import * as authController from "./auth.controller.js";
import * as userRepo from "./auth.repository.js"
import multer from 'multer';
export const authRoutes = Router();
//import { log } from './logging.middleware.js';


const storage = multer.memoryStorage(); //uploaded files will be in RAM temporarily
const upload = multer({ storage }); //stores image in storage with key-value pairs inluding buffer


authRoutes.post('/token', auth.sendToken);
authRoutes.delete('/delete/:id', authController.deleteUsers);
authRoutes.get('/users', authController.getAllUsers)
authRoutes.get('/users/:id', authController.getUserById)
authRoutes.put('/users/update', upload.single("avatar"), authController.updateUser);
//authRoutes.get('/logs', auth)