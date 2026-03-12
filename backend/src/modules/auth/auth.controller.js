import * as userServices from "./auth.services.js";

async function getAllUsers(req, res){
    res.status(200);
    console.log("Running User Controller");
    res.json(userServices.getAllUsers());
    console.log(res);
    res.send();
}

async function getUserByEmail(){
    res.status(200);
    console.log("Rnning User Controller");
    res.json(userServices.getUserByEmail(req.body.email));
    console.log(res);
    res.send();
}

export {getAllUsers, getUserByEmail};