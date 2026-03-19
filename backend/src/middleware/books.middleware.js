
import bookRepo from "../modules/books/book.repository.js"

export function bookMiddleware(req,res,next){
    //Resource doesn't exist
    if(!(bookRepo)){
        res.status(404);
        res.end("File Not Found");
    }
    console.log("File found");
    next();
    
}   