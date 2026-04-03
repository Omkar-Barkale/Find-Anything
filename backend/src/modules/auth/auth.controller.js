import * as userServices from "./auth.services.js";

async function getAllUsers(req, res){
    res.status(200);
    console.log("Running User Controller : all");
    const data = await userServices.getAllUsers()
    res.json(data);
}

async function getUserById(req, res){
    const userId = req.params.id;
    console.log("User Id: " + userId);
    const user = await userServices.getUserById(userId);
    res.json(user);
}

async function getUserByEmail(req, res){
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




export {getAllUsers,getUserById,getUserByEmail, deleteUsers};