import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI);
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);


let db;

export async function connectDB()
{
  try {
      if(!db) //prevent multiple connections, reuse same connection if it is already made
      {
          await client.connect();
          console.log("Connected successfully");
          db = client.db("find-anything");
      }
      return db; //return db so others can use the db connection
    } 
    catch (err) {
      console.error("Connection error:", err);
      throw err;
    } 
}








