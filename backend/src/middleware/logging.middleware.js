import fs from "fs/promises";


export async function log(data){
    
    const now = new Date();

    const entry = data + ("  |  Server Time : " + now.toISOString()) + "\n";
    
    try{
       await fs.appendFile('C:/Users/rares/Desktop/COSC 360/cosc-360/Find-Anything/backend/src/data/Logs.txt', entry);
    }catch(err){
        console.error("Could not write to Log file" + err.message);
    }
    return;
}

export async function getLogs(){
    //get return logs 

}