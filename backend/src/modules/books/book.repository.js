import fs, { read } from "fs";
import path from "path";
import { DATA_DIR } from "../../constants.js";
const BOOKS_FILE = path.join(DATA_DIR,"books.json");

export function readBooks(){
    return JSON.parse(fs.readFileSync(BOOKS_FILE, "utf-8"));
}

export function getBookByKeyword(query){
    const data = readBooks();
    console.log("Getting specific books");
    const queryReturn = data.filter((book,index,data)=>{
        console.log(book.name+" vs. " + query);
        return(book.name.toLowerCase().includes(query)||book.id.toString().includes(query)||book.author.toLowerCase().includes(query))
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