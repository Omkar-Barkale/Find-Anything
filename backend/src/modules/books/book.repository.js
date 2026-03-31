import fs, { read } from "fs";
import path from "path";
import { DATA_DIR } from "../../constants.js";
import { getDB } from "../../index.js";



const BOOKS_FILE = path.join(DATA_DIR,"books.json");

export async function readBooks(){ 
    const db = await getDB();
    const data = await db.collection("books").find({}).toArray(); 
    return data;
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

export async function updateBooks(_id, name, author, description) {
    const db = await connectDB();
    
    const result = await db.collection("books").updateOne(
        {_id: _id},
        {$set: {name: name, author:author, description:description}}
    );

    return result.updatedId;
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