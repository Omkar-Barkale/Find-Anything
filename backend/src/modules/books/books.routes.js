import {Router} from "express";
import * as bookController from "./books.controller.js";
import {validateBookUpload} from "../../middleware/uploadValidator.js";
import {authenticate} from "../../middleware/auth.middleware.js"
export const bookRoutes = Router();

//NOTES:
//authenticate() checks that the user is logged is a member or admin




bookRoutes.get('/', bookController.getAllBooks);
bookRoutes.post('/create', authenticate, validateBookUpload, bookController.createPost);
bookRoutes.get('/books/:query', bookController.getBookByKeyword)
bookRoutes.post('/update/:id', bookController.updateBook); //need security
bookRoutes.delete('/delete/:id', bookController.deleteBooks); //need security
bookRoutes.post('/:id/comments', bookController.createComment);
bookRoutes.get('/:id/comments', bookController.getComments);





