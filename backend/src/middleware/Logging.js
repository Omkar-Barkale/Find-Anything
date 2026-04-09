import {connectDB} from "../db_connection.js"


export async function log(req, res, next){
    const db = await connectDB();
    const email = req.user.email;
    const username = req.user.username;
    const time = new Date().toLocaleString();

    let text = "";
    // console.log(req.route.path);
    switch(req.route.path){
        case '/delete/:id':
            if(req.baseUrl === "auth"){
                text = "User " + username + " deleted user: " + req.params.id;
            }else{
                text = "User " + username + " deleted post: " + req.params.id;
            }
            break;
        case '/users':
            text = "All users were extracted from database";
            break;
        case '/users/:id':
            text = "User " + req.params.id + " was extracted from the database";
            break;
        case '/users/update':
            text = "User " + req.user.username + " updated their profile"
            break;
        case '/create':
            text = "User " + username + " create a new post";
            break;
        case '/update/:id':
            text = "User " + username + " updated post: " + req.params.id;
            break;
        default:
            text = req.route.path;
    }

    

    db.collection("Logs").insertOne({
        email: email,
        username: username,
        time: time,
        log: text
    });

    next();
}

