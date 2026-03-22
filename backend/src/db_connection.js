import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI);
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

export async function connectDB()
{
  try {
    await client.connect();
    console.log("Connected successfully");

    const db = client.db("find-anything");
    //await db.createCollection("books");
//     db.collection("books").insertMany( //Initial testing of storing
//    [
//   {
//     name: "The Great Gatsby",
//     author: "F. Scott Fitzgerald",
//     cover: "./pictures/The Great Gatsby.jpg",
//     body: "A story of wealth and tragedy."
//   },
//   {
//     name: "To Kill a Mockingbird",
//     author: "Harper Lee",
//     cover: "./pictures/To Kill a Mockingbird.jpg",
//     body: "A tale of justice and morality."
//   },
//   {
//     name: "1984",
//     author: "George Orwell",
//     cover: "./pictures/1984.jpg",
//     body: "Dystopian government surveillance."
//   },
//   {
//     name: "Animal Farm",
//     author: "George Orwell",
//     cover: "./pictures/Animal Farm.jpg",
//     body: "Allegory of political corruption."
//   },
//   {
//     name: "Frankenstein",
//     author: "Mary Shelley",
//     cover: "./pictures/Frankenstein.jpg",
//     body: "A scientist's dangerous creation."
//   },
//   {
//     name: "A Court of Thorns and Roses",
//     author: "Sarah J. Maas",
//     cover: "./pictures/A Court of Thorns and Roses.jpg",
//     body: "Feyre's dark faerie adventure."
//   },
//   {
//     name: "A Tale of Two Cities",
//     author: "Charles Dickens",
//     cover: "./pictures/A Tale of Two Cities.jpg",
//     body: "Revolution and redemption in France."
//   },
//   {
//     name: "The Hobbit",
//     author: "J. R. R. Tolkien",
//     cover: "./pictures/The Hobbit.jpg",
//     body: "Bilbo's epic unexpected journey."
//   },
//   {
//     name: "Charlotte's Web",
//     author: "E. B. White",
//     cover: "./pictures/Charlotte's Web.png",
//     body: "Friendship between pig and spider."
//   },
//   {
//     name: "The Da Vinci Code",
//     author: "Dan Brown",
//     cover: "./pictures/The Da Vinci Code.jpg",
//     body: "A thrilling quest for secrets."
//   }
// ])

      return db; //return db so others can use the db connection
    } 
    catch (err) {
      console.error("Connection error:", err);
    } 
}

//connectDB();

