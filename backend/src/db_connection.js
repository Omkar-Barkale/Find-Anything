import { MongoClient } from "mongodb";
// import dotenv from "dotenv";
// dotenv.config();

let client;
let db;

export async function connectDB()
{
  try {
      if(!db) {
          const uri = process.env.MONGO_URI;
          if(!uri) throw new Error('MONGO_URI must be set to connect to database');
          client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
          await client.connect();
          console.log("Connected successfully to", uri);
          db = client.db(process.env.MONGO_DB_NAME || "find-anything");
      }
      return db;
    }
    catch (err) {
      console.error("Connection error:", err);
      throw err;
    }
}

export async function closeDB(){
  try{
    if(client){
      await client.close();
    }
  }catch(e){
    console.error('Error closing DB', e);
  } finally{
    client = null;
    db = null;
  }
}







