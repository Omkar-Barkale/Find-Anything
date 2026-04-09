import { Router } from "express";
import * as auth from "../../middleware/auth.middleware.js" 
import * as authController from "./auth.controller.js";
import * as userRepo from "./auth.repository.js"
import multer from 'multer';
export const authRoutes = Router();
import {log} from "../../middleware/Logging.js"


const storage = multer.memoryStorage(); //uploaded files will be in RAM temporarily
const upload = multer({ storage }); //stores image in storage with key-value pairs inluding buffer

//NOTES: 
//authenticate checks if token is valid and if the user is user OR admin
//authenticateAdmin does NOT have token validation and checks i user is admin
//authenticateUser checks if the request id matches the user id being gotten or deleted
//log adds a log in the database with who called the route and what they did with it


authRoutes.post('/token', auth.sendToken); 

authRoutes.delete('/delete/:id',auth.authenticate, auth.authenticateUser, log, authController.deleteUsers);
authRoutes.get('/users',auth.authenticate, auth.authenticateAdmin, log, authController.getAllUsers) 
authRoutes.get('/users/:id',auth.authenticate, auth.authenticateUser, log, authController.getUserById)
authRoutes.put('/users/update',auth.authenticate, log, upload.single("avatar"), authController.updateUser); 
authRoutes.get('/logs/:search', authController.getLogs);
authRoutes.get('/logs', authController.getAllLogs)