import {Router} from "express";
import * as bookController from "./books.controller.js";
import {validateBookUpload} from "../../middleware/uploadValidator.js";
export const bookRoutes = Router();

//

bookRoutes.get('/', bookController.getAllBooks);
bookRoutes.get('/search=:query',bookController.getBookByKeyword)
bookRoutes.post('/create', validateBookUpload, bookController.createPost);
