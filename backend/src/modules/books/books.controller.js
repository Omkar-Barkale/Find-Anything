
import * as bookService from "./books.service.js"

export async function getAllBooks(req, res, next){
    res.status(200);
    res.json(bookService.getAllBooks());
    res.end();
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
        const { query } = req.params; 
        const result = await bookService.getBookByKeyword(query);
        return res.status(200).json(result); // chain into one call
    } catch (e) {
        return res.status(500).json({ message: e.message }); 
    }
}