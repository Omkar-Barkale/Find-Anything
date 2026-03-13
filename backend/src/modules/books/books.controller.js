
import * as bookService from "./books.service.js"

 async function getAllBooks(req, res){
    res.status(200);
    res.json(await bookService.getAllBooks());

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

function getBookByKeyword(req,res){
    const {query} = req.params.query
    const data = bookService.getBookByKeyword(query);
    console.log("Returning:\n" + data);
    res.status(200);
    res.json(data)
    res.send();
}

export {getAllBooks,getBook,getBookByKeyword}