
import * as bookRepo from "./book.repository.js";
import Book from "./domain/types/Books.js"
import {jwtDecode} from "jwt-decode";


async function getAllBooks(){
    const books = await bookRepo.readBooks();
    for(let book of books){
        if(book.image && book.image.data && book.image.contentType){
            book.cover = `data:${book.image.contentType};base64,${book.image.data.toString('base64')}`;
        }
    }
    return books;
}

function getBookByKeyword(query){
    const data = (bookRepo.getBookByKeyword(query));
    return data;
}
function deleteBooks(id){
    const response = bookRepo.deleteBooks(id);
    return response;
}


async function updateBook(id, name, author, description) {
    return await bookRepo.updateBook(id, name, author, description);
}

async function addBook({name,author,description},file, coverFile, userId){
    const imgType = coverFile ? coverFile.contentType : null;
    
    console.log(userId);

    const book = {
        name: name,
        author: author,
        description: description,
        user: userId,
        filepath: file.path || file.savedPath,
        image: coverFile ? { data: coverFile.data, contentType: imgType } : null,
        imgType: imgType,
        comments: [],
        meta: { votes: 0, dislikes: 0, downloads: 0 },
        date: new Date()
    };

    // pass userId explicitly to repository so it can enforce/set ownership
    return await bookRepo.createBook(book);
}


async function createComment(userId, bookId, comment, date){
    if (!userId || !bookId || !comment) 
        throw new Error("Missing required fields");
    
    return await bookRepo.createComment(userId,bookId,comment,date);
}

async function getComments(bookId){

    if (!bookId) 
        throw new Error("BookId not found");

    return await bookRepo.getComments(bookId);
}
export {getAllBooks, getBookByKeyword, addBook, updateBook, deleteBooks, createComment, getComments}
