import {Router} from "express";
import * as bookController from "./books.controller.js";
export const bookRoutes = Router();

bookRoutes.get('/', bookController.getAllBooks);
bookRoutes.get('/search=:query',bookController.getBookByKeyword)
bookRoutes.post('/create', bookController.createPost);
bookRoutes.post('/update', bookController.updateBook);
