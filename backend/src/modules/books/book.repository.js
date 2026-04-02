import fs, { read } from "fs";
import path from "path";
import { DATA_DIR } from "../../constants.js";
import {connectDB} from '../../db_connection.js';
import { ObjectId } from "mongodb";
import {log} from '../../middleware/logging.middleware.js';



const BOOKS_FILE = path.join(DATA_DIR,"books.json");

export async function getBook(id) {
    const db = await connectDB();
    const book = await db.collection("books").findOne({_id: new ObjectId(id)});
    return book;
}

export async function readBooks(){ 
    await log("readBooks() in book.repository was called");
    const db = await connectDB();
    const data = await db.collection("books").find({}).toArray(); 
    return data;
}


export async function getBookByKeyword(query){
    await log("getBookByKeyword() in book.repository was called");
    const db = await connectDB();
    const data = await db.collection("books").find({$or: [
        {name: {$regex: query, $options: 'i'}},
        {author: {$regex: query, $options: 'i'}}
    ]}).toArray(); 

    console.log("Getting specific books from MongoDB");
    const queryReturn = data.filter((book,index,data)=>{
        console.log(book.name+ " vs " + query);
        return(book.name.toLowerCase().includes(safeQuery)||book.author.toLowerCase().includes(safeQuery))
    });
    return queryReturn;
}

export async function deleteBooks(id){
    await log("deleteBooks in book.repository was called");
    const db = await connectDB();
    const result = await db.collection("books").deleteOne({_id : new ObjectId(id)});
    console.log(id);
    if(result.acknowledged){
        console.log("Number of books deleted: " + result.deletedCount);
        return true;
    }else{
        console.log("Could not delete any books check attributes");
        return false;
    }
}


export default function checkIfDataExists(){
    try{
        const data = readBooks();
        return true;
    }
    catch(e){
        console.log(e);
        return false;
    }
}

export async function updateBook(id, name, author, description) {
    const db = await connectDB();
    
    const result = await db.collection("books").updateOne(
        {_id: new ObjectId(id)},
        {$set: {name:name, author:author, body:description}}
    );

    return result.modifiedCount;
}

export async function incrementLikes(_id, amount) {
    const db = await connectDB();

    const result = await db.collection("books").updateOne(
        {_id: new ObjectId(id)},
        {$inc: {votes: amount}}
    );

    return result.modifiedCount;
}

export async function incrementDownloads(_id) {
    const db = await connectDB();

    const result = await db.collection("books").updateOne(
        {_id: new ObjectId(id)},
        {$inc: {downloads: 1}}
    );

    return result.modifiedCount;
}

