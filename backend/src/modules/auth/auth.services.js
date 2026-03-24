import * as userRepo from "./auth.repository.js"

function getAllUsers(){
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

export {getAllUsers, getUserByEmail}