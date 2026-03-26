import {Router} from "express";
import * as bookController from "./books.controller.js";
import {authMiddleware} from "../../middleware/auth.middleware.js"
export const bookRoutes = Router();

bookRoutes.get('/', bookController.getAllBooks);
bookRoutes.get('/:query', bookController.getBookByKeyword)
bookRoutes.get('/delete', authMiddleware, bookController.deleteBooks);
