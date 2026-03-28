import jwt from 'jsonwebtoken';
import { getUser } from '../modules/auth/auth.repository.js';

const regex_email = /^(.+)@([^\.].*)\.([a-z]{2,})$/;
const regex_password = /^[a-zA-Z]\w{8,16}$/;

function invalidToken(res){ //helper function
    console.log("token is bad");
    return res.status(403).json(
            {
            error: "Invalid Token"
            }
        );
}//dont use causes dublicate requests to be sent (too lazy to delete)

export function authMiddleware(req,res,next){

    console.log("Running Auth middleware");

    const token = req.headers['authorization']?.split(' ')[1]; //get auth header, '?' is a safety  operation, if auth is missing the server does not crash 
                                                                // .split seperates 'bearer and 'token' and [1] is the token value after the split
    // if token is null send error json
    if(!token){
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
        console.log("token is good");
        next();
       
    }catch(err){ // if token is bad send invalid token error
        return res.status(403).json(
            {
            error: "Invalid Token"
            }
        );
    }

}

export async function sendToken(req, res, next){

    const jwt_secret = process.env.jwt_secret;
    const {email, password} = req.body;
    let db_return;

    if(regex_email.test(email) && regex_password.test(password))
    {
        db_return = await getUser(req.body); //im going to drop kick a child '[]' has precedence over the 'await'
    }
    else
        {
            console.log("Badly formated password or email");
        return res.status(400).json({
            error: "Badly formated password or email"
        })
    }

    const user = db_return[0];

    if(user && password === String(user.password)){ // if user is non null and passwords match
        
        const token = jwt.sign( 
            user, //payload email, password and role
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
            error: "Incorrect Email or Password"
        })
    }

}



