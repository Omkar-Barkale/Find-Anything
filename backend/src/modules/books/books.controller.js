
import * as bookService from "./books.service.js"

 async function getAllBooks(req, res, next){
    res.status(200);
    console.log("Running Controller");
    res.json(bookService.getAllBooks());

    console.log(res);
    res.end();
}


function getBook(req,res){
    const {id} = req.params.id;

    const book = bookService.getBook(id);
    res.status
    res.json({data:book});
    res.end();
}

export {getAllBooks,getBook}