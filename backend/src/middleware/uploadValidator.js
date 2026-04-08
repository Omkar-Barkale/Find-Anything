import {upload} from './books.middleware.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

export const handleBookUpload = (req, res, next) => {
    const file = req.files?.file?.[0];
    const cover = req.files?.cover?.[0];
    if (!file) {
        return res.status(400).json({ message: "File is required" });
    }
    const fileName = Date.now() + path.extname(file.originalname);
    console.log("Saving file with name:", fileName);
    console.log(process.cwd());
    const filePath = path.join(process.cwd(), './uploads/documents', fileName);

    // Save file to disk
    fs.writeFileSync(filePath, file.buffer);
    req.file = {
        ...file,
        path: filePath,
        savedPath: filePath
    };

    if(cover){
        req.coverData = {
            data: cover.buffer,
            contentType: cover.mimetype
        };
    }
    next();
}



export const validateBookUpload = (req, res, next) => {
        console.log("Validating book upload...");
        const uploadFields = upload.fields([
            {name: 'file', maxCount: 1},
            {name: 'cover', maxCount: 1}
        ]);

        uploadFields(req, res, function(err) {
        console.log("Upload validation completed with error:", err);
         if (err) {
            return res.status(400).json({ message: err.message });
        }

        if(!req.files){
            return res.status(400).json({ message: "No file uploaded" });
        }

        req.file = req.files.file[0];
        req.cover = req.files.cover ? req.files.cover[0] : null;

        // Ensure uploads directory exists and save document file to disk
        try{
            const uploadDir = path.join(process.cwd(), 'uploads', 'documents');
            if(!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

            const fileName = Date.now() + path.extname(req.file.originalname);
            const filePath = path.join(uploadDir, fileName);
            fs.writeFileSync(filePath, req.file.buffer);

            // attach saved path to req.file for downstream usage
            req.file.path = filePath;
            req.file.savedPath = filePath;
        } catch (writeErr) {
            console.error('Error writing uploaded file to disk:', writeErr);
            return res.status(500).json({ message: 'Failed to save uploaded file' });
        }

        if (req.cover) {
            req.coverData = {
                data: req.cover.buffer,
                contentType: req.cover.mimetype
            };
        }

        console.log("File validation and save successful:", req.file.path);
        next();
        });
};