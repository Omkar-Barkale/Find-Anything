
import bookRepo from "../modules/books/book.repository.js"

export function bookMiddleware(req,res,next){
<<<<<<< HEAD

    if(req.body.email === "email" && req.body.password === "1234"){
         console.log("email and password are a match");
    }
    else{
        console.log("email and password do not match");
    }
=======
    //Resource doesn't exist
    if(!(bookRepo)){
        res.status(404);
        res.end("File Not Found");
    }
    console.log("File found");
>>>>>>> d938eab209c102810e3476dfb70c48c3ec82539e
    next();
    
}