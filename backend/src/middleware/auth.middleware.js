

export function authMiddleware(req,res,next){


    console.log("Running book middleware");
    let email = false;
    let pass = false;
    if(req.body.email === "rares@gmail.com"){
        console.log("email is good");
        email = true;
    }
    else{
        console.log("email is bad");
    }

    if(req.body.password === "1234"){
        console.log("password is good");
        pass = true;
    }
    else{
        console.log("passowrd is bad");
    }
    

    if((email && pass)){
        console.log("email: " + req.body.email + "  Password: " + req.body.password);
        next();
    }
    else{
        res.json({
            error: "Incorrect Email or Password. Try Again"
        });
        res.send();
    }

}

