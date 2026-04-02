import fs, { read } from "fs";
import path from "path";
import { DATA_DIR } from "../../constants.js";
import {connectDB} from '../../db_connection.js'



const BOOKS_FILE = path.join(DATA_DIR,"books.json");

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


//TODO, need to adjust to use mongodb query directly, not a local array 
// export async function getBookByKeyword(query){
//     const db = await connectDB();
//     const data = await db.collection("books").find({}).toArray(); 
//     const safeQuery = query.toLowerCase();
//     console.log("Getting specific books from MongoDB");
//     const queryReturn = data.filter((book,index,data)=>{
//         console.log(book.name + " vs " + query);
//         return(book.name.toLowerCase().includes(safeQuery)||book.author.toLowerCase().includes(safeQuery))
//     });
//     return queryReturn;

// }

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