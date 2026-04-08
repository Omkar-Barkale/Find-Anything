import fs, { read } from "fs";
import path from "path";
import { DATA_DIR } from "../../constants.js";
import {connectDB} from '../../db_connection.js'
import { ObjectId } from 'mongodb';



export async function readBooks(){ 
    const db = await connectDB();
    const data = await db.collection("books").find({}).toArray(); 
    return data;
}


export async function getBookByKeyword(query){
    const db = await connectDB();
    const data = await db.collection("books").find({$or: [
        {name: {$regex: query, $options: 'i'}},
        {author: {$regex: query, $options: 'i'}}
    ]}).toArray(); 

    console.log("Getting specific books from MongoDB");

    return data;
}

export async function createBook(book){
    console.log("Creating book in repository...");
    const db = await connectDB();
    const res = await db.collection("books").insertOne(book);
    console.log("Book created successfully", res.insertedId);
    return res;
}


export async function deleteBooks(id){
    console.log("deleteBooks repo ran id: " + id);

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
