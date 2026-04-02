import {Router} from "express";
import * as bookController from "./books.controller.js";
import {validateBookUpload} from "../../middleware/uploadValidator.js";
export const bookRoutes = Router();

//

bookRoutes.get('/', bookController.getAllBooks);
bookRoutes.post('/create', validateBookUpload, bookController.createPost);
bookRoutes.get('/:query', bookController.getBookByKeyword)
bookRoutes.post('/update/:id', bookController.updateBook);
bookRoutes.delete('/delete/:id', bookController.deleteBooks);
