import * as userServices from "./auth.services.js";

async function getAllUsers(req, res){
    res.status(200);
    console.log("Running User Controller");
    res.json(userServices.getAllUsers());
    console.log(userServices.getAllUsers());
    res.send();
}

async function getUserByEmail(req, res){
    res.status(200);
    console.log("Rnning User Controller");
    console.log("email in contoller: "+ req.body.email);
    let user = userServices.getUserByEmail(req.body.email);
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
    

    res.send();
}

function deleteUsers(req, res){
    const response = userServices.deleteUsers(req.body);
    if(response){
        res.status(200);
    }
    else{
        res.status(404);
    }
}

export {getAllUsers, getUserByEmail, deleteUsers};