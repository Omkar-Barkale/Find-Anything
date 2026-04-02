import {connectDB} from '../../db_connection.js'

export async function createAccount(email, username, password, imgBuffer){
    let db = await connectDB();

    const isExistingName = await db.collection("users").findOne({username: username}); //findOne returns a document instead of cursor, if none then null

    if(isExistingName)
        throw new Error("Username already taken");


    const result = await db.collection("users").insertOne({
        email: email,
        username: username,
        password: password,
        avatar: imgBuffer,
        role: "user"
    });

    return result.insertedId; //returns mongodb _id
}


function updateAccount(){

}

function deleteAccount(){

}