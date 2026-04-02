
import path from "path";
import { DATA_DIR } from "../../constants.js";
import {connectDB} from '../../db_connection.js'
import {log} from '../../middleware/logging.middleware.js';



const BOOKS_FILE = path.join(DATA_DIR,"books.json");

export async function readBooks(){ 
    await log("readBooks() in book.repository was called");
    const db = await connectDB();
    const data = await db.collection("books").find({}).toArray(); 
    return data;
}


export async function getBookByKeyword(query){
    const db = await connectDB();
    console.log(query);
    const data = await db.collection("books").find({$or:query}).toArray(); 
    return data;

}

export async function createBook(book){
    console.log("Creating book in repository...");
    const db = await connectDB();
    await db.collection("books").insertOne(book);
    console.log("Book created successfully");
}

export default async function checkIfCollectionExists(){
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




