import express from "express";
import cors from "cors";
import { bookRoutes } from "../../backend/src/modules/books/books.routes.js";

const app = express();

app.use(cors({ 
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("/search", cors());

//middleware so that req.body is not undef
app.use(express.json());
app.use("/search", bookRoutes);

app.listen(3000, ()=>{
    console.log("Server running on port 3000");
});