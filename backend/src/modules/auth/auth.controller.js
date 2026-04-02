import * as userServices from "./auth.services.js";
import {log} from '../../middleware/logging.middleware.js';

async function getAllUsers(req, res){
    await log("getAllUSers in auth.controller was called");
    res.status(200);
    console.log("Running User Controller : all");
    const data = await userServices.getAllUsers()
    res.json(data);
}

async function getUserByEmail(req, res){
    await log("getUserByEmail() in auth.controller was called");
    res.status(200);
    let user = await userServices.getUserByEmail(req.body.email);
    if(user !== null){
        res.status(200);
        res.json(user);
    }else{
        res.status(404);

    }
      console.log("response body: " + user);
}

async function deleteUsers(req, res){
    await log("deleteUsers() in auth.controller was called");
    const {id} = req.params;
    const response = await userServices.deleteUsers(id);
    if(response){
        res.status(200);
        res.send();
    }
    else{
        res.status(404);
        res.json({
            error: "Could not delete any users"
        });
    }
    
}




export {getAllUsers, getUserByEmail, deleteUsers};