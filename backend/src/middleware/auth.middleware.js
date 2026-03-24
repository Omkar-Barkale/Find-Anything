import jwt from 'jsonwebtoken';
//import * as userController from "./auth.controller.js"
import { getUser } from '../modules/auth/auth.repository.js';
//authRoutes.post('/', authMiddleware, userController.getUserByEmail);


export function authMiddleware(req,res,next){

    console.log("Running book middleware");

    const token = req.headers['authorization']?.split(' ')[1]; //get auth header, '?' is a safety  operation, if auth is missing the server does not crash 
                                                                // .split seperates 'auth and 'token' and [1] is the token value after the split
    // if token is null send error json
    if(!token){
        res.status(401).json(
            {
            error: "Incorrect Email or Password. Try Again"
            }
        );
    } 
 
    // try to verify token is good call the controller functions
    try{
        const decoded = jwt.verify(token, process.env.jwt_secret);
        req.user = decoded;
        next();
    }catch(err){ // if token is bad send invalid token error
        return res.status(401).json(
            {
                erorr: "Invalid Token"
            }
        );
    }

}

export async function sendToken(req, res, next){

    const jwt_secret = process.env.jwt_secret;
    const {email, password} = req.body 

    const db_return = await getUser(req.body); //im going to drop kick a child '[]' has precedence over the 'await'
    const user = db_return[0];

    if(user && password === String(user.password)){ // if user is non null and passwords match
        
        const token = jwt.sign(user, jwt_secret, {//header
            expiresIn: '24h'
        });

        res.json({ //payload 
            token: token,
            message: "Login Successful"
        });

    }
    else{
        res.status(401).json({
            error: "Incorrect Email or Password"
        })
    }

}



