import {Router} from "express";
import * as bookController from "./books.controller.js";
import {validateBookUpload} from "../../middleware/uploadValidator.js";
import {authenticate} from "../../middleware/auth.middleware.js"
export const bookRoutes = Router();
import {log} from "../../middleware/Logging.js"
//NOTES:
//authenticate() checks that the user is logged is a member or admin




bookRoutes.get('/', bookController.getAllBooks);
bookRoutes.post('/create',log ,authenticate, validateBookUpload, bookController.createPost);
bookRoutes.get('/:query', bookController.getBookByKeyword)
bookRoutes.post('/update/:id',log, bookController.updateBook); //need security
bookRoutes.delete('/delete/:id',log, bookController.deleteBooks); //need security





