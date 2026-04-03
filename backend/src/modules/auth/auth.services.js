import * as userRepo from "./auth.repository.js"

function getAllUsers(){
    console.log("running services : all");
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



export {getAllUsers, getUserByEmail, getUserById, deleteUsers}