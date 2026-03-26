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


//maybe TODO? query mongodb directly instead of getting to JS array
export async function getBookByKeyword(query){
    const db = await connectDB();
    const data = await db.collection("books").find({}).toArray(); 
    const safeQuery = query.toLowerCase();
    console.log("Getting specific books from MongoDB");
    const queryReturn = data.filter((book,index,data)=>{
        console.log(book.name+ " vs " + query);
        return(book.name.toLowerCase().includes(safeQuery)||book.author.toLowerCase().includes(safeQuery))
    });
    return queryReturn;
}

export async function deleteBooks(book){
    const db = await connectDB();

    const safeQuery = Object.fromEntries(
        Object.entries(book).filter(([_, value]) => value !== 'null' && value !== null)
    );

    let result;
    if(!multiple){
        result = await db.collection("deletebooks").deleteOne(safeQuery);
    }else{
        result = await db.collection("deletebooks").deleteMany(safeQuery);
    }

    if(result.deletedCount > 0 && result.acknowledged){
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