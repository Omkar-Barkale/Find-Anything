import fs, { read } from "fs";
import path from "path";
import { DATA_DIR } from "../../constants.js";
import { getDB } from "../../index.js";
import { ObjectId } from "mongodb";



const BOOKS_FILE = path.join(DATA_DIR,"books.json");

export async function readBooks(){ 
    const db = await getDB();
    const data = await db.collection("books").find({}).toArray(); 
    return data;
}

export async function getBook(id) {
    const db = await getDB();
    const book = await db.collection("books").findOne({_id: new ObjectId(id)});
    return book;
}

//maybe TODO? query mongodb directly instead of getting to JS array
export async function getBookByKeyword(query){
    const db = await getDB();
    console.log(query);
    const data = await db.collection("books").find({$or:query}).toArray(); 
    return data;

}

export default async function checkIfCollectionExists(){
    let db = await getDB();
    let collections = await db.listCollections.toArray();
    console.log(collections);
}

export async function updateBook(id, name, author, description) {
    const db = await getDB();
    
    const result = await db.collection("books").updateOne(
        {_id: new ObjectId(id)},
        {$set: {name:name, author:author, body:description}}
    );

    return result.modifiedCount;
}

export async function incrementLikes(_id, amount) {
    const db = await connectDB();

    const result = await db.collection("books").updateOne(
        {_id: _id},
        {$inc: {votes: amount}}
    );

    return result.updatedId;
}

export async function incrementDownloads(_id) {
    const db = await connectDB();

    const result = await db.collection("books").updateOne(
        {_id: _id},
        {$inc: {downloads: 1}}
    );

    return result.updatedId;
}