
import * as bookService from "./books.service.js"

export async function getAllBooks(req, res, next){
    res.status(200);
    res.json(await bookService.getAllBooks());
    return; 
}
function getBook(req,res){
    const {id} = req.params;
    const book = bookService.getBook(id);
    res.status(200);
    res.json({data:book}); 
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

export async function createPost(req, res){
    console.log("Creating book...");
    try{
        const {name, author, description} = req.body;
        const file = req.file;
        if(!file)
            return res.status(400).json({message:"File is required"});
        if(!name)
            return res.status(400).json({message:"Name is required"});
        if(!author)
            return res.status(400).json({message:"Author is required"});
        if(!description)
            return res.status(400).json({message:"Description is required"}); 

        await bookService.addBook({name,author,description},file);
        res.status(201).json({message:"Book created successfully"});
    
    }
    catch(e){
        res.status(500).json({message:e.message});
    }

}