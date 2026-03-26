import {bookRoutes} from "./modules/books/books.routes.js";
import { authRoutes } from "./modules/auth/auth.routes.js";
import express from 'express';
import cors from 'cors';


//IMPORTANT : NEED TO RUN THIS IN THE BACKEND FOLDER NOT SRC AND RUN VIA node src/index.js since we are using .env file for the MONGO connection,
//TLDR: basically do not run node index.js, do node src/index.js from backend folder

const app = express();
const port = 3000;

app.use(cors({ 
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

//Books route
app.use("/search",bookRoutes);

//Login route
app.use("/auth", authRoutes);

//fallback path
app.get('/*path', (req, res) => {
  res.status(404).send('Page Not Found');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});





