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
        res.json(user);
    }else{
        res.json({
            error: "Incorrect Email or Password"
        });
    }
      console.log("response body: " + user);
    

    res.send();
}

export {getAllUsers, getUserByEmail};