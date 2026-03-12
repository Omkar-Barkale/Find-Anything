import * as bookRepo from "./book.repository.js";


function getAllBooks(){
    const books =  bookRepo.readBooks();
    return books;
}
function getBook(id){
    return bookRepo.getBook(id);
}
function getBookByKeyword(query){
    return JSON.stringify(bookRepo.getBookByKeyword(query));
}

export {getAllBooks, getBook, getBookByKeyword}