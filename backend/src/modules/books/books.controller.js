
import * as bookService from "./books.service.js"
import jwt from "jsonwebtoken";

export async function getAllBooks(req, res, next){
    res.status(200);
    const data = await bookService.getAllBooks()
    // console.log(data)
    res.json(data);

    return; 
}
function coverImg(buffer, imgType){
    if(buffer != null && imgType != null){
        return `data:${imgType};base64,${buffer.toString('base64')}`;
    }
}
export async function getBookByKeyword(req, res) { 
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
    try{
        const token = req.headers['authorization']?.split(' ')[1]
        const decoded = jwt.verify(token, process.env.jwt_secret);
        
        console.log("Decoded JWT:", decoded._id);
       

        const coverObj = req.coverData || null; // contains { data: Buffer, contentType: string }
        const {name, author, description} = req.body;
        const file = req.file;

        await bookService.addBook({name,author,description}, file, coverObj, decoded._id);
        console.log("Book created successfully");
        res.status(201).json({message:"Book created successfully", filepath: file?.path || file?.savedPath});
    
    }
    catch(e){
        const {name, author, description} = req.body;
        const file = req.file;

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
        return res.status(500).json({message:e.message});
    }
   
}

export async function deleteBooks(req, res){
    console.log("deletebook services ran");
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

export async function createComment(req, res){
    try{
        const token = req.headers['authorization']?.split(' ')[1]

        if (!token) 
            return res.status(401).json({ message: "No token found" });

        const decoded = jwt.verify(token, process.env.jwt_secret);
        console.log("Decoded JWT:", decoded._id);

        const comment = req.body.comment;
        if (!comment) 
            return res.status(400).json({ message: "Comment cannot be empty" });
        
        const userId = decoded._id;
        const username = decoded.username;
        const bookId = req.params.id;
        const date = new Date();

        
        

        const commentId = await bookService.createComment(username, userId, bookId, comment, date);

        res.status(201).json({message: "Comment posted!", id : commentId});
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
}

export async function getComments(req, res)
{
    try{
        const bookId = req.params.id;
        const comments = await bookService.getComments(bookId);
        res.status(200).json(comments);
        
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
}