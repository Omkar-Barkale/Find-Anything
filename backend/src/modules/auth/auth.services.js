import * as userRepo from "./auth.repository.js"

function getAllUsers(){
    const users = userRepo.getAllUsers();
    return users;
}

function getUserByEmail(email){
    return userRepo.getUserByEmail(email);
}

export {getAllUsers, getUserByEmail}