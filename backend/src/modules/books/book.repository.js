
import path from "path";
import { DATA_DIR } from "../../constants.js";
import {connectDB} from '../../db_connection.js';
import { ObjectId } from "mongodb";



const BOOKS_FILE = path.join(DATA_DIR,"books.json");

export async function getBook(id) {
    const db = await connectDB();
    const book = await db.collection("books").findOne({_id: new ObjectId(id)});
    return book;
}

export async function readBooks(){ 
    const db = await connectDB();
    const data = await db.collection("books").find({}).toArray(); 
    return data;
}


export async function getBookByKeyword(query){
    const db = await getDB();
    console.log(query);
    const data = await db.collection("books").find({$or:query}).toArray(); 
    return data;

}

export async function createBook(book){
    const db = await getDB();
    await db.collection("books").insertOne(book);
    console.log("Book created successfully");
}

export default async function checkIfCollectionExists(){
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

