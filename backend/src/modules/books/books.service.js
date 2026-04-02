
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
    const data = await (bookRepo.getBookByKeyword(queryBody));
    return data;
}
function deleteBooks(id){
    const response = bookRepo.deleteBooks(id);
    return response;
}


async function updateBook(id, name, author, description) {
    return await bookRepo.updateBook(id, name, author, description);
}

async function addBook({name,author,description},file){
    console.log(name,author,description,file);
    const book = new Book({
        name:name,
        author:author,
        description:description,
        filepath:file.path,
        
    });
    return await bookRepo.createBook(book);
}

export {getAllBooks, getBook, getBookByKeyword, addBook, updateBook, deleteBooks}
