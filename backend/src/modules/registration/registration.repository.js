import fs, { read } from "fs";
import path from "path";
import {connectDB} from '../../db_connection.js'


//username
//email
//password
//role
//_id


async function createAccount(){
    let db = await connectDB();
    db.collections("users").insertOne(
        

    );
}

function readAccount(){

}

function updateAccount(){

}

function deleteAccount(){

}