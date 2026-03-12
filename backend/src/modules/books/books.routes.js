import {Router} from "express";
import { bookMiddleware } from "../../middleware/books.middleware.js";

import { getAllBooks } from "./books.controller.js";
export const bookRoutes = Router();

bookRoutes.get('/', bookMiddleware, getAllBooks);