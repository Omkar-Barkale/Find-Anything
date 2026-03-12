import fs from "fs";
import path from "path";

const path = './src/data/books.json';
function readBooks()
{
    const data = fs.readFileSync(path, "utf-8");
    return JSON.parse(data)
}

export function findAllBooks()
{
    return readBooks();
}