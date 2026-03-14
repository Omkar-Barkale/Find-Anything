import fs, { read } from "fs";
import path from "path";
import { DATA_DIR } from "../../constants.js";
const BOOKS_FILE = path.join(DATA_DIR,"books.json");

export function readBooks(){
    return JSON.parse(fs.readFileSync(BOOKS_FILE, "utf-8"));
}

export function getBookByKeyword(query){
    const data = readBooks();
    const safeQuery = query.toLowerCase();
    console.log("Getting specific books");
    const queryReturn = data.filter((book,index,data)=>{
        console.log(book.name+" vs. " + query);
        return(book.name.toLowerCase().includes(safeQuery)||book.id.toString().includes(safeQuery)||book.author.toLowerCase().includes(safeQuery))
    });
    return queryReturn;

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