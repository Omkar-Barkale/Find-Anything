import jwt from 'jsonwebtoken';
import { getUser, getUserById } from '../modules/auth/auth.repository.js';
import bcrypt from 'bcrypt'


const regex_password = /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{9,17}$/;;


export async function authenticate(req,res,next){

    console.log("Running authenticate");
    // console.log(req.headers)
    const token = req.headers['authorization']?.split(' ')[1]; //get auth header, '?' is a safety  operation, if auth is missing the server does not crash 
                                                                // .split seperates 'bearer and 'token' and [1] is the token value after the split
    // if token is null send error json
    if(!token){
        console.log("no token");
        return res.status(403).json(
            {
            error: "Invalid Token"
            }
        );
    } 
 
    // try to verify token is good call the controller functions
    try{
        const decoded = jwt.verify(token, process.env.jwt_secret);
        req.user = decoded; //create a user json object in the request
        
        if(req.user.role === "admin" || req.user.role === "user"){
            
            next();
        }else
        {
            
            res.status(403).json({
                error: "Not logged in"
            });
        }
       
    }
    catch(err){ // if token is bad send invalid token error
        return res.status(403).json(
            {
            error: "Invalid Token"
            }
        );
    }
    console.log("authenticate ran successfully");
}

export async function authenticateAdmin(req, res, next){


    //only use after authenticate was used as authenticateAdmin does not verify the token
    if(req.user.role === "admin"){
       
        next();
    }
    else{
        await log(req.user.username, req.user.email, "Tried to loggi " + new Date().toLocaleString());
        res.status(403).json({
            error: "Not authorized admin"
        });

    }
}

export async function authenticateUser(req, res, next){
    //only checks that the user id matches the request user id

    try{
        const {id} = req.params;
        const user = getUserById(id);
        if(id === user._id || req.user.role === "admin"){
            next();
        }else{
            res.status(403).json({
                error: "Not authorized user"
            });
        }
        
    }catch(err){
        console.log(err.message);
    }
}

export async function authenticateUserUpdate(req, res, next){
    const id = req.body.formData.userId;
    if(req.user._id === id || req.user.role === "admin"){
        next();
    }else{
        res.status(403).json({
                error: "Not authorized: logged in as other user"
            });
    }


}

export async function sendToken(req, res, next){

    const jwt_secret = process.env.jwt_secret;
    const username = req.body.username;
    const password = req.body.password;
    let db_return;

    if(username && regex_password.test(password))
    {
        db_return = await getUser({username});
    }
    else
    {
        return res.status(401).json({
            error: "Badly formated password or username"
        });
    }

    const user = db_return[0];

    if(!user)
        return res.status(400).json({error: "Incorrect username"});


    if(await bcrypt.compare(password, user.password)){ // if user is non null and passwords match
        
        const {_id, email, username, password, avatar, role} = user;
        const payload = {_id, email, username, role, password};
        const token = jwt.sign( 
            payload, //payload id, email, password and role
            jwt_secret, // key
            {
                expiresIn: '24h' //payload
            }
        );

        return res.json({ //response body 
            token: token,
            message: "Login Successful"
        });

    }
    else{
        return res.status(401).json({
            error: "Incorrect Password"
        })
    }

}








