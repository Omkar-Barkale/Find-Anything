
export function bookMiddleware(req,res,next){

    if(req.body.email === "email" && req.body.password === "1234"){
         console.log("email and password are a match");
    }
    else{
        console.log("email and password do not match");
    }
    next();
}