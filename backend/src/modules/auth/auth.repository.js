import fs from 'fs';
import path from 'path';
import { DATA_DIR } from "../../constants.js";
const users_file = path.join(DATA_DIR, "test_users.json");

function getUserByEmail(email){
    const allUsers = getAllUsers();
    return allUsers.find(user => user.email === email );
}

function getAllUsers(){
    return JSON.parse(fs.readFileSync(users_file, 'utf-8'));
}

export {getAllUsers, getUserByEmail};