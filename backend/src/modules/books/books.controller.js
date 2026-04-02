
import * as bookService from "./books.service.js"
import {log} from '../../middleware/logging.middleware.js';

export async function getAllBooks(req, res, next){
    await log("getAllBooks() in book.controller was called");
    res.status(200);
    const data = await bookService.getAllBooks()
    // console.log(data)
    res.json(data);

    return; 
}
export async function getBook(req,res) {
    await log("getBook() in book.controller was called");
    const {id} = req.params;
    const book = await bookService.getBook(id);
    return res.status(200).json(book); 
}
export async function getBookByKeyword(req, res) { 
    await log("getBookByKeyword() was called in book.controller");
    try {
        const { query } = req.params;  //object destructuring of getting query from request.
        const result = await bookService.getBookByKeyword(query);
        return res.status(200).json(result); // chain into one call, no need to do JSON.stringify in service as express already does it in res.json
    } 
    catch (e) {
        return res.status(500).json({ message: e.message }); 
    }
}

  export async function updateBook(req, res) {
    const {id} = req.params;
    const {name, author, description} = req.body;

    const result = await bookService.updateBook(id, name, author, description);
    res.json(result);
  }
  
  export async function createPost(req, res){
    console.log("Creating book...");

   
    try{
         

        const {name, author, description} = req.body;
        const file = req.file;
         

        await bookService.addBook({name,author,description},file);
        console.log("Book created successfully");
        res.status(201).json({message:"Book created successfully"});
    
    }
    catch(e){

        if(req.fileValidationError){
            return res.status(400).json({message:req.fileValidationError});
        }
        if(!file)
            return res.status(400).json({message:"File is required"});
        if(!name)
            return res.status(400).json({message:"Name is required"});
        if(!author)
            return res.status(400).json({message:"Author is required"});
        if(!description)
            return res.status(400).json({message:"Description is required"});
    }

export async function deleteBooks(req, res){
    await log("deleteBooks() was called in book.controller");
    const {id} = req.params;
    const response = await bookService.deleteBooks(id);
    if(response){
        res.status(200);
        res.send();
    }else{
        res.status(404);
        res.json({
            error: "Could not delete any books"
        });
    }
}