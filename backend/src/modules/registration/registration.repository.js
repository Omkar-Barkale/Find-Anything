import {connectDB} from '../../db_connection.js'


export async function createAccount(email, username, password, imgBuffer){
    let db = await connectDB();

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