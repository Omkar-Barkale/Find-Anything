import * as bookRepo from "./book.repository.js";


function getAllBooks(){
    const books =  bookRepo.readBooks();
    return books;
}
function getBook(id){
    return bookRepo.getBook(id);
}
function getBookByKeyword(query){
    //Removed JSON.stringify as it returned a JSON string instead of an array, I need it to return an array as I use map() function to display cards properly with Search 
    const data = (bookRepo.getBookByKeyword(query));
    console.log("Service returning: " + data);
    return data;
}

export {getAllBooks, getBook, getBookByKeyword}