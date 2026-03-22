import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const uri = process.env.MONGO_URI;

async function run()
{
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("Connected successfully");

    const db = client.db("find-anything");
    await db.createCollection("books");

    console.log("Collection created!");

    await db.collection("books").insertOne(
    {
     name: "1984",
     author: "George Orwell",
     cover: "./pictures/1984.jpg",
     body : "Dystopian government surveillance."
    })


    } 
    catch (err) {
      console.error("Error:", err);
    } 
    finally {
      await client.close();
    } 
}

run();
