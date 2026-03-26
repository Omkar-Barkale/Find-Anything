import fs, { read } from "fs";
import path from "path";
import {connectDB} from '../../db_connection.js'


//username
//email
//password
//role
//_id


async function createAccount(email, username, password){
    let db = await connectDB();
    
    const result = await db.collections("users").insertOne({
        email: email,
        username: username,
        password: password,
        role: "user"
    });

    return result.insertedId;
}

function readAccount(){

}

function updateAccount(){

}

function deleteAccount(){

}