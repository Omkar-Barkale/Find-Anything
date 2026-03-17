import {MongoClient} from 'mongodb';
import dotenv from 'dotenv';  


async function runGetStarted() {
  // Replace the uri string with your connection string
dotenv.config();
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    const database = client.db('Testing');
    const movies = database.collection('employees');

    // Queries for a movie that has a title value of 'Back to the Future'
    const query = { eno: 101 };
    const movie = await movies.findOne(query);
    console.log(movie);
  } finally {
    await client.close();
  }
}
runGetStarted().catch(console.dir);
