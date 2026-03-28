import * as userServices from "./auth.services.js";

async function getAllUsers(req, res){
    res.status(200);
    console.log("Running User Controller");
    const data = await userServices.getAllUsers()
    res.json(data);
}

async function getUserByEmail(req, res){
    res.status(200);
    console.log("Running User Controller");
    console.log("email in controller: "+ req.body.email);
    let user = await userServices.getUserByEmail(req.body.email);
    if(user !== null){
        res.status(200);
        res.json(user);
    }else{
        res.status(404);
        res.json({
            error: "Incorrect Email or Password"
        });
    }
      console.log("response body: " + user);
}

async function deleteUsers(req, res){
    const response = await userServices.deleteUsers(req.body);
    if(response){
        res.status(200);
        res.send();
    }
    else{
        res.status(404);
        res.send();
    }
}




export {getAllUsers, getUserByEmail, deleteUsers};