
import * as bookRepo from "./book.repository.js";
import Book from "./domain/types/Books.js"
import {jwtDecode} from "jwt-decode";


async function getAllBooks(){
    const books = await bookRepo.readBooks();
    return books;
}

function getBookByKeyword(query){
    const data = (bookRepo.getBookByKeyword(query));
    console.log("Service returning: " + data);
    return data;
}
function deleteBooks(id){
    console.log("deleteBooks services ran");
    const response = bookRepo.deleteBooks(id);
    return response;
}


async function updateBook(id, name, author, description) {
    return await bookRepo.updateBook(id, name, author, description);
}

async function addBook({name,author,description},file){

    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    const userId = user.id;


    console.log(name,author,description,file);
    const book = new Book({
        name:name,
        author:author,
        description:description,
        user:userId,
        filepath:file.path,
        
    });
    return await bookRepo.createBook(book);
}

export {getAllBooks, getBookByKeyword, addBook, updateBook, deleteBooks}
