
import bookRepo from "../modules/books/book.repository.js"
import {multer} from 'multer';
import path from 'path'
import {checkIfCollectionExists} from bookRepo
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"documents/");
    },
    filename: function(req,file,cb){
        const uniqueName = Date.now()+path.extname(file.originalname);
        cb(null, uniqueName);
    }
});
export const upload = multer({storage});

export function bookMiddleware(req,res,next){

    //Resource doesn't exist
    checkIfCollectionExists();
    if(!(checkIfCollectionExists())){
        res.status(404);
        res.end("File Not Found");
    }
    console.log("File found");
    next();
    
}