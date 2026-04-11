import * as userRepo from "./auth.repository.js"

function getAllUsers(){
    // console.log("running services : all");
    const users = userRepo.getAllUsers();
    return users;
}

function getUserByEmail(email){
    
    let user = userRepo.getUser(email);
    if(user)
    {
        return user;
    }
    else
    {
        return null;
    }
}

function getUserById(id)
{
    return userRepo.getUserById(id);
}

function deleteUsers(id){
    return userRepo.deleteUsers(id);
}

async function updateUser(id, email, username, password, avatarBuffer, avatarType)
{
    return await userRepo.updateUser(id, email, username, password, avatarBuffer,avatarType);
}

async function getLogs(type){
    return await userRepo.getLogs(type);
}

async function getAllLogs(){
    return await userRepo.getAllLogs();
}

async function banUser(id){
    return await userRepo.banUser(id);
}

async function unbanUser(id){
    return await userRepo.unbanUser(id);
}

export {getAllUsers, getUserByEmail, getUserById, deleteUsers, updateUser, getLogs, getAllLogs, banUser, unbanUser};