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

function deleteUsers(id){
    const response = userRepo.deleteUsers(id);
    return response;
}



export {getAllUsers, getUserByEmail, deleteUsers}