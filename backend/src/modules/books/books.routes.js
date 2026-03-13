import {Router} from "express";
import { bookMiddleware } from "../../middleware/books.middleware.js";

import * as bookController from "./books.controller.js";
import { getBookByKeyword } from "./books.service.js";
export const bookRoutes = Router();

bookRoutes.get('/', bookMiddleware, bookController.getAllBooks);
bookRoutes.get('/:query',bookMiddleware,bookController.getBookByKeyword)