
import { authMiddleware } from "../../middleware/auth.middleware.js";
import * as bookRepo from "./book.repository.js";
import Book from "./domain/types/Books.js"


async function getAllBooks(){
    const books = await bookRepo.readBooks();
    return books;
}
function getBook(id){
    return bookRepo.getBook(id);
}
async function getBookByKeyword(query, queryFields = ["name", "author"]){
    const normalizedQuery = new RegExp(query,'i');
    const queryBody = queryFields.map(field => ({[field]: normalizedQuery}));
    //Removed JSON.stringify as it returned a JSON string instead of an array, I need it to return an array as I use map() function to display cards properly with Search 
    const data = await (bookRepo.getBookByKeyword(queryBody));
    return data;
}

async function addBook({name,author,description},file){
    console.log(name,author,description,file);
    const book = new Book({
        name:name,
        author:author,
        description:description,
        filepath:file.path,
        
    });
    await bookRepo.createBook(book);
}

export {getAllBooks, getBook, getBookByKeyword, addBook}