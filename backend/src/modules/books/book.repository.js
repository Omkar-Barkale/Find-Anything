import fs, { read } from "fs";
import path from "path";
import { DATA_DIR } from "../../constants.js";
const BOOKS_FILE = path.join(DATA_DIR,"books.json");

function readBooks(){
    return JSON.parse(fs.readFileSync(BOOKS_FILE, "utf-8"));
}

function getBookByKeyword(query){
    const data = readBooks();
    const queryReturn = data.filter((book,index,data)=>{
        return(book.name.include(query)||book.id.include(query)||book.author.include(query))
    });
    return queryReturn;
    
}

export {readBooks,getBookByKeyword};