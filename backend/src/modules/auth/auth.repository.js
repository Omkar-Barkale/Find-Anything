import fs from 'fs';
import path from 'path';
import { DATA_DIR } from "../../constants.js";
import {connectDB} from "../../db_connection.js"
import { ObjectId } from 'mongodb';

const users_file = path.join(DATA_DIR, "test_users.json");

async function getUser({username}){
    const db = await connectDB();
    const data = await db.collection('users').find({username}).toArray();
    return data;
}

async function getAllUsers(){
    
    const db = await connectDB();
    const data = await db.collection("users").find().toArray();
    return data;
}

async function deleteUsers(id){
    const db = await connectDB();
    const result = await db.collection("users").deleteOne({_id : new ObjectId(id)});
    console.log(id);
    if(result.acknowledged){
        console.log("Number of users deleted: " + result.deletedCount);
        return true;
    }else{
        console.log("Could not delete any users check attributes");
        return false;
    }
}


export {getAllUsers, getUser, deleteUsers};