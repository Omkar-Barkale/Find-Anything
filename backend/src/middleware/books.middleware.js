
import bookRepo from "../modules/books/book.repository.js"
import {checkIfCollectionExists} from bookRepo
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