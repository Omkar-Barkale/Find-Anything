import fs from "fs";
import path from "path";
import { DATA_DIR } from "../../constants.js";
const BOOKS_FILE = path.join(DATA_DIR,books.json);

function readBooks(){
    return JSON.parse(fs.readFileSync(BOOKS_FILE, "utf-8"));
}

function getBook(id){
    const data = readBooks();
    return data.find(obj => obj.id === id);

}
