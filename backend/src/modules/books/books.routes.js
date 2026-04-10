import {Router} from "express";
import * as bookController from "./books.controller.js";
import {validateBookUpload} from "../../middleware/uploadValidator.js";
import {authenticate} from "../../middleware/auth.middleware.js"
export const bookRoutes = Router();
import {log} from "../../middleware/Logging.js"
//NOTES:
//authenticate() checks that the user is logged is a member or admin




// bookRoutes.get('/', bookController.getAllBooks);
// bookRoutes.post('/create', authenticate, log, validateBookUpload, bookController.createPost);
// bookRoutes.get('/file/:id', authenticate, bookController.downloadBook);
// bookRoutes.get('/books/:query', bookController.getBookByKeyword)
// bookRoutes.post('/update/:id', authenticate, log, bookController.updateBook); //need security
// bookRoutes.delete('/delete/:id', authenticate, log, bookController.deleteBooks); //need security
// bookRoutes.post('/:id/comments', bookController.createComment);
// bookRoutes.get('/:id/comments', bookController.getComments);


bookRoutes.get('/', bookController.getAllBooks);
bookRoutes.get('/file/:id', authenticate, bookController.downloadBook);
bookRoutes.post('/create', authenticate, log, validateBookUpload, bookController.createPost);
bookRoutes.get('/:id/comments', bookController.getComments);
bookRoutes.post('/:id/comments', bookController.createComment);
bookRoutes.post('/update/:id', authenticate, log, bookController.updateBook);
bookRoutes.delete('/delete/:id', authenticate, log, bookController.deleteBooks);
bookRoutes.get('/:query', bookController.getBookByKeyword);


