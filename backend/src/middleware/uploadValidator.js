import {upload} from './books.middleware.js';
import multer from 'multer';
export const validateBookUpload = (req, res, next) => {
    upload.single("file")(req, res, function(err) {
         if (err) {
            return res.status(400).json({ message: err.message });
        }
        next();
    });
};