import * as bookRepo from "./book.repository.js";


function getAllBooks(){
    const books =  bookRepo.readBooks();
    return books;
}
function getBook(id){
    return bookRepo.getBook(id);
}

export {getAllBooks, getBook}