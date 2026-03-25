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

export {getAllUsers, getUser};