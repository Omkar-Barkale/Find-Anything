import {Request, Response} from "express";
import * as bookService from "./books.service";

export function getBook(req = Request, res = Response){
    const {id} = req.params.id;

    const book = bookService.getBook(id);
    res.json({data:user});
}