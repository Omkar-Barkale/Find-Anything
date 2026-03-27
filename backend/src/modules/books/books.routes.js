import {Router} from "express";
import * as bookController from "./books.controller.js";
import {upload} from "../../middleware/books.middleware.js"
export const bookRoutes = Router();

bookRoutes.get('/', bookController.getAllBooks);
bookRoutes.get('/search=:query',bookController.getBookByKeyword)
bookRoutes.post('/create', upload.single("file"),bookController.createPost);
