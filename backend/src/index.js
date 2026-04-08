import {bookRoutes} from "./modules/books/books.routes.js";
import { authRoutes } from "./modules/auth/auth.routes.js";
import { registrationRoutes } from "./modules/registration/registration.routes.js";

import express from 'express';
import cors from 'cors';
import { connectDB } from "./db_connection.js";


const app = express();
const port = 3000; //This should be in .env


try {
  await connectDB();
  console.log('Database connected, starting server');
} catch (err) {
  console.error('Failed to connect to DB during startup:', err);
  process.exit(1);
}

// Simple request logger to help debug incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

app.use(cors({ 
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));



app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!');
});

//Books route
app.use("/search",bookRoutes);

//Book modal
app.use("/books", bookRoutes);

//Login route
app.use("/auth", authRoutes);

//Register route
 app.use("/registration", registrationRoutes);

//fallback path
app.get('/*path', (req, res) => {
  res.status(404).send('Page Not Found');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});





