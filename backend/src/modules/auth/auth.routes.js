import { Router } from "express";
import * as auth from "../../middleware/auth.middleware.js" 
import * as authController from "./auth.controller.js";
import * as userRepo from "./auth.repository.js"
import multer from 'multer';
export const authRoutes = Router();
//import { log } from './logging.middleware.js';


const storage = multer.memoryStorage(); //uploaded files will be in RAM temporarily
const upload = multer({ storage }); //stores image in storage with key-value pairs inluding buffer

//NOTES: 
//authenticate checks if token is valid and if the user is user OR admin
//authenticateAdmin does NOT have token validation and checks i user is admin
//authenticateUser checks if the request id matches the user id being gotten or deleted



authRoutes.post('/token', auth.sendToken); 

authRoutes.delete('/delete/:id',auth.authenticate, auth.authenticateUser, authController.deleteUsers);
authRoutes.get('/users',auth.authenticate, auth.authenticateAdmin, authController.getAllUsers) 
authRoutes.get('/users/:id',auth.authenticate, auth.authenticateUser, authController.getUserById)
authRoutes.put('/users/update',auth.authenticate, auth.authenticateUser, upload.single("avatar"), authController.updateUser); 
//authRoutes.get('/logs', auth)s