import fs, { read } from "fs";
import path from "path";
import {connectDB} from '../../db_connection.js'


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

    return result.insertedId; //return _id from mongodb
}

function readAccount(){

}

function updateAccount(){

}

function deleteAccount(){

}