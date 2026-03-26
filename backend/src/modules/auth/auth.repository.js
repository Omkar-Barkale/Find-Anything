import fs from 'fs';
import path from 'path';
import { DATA_DIR } from "../../constants.js";
import {connectDB} from "../../db_connection.js"

const users_file = path.join(DATA_DIR, "test_users.json");

async function getUser(user){
    const db = await connectDB();
    const data = await db.collection('users').find(user).toArray();
    return data;
}

async function getAllUsers(){
    const db = await connectDB();
    const data = await db.collection("users").find().toArray();
    return data;
}

async function deleteUsers(user){
    const db = await connectDB();
    const regex = /^[a-zA-Z0-9_!?, '"()\$]+$/;

    const safeQuery = Object.fromEntries(
        Object.entries(user).filter(([_, value]) => value !== 'null' && value !== null && regex.test(String(value)) && value != null)
    );

    let result;
    if(!multiple){
        result = await db.collection("users").deleteOne(safeQuery);
    }else{
        result = await db.collection("users").deleteMany(safeQuery);
    }

    if(result.deletedCount > 0 && result.acknowledged){
        console.log("Number of users deleted: " + result.deletedCount);
        return true;
    }else{
        console.log("Could not delete any users check attributes");
        return false;
    }
}


export {getAllUsers, getUser, deleteUsers};