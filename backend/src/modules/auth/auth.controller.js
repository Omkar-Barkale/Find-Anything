import * as userServices from "./auth.services.js";
import bcrypt from 'bcrypt';

async function getAllUsers(req, res){
    res.status(200);
    // console.log("Running User Controller : all");
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

async function updateUser(req, res){

    try{
        const id = req.body.id;
        const email = req.body.email;
        const username = req.body.username;
        let password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        const password_regex = /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{9,17}$/;
        const email_regex = /^(.+)@([^\.].*)\.([a-z]{2,})$/;

        if(!email_regex.test(email))
            throw new Error("Invalid email format");

        if(password !== "" && !password_regex.test(password))
            throw new Error("Invalid password format");

        if(confirmPassword !== password)
            throw new Error("Passwords do not match");

        if(password)
            password = await bcrypt.hash(password, 10);
        const imgBuffer = req.file ? req.file.buffer : null;
        const imgType = req.file ? req.file.mimetype : null;

        let updatedUser = await userServices.updateUser(id, email,username,password, imgBuffer, imgType);
                
        res.status(200).json({message: "Update successful", user: updatedUser});   
    }
    catch(err){
        res.status(400).json({message: err.message });
    }
 
}

async function getLogs(req, res){
    console.log("got to logs");
    try{
        const {type} = req.params

        const data = await userServices.getLogs(type);
        if(!data){
            console.log("did not get any logs");
            res.status(400).json({error: "No Logs found"});
        }
        console.log("gotten logs");
        res.status(200).json(data);

    }catch(err){
        res.status(400).json({error: err.message });
    }
}

async function getAllLogs(req, res){
    try{
        const data = await userServices.getAllLogs();
        if(!data){
            console.log("did not get any logs");
            res.status(400).json({error: "No Logs found"});
        }
        console.log("gotten logs");
        res.status(200).json(data);

    }catch(err){
        res.status(400).json({error: err.message });
    }
}




export {getAllUsers,getUserById,getUserByEmail, deleteUsers, updateUser, getLogs, getAllLogs};