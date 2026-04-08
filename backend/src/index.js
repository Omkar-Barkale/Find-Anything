import {bookRoutes} from "./modules/books/books.routes.js";
import { authRoutes } from "./modules/auth/auth.routes.js";
import { registrationRoutes } from "./modules/registration/registration.routes.js";

import express from 'express';
import cors from 'cors';
import { connectDB } from "./db_connection.js";


const app = express();
const port = 3000; //This should be in .env
const db = connectDB();



app.use(cors({ 
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Simple request logger to help debug incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!');
});

//Books route
app.use("/search",bookRoutes);

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





