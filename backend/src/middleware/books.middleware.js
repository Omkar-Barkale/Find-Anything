import fs from "fs";
import multer from 'multer';
import path from 'path'


const maxSize = 16 * 1024 * 1024;
const UPLOAD_DIR = path.join(process.cwd(), 'uploads', 'documents');

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Use memory storage for uploads and write the file to disk manually in validator
const storage = multer.memoryStorage();

function fileFilter(req, file, cb) {
    if (file.fieldname === 'file') {
        const allowed = /pdf|epub/;
        const ext = allowed.test(path.extname(file.originalname).toLowerCase());
        const mime = allowed.test(file.mimetype);
        if (ext && mime) return cb(null, true);
        return cb(new Error('Only PDF and EPUB files are allowed for the document file'));
    }

    if (file.fieldname === 'cover') {
        const allowed = /jpeg|jpg|png/;
        const ext = allowed.test(path.extname(file.originalname).toLowerCase());
        const mime = allowed.test(file.mimetype);
        if (ext && mime) return cb(null, true);
        return cb(new Error('Only JPEG and PNG files are allowed for the cover image'));
    }

    cb(null, false);
}

export const upload = multer({
    storage,
    limits: { fileSize: maxSize },
    fileFilter
});

