import fs from 'fs';
import path from 'path';
import { DATA_DIR } from "../../constants.js";
import {connectDB} from "../../db_connection.js"
import { ObjectId } from 'mongodb';

const users_file = path.join(DATA_DIR, "test_users.json");

async function getUser({username}){
    const db = await connectDB();
    const data = await db.collection('users').find({username}).toArray();
    //console.log(data);
    return data;
}

async function getUserById(id){
    const db = await connectDB();
    const data = await db.collection('users').find({_id : new ObjectId(id)}).toArray();
    if(data.length === 0)
        throw new Error("No user found with that id");
    return data[0];
}

async function getAllUsers(){
    // console.log("running repo get all users");
    const db = await connectDB();
    const data = await db.collection("users").find().toArray();
    return data;
}

async function deleteUsers(id){
    const db = await connectDB();
    const result = await db.collection("users").deleteOne({_id : new ObjectId(id)});
    console.log(id);
    if(result.acknowledged){
        console.log("Number of users deleted: " + result.deletedCount);
        return true;
    }else{
        console.log("Could not delete any users check attributes");
        return false;
    }
}

async function updateUser(id, email, username, password, avatarBuffer, avatarType){
    const db = await connectDB();
    let currentUser = await getUserById(id);
    let trueEmail = email? email : currentUser.email;
    let trueUsername = username? username : currentUser.username;
    let truePassword = password? password: currentUser.password;
    let trueAvatarBuffer = avatarBuffer? avatarBuffer : currentUser.avatar;
    let trueAvatarType = avatarType? avatarType: currentUser.avatarType;
    

    let userExists = await getUser({username});
    userExists = userExists.filter(user => user._id.toString() !== id);
    if(userExists.length > 0)
        throw new Error("Username taken already");


    const setObj = {
            email: trueEmail,
            username: trueUsername,
            password: truePassword,
            avatar: trueAvatarBuffer,
            avatarType: trueAvatarType
    };

    const data = await db.collection("users").updateOne
    (
        {_id : new ObjectId(id)},
        {$set: setObj}
    );

    console.log("Updating user with id:", id);

    return id;
}

async function getLogs(type){
    const db = await connectDB();
    const logs = await db.collection('Logs').find({
        $or:[ 
            {log: {$regex: type, $options: 'i'}}, 
            {username: {$regex: type, $options: 'i'}}]
    }).toArray();

    if(!logs){
        console.log("repo could not access logs");
        return null;
    }
    return logs;
}

async function getAllLogs(){
    const db = await connectDB();
    const logs = await db.collection('Logs').find({}).toArray();
    if(!logs){
        console.log("repo could not access logs");
        return null;
    }
    return logs;
}

async function banUser(id){
    const db = await connectDB();
    const result = await db.collection("users").updateOne(
        {_id : new ObjectId(id)},
        {$set: {role: "banned"}}
    );
    if(result.acknowledged){
        console.log("User banned successfully");
        return true;
    }else{
        console.log("Failed to ban user");
        return false;
    }
}

async function unbanUser(id){
    const db = await connectDB();
    const result = await db.collection("users").updateOne(
        {_id : new ObjectId(id)},
        {$set: {role: "user"}}
    );
    if(result.acknowledged){
        console.log("User unbanned successfully");
        return true;
    }else{
        console.log("Failed to unban user");
        return false;
    }
}

export {getAllUsers, getUser,getUserById,deleteUsers, updateUser, getLogs, getAllLogs, banUser, unbanUser};