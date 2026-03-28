
import * as bookService from "./books.service.js"

export async function getAllBooks(req, res, next){
    res.status(200);
    const data = await bookService.getAllBooks()
    console.log(data)
    res.json(data);

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

export function deleteBooks(req, res){
    const response = bookService.deleteBooks(req.body);
    if(response){
        res.status(200);
    }else{
        res.status(404);
    }
}