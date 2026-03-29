import fs, { read } from "fs";
import path from "path";
import {connectDB} from '../../db_connection.js'
import {log} from '../../middleware/logging.middleware.js';

//username
//email
//password
//role
//_id


export async function createAccount(email, username, password){
    let db = await connectDB();
    
    const result = await db.collection("users").insertOne({
        email: email,
        username: username,
        password: password,
        role: "user"
    });
    await log("User : " + email + " successfully registered with username : " + username);
    return result.insertedId;
}

function readAccount(){

}

function updateAccount(){

}

function deleteAccount(){

}