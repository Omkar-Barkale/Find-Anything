import fs, { read } from "fs";
import path from "path";
import { DATA_DIR } from "../../constants.js";
import {connectDB} from '../../db_connection.js'
const BOOKS_FILE = path.join(DATA_DIR,"books.json");

export async function readBooks(){ //convert json formatted string to usable JS obj
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

//OLD METHOD, just kept incase but should be fine to remove
// export function getBookByKeyword(query){
//     const data = readBooks();
//     const safeQuery = query.toLowerCase();
//     console.log("Getting specific books");
//     const queryReturn = data.filter((book,index,data)=>{
//         console.log(book.name+ " vs. " + query);
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