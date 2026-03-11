import {Router} from "express";
import { bookMiddleware } from "../../middleware/books.middleware";
import { getBook } from "./books.controller";
export const bookRoutes = Router();

bookRoutes.get('/:id', bookMiddleware, getBook);