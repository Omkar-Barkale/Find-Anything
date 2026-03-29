import fs from 'fs';
import path from 'path';
import { DATA_DIR } from "../../constants.js";
import {connectDB} from "../../db_connection.js"
import { ObjectId } from 'mongodb';
import {log} from '../../middleware/logging.middleware.js';

const users_file = path.join(DATA_DIR, "test_users.json");

async function getUser(user){
    await log("User " + user + " was gotten");
    const db = await connectDB();
    const data = await db.collection('users').find(user).toArray();
    return data;
}

async function getAllUsers(){
    await log("all users was gotten");
    
    const db = await connectDB();
    const data = await db.collection("users").find().toArray();
    return data;
}

async function deleteUsers(id){
    await log("User " + id + " was deleted");
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