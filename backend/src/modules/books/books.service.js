
import { authMiddleware } from "../../middleware/auth.middleware.js";
import * as bookRepo from "./book.repository.js";


async function getAllBooks(){
    const books = await bookRepo.readBooks();
    return books;
}
function getBook(id){
    return bookRepo.getBook(id);
}
function getBookByKeyword(query){
    const normalizedQuery = query.toLowerCase();
    const queryFields = ["name", "author"];
    const queryBody = []
    //Removed JSON.stringify as it returned a JSON string instead of an array, I need it to return an array as I use map() function to display cards properly with Search 
    const data = (bookRepo.getBookByKeyword([{"name":normalizedQuery}]));
    console.log("Service returning: " + data);
    return data;
}

export {getAllBooks, getBook, getBookByKeyword}