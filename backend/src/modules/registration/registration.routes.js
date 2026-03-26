import {Router} from "express";
import * as registrationController from "./registration.controller.js";
import multer from "multer";

/*so multer receives the image, parses, and it converts it to an object with
 metadata, including the buffer value which we are storing*/ 


export const registrationRoutes = Router();
const storage = multer.memoryStorage(); //uploaded files will be in RAM temporarily
const upload = multer({ storage }); //stores image in storage with key-value pairs inluding buffer


//uploads a single image into memory with the key name image
registrationRoutes.post('/',upload.single('image'), registrationController.createAccount);



