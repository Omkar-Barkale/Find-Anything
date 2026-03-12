import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ // Vite dev URL
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("/Login", cors());

// Middleware to parse JSON
app.use(express.json());

app.post("/Login", (req,res)=>{
    console.log("HIT /Login", req.body);
    const email = req.body.email;
    const password = req.body.password;


    console.log("Email: " + email);
    console.log("Password: " + password);
    res.json({email: email,
            password: password
    } );
    
});

app.listen(3001, ()=>{
    console.log("Server running on port 3001");
});