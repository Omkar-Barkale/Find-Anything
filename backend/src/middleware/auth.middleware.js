export function authMiddleware(req,res,next){


    console.log("Running book middleware");

    if(req.body.email === "email"){
        console.log("email is good");
    }
    else{
        console.log("email is bad");
    }

    if(req.body.password === "1234"){
        console.log("password is good");
    }
    else{
        console.log("passowrd is bad");
    }
    

    //console.log("type : " + typeof req.body.email );
    console.log("email: " + req.body.email + "  Password: " + req.body.password);

    next();
}