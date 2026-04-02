import {Router} from "express";
import * as bookController from "./books.controller.js";
export const bookRoutes = Router();

bookRoutes.get('/', bookController.getAllBooks);
bookRoutes.get('/:id', bookController.getBook);
bookRoutes.get('/:query', bookController.getBookByKeyword)
bookRoutes.post('/update/:id', bookController.updateBook);
bookRoutes.delete('/delete/:id', bookController.deleteBooks);
