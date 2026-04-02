
import * as bookService from "./books.service.js"

export async function getAllBooks(req, res, next){
    res.status(200);
    res.json(await bookService.getAllBooks());
    return; 
}
export async function getBook(req,res){
    const {id} = req.params;
    const book = await bookService.getBook(id);
    return res.status(200).json(book);
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
    console.log(JSON.stringify(req.body));
    res.status(200);
    res.json({"message":"Successfully pinged backend"});
}