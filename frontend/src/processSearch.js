import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ // Vite dev URL
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("/search", cors());

// Middleware to parse JSON
app.use(express.json());

app.post("/search", (req,res)=>{
    console.log("HIT /search", req.body);
    const search = req.body.search;


    console.log(search);
    res.json({message: ("Response: " + search)});
    
});

app.listen(3000, ()=>{
    console.log("Server running on port 3000");
});