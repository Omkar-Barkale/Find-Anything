import * as bookRepo from "./book.repository.js";


function getAllBooks(){
    const books =  bookRepo.readBooks();
    return books;
}
function getBook(id){
    return bookRepo.getBook(id);
}
function getBookByKeyword(query){

    const data = JSON.stringify(bookRepo.getBookByKeyword(query));
    console.log("Service returning: " + data);
    return data;
}

export {getAllBooks, getBook, getBookByKeyword}