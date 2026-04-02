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
    limits:{fieldSize:maxSize},
    fileFilter:function(req,file,res,cb){
        //Allowed Extentions
        const filetypes = /pdf|epub/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if(extname){
            return cb(null, true);
        }
        cb(new Error('Only PDF and EPUB files are allowed!'), false);
    }

});

