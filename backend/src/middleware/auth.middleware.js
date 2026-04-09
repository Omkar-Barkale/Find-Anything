<<<<<<< HEAD
=======


>>>>>>> d938eab209c102810e3476dfb70c48c3ec82539e
export function authMiddleware(req,res,next){


    console.log("Running book middleware");
<<<<<<< HEAD

    if(req.body.email === "email"){
        console.log("email is good");
=======
    let email = false;
    let pass = false;
    if(req.body.email === "rares@gmail.com"){
        console.log("email is good");
        email = true;
>>>>>>> d938eab209c102810e3476dfb70c48c3ec82539e
    }
    else{
        console.log("email is bad");
    }

    if(req.body.password === "1234"){
        console.log("password is good");
<<<<<<< HEAD
=======
        pass = true;
>>>>>>> d938eab209c102810e3476dfb70c48c3ec82539e
    }
    else{
        console.log("passowrd is bad");
    }
    

<<<<<<< HEAD
    //console.log("type : " + typeof req.body.email );
    console.log("email: " + req.body.email + "  Password: " + req.body.password);

    next();
}
=======
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

>>>>>>> d938eab209c102810e3476dfb70c48c3ec82539e
