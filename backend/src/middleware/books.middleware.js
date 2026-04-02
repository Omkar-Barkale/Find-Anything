import fs from "fs";
import multer from 'multer';
import path from 'path'


const maxSize = 16 * 1024 * 1024;
const UPLOAD_DIR = path.join(process.cwd(),"documents");

if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,UPLOAD_DIR);
    },
    filename: function(req,file,cb){
        const uniqueName = Date.now()+path.extname(file.originalname);
        cb(null, uniqueName);
    }
});
export const upload = multer({storage,
    limits:{fileSize:maxSize},
    fileFilter:function(req,file,cb){
        const filetypes = /pdf|epub/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if(mimetype && extname){
            return cb(null,true);
        }        
        const error = new Error("Only PDF and EPUB files are allowed!");
        cb(error, false);
    }
});

