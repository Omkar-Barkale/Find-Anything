import fs, { read } from "fs";
import * as bookRepo from "./book.repository.js";
import Book from "./domain/types/Books.js"



async function getAllBooks(){
    const books = await bookRepo.readBooks();
    books.forEach(book => {
        if(book.image && book.imgType){
            console.log(book.savedPath)
        }
    });
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

    return await bookRepo.createBook(book);
}

async function getBookFileById(id){
    return await bookRepo.getBookById(id);
}

async function incrementDownloads(id){
    return await bookRepo.incrementDownloads(id);
}

async function createComment(username, userId, bookId, comment, date){
    if (!userId || !bookId || !comment) 
        throw new Error("Missing required fields");
    
    return await bookRepo.createComment(username, userId,bookId,comment,date);
}

async function getComments(bookId){

    if (!bookId) 
        throw new Error("BookId not found");

    return await bookRepo.getComments(bookId);
}
export {getAllBooks, getBookByKeyword, addBook, updateBook, deleteBooks, createComment, getBookFileById, incrementDownloads, getComments}
