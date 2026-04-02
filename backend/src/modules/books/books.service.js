
import { authMiddleware } from "../../middleware/auth.middleware.js";
import * as bookRepo from "./book.repository.js";


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

export async function updateBook(id, name, author, description) {
    return await bookRepo.updateBook(id, name, author, description);
}

export {getAllBooks, getBook, getBookByKeyword}