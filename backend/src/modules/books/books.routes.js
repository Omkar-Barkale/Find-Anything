import {Router} from "express";
import * as bookController from "./books.controller.js";
export const bookRoutes = Router();

<<<<<<< HEAD
bookRoutes.get('/', bookMiddleware, getAllBooks);
=======
bookRoutes.get('/', bookController.getAllBooks);
bookRoutes.get('/:query',bookController.getBookByKeyword)
>>>>>>> d938eab209c102810e3476dfb70c48c3ec82539e
