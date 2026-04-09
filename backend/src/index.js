import {bookRoutes} from "./modules/books/books.routes.js";
import { authRoutes } from "./modules/auth/auth.routes.js";
import { registrationRoutes } from "./modules/registration/registration.routes.js";

import express from 'express';
import cors from 'cors';
import { connectDB } from "./db_connection.js";

export function createApp(){
  const app = express();
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

  //Login route
  app.use("/auth", authRoutes);

  //Register route
  app.use("/registration", registrationRoutes);

  //fallback path
  app.get('/*path', (req, res) => {
    res.status(404).send('Page Not Found');
  });

  return app;
}

//If not testing, starts the server in prod mode.
if(process.env.NODE_ENV !== 'test'){
  const port = process.env.PORT || 3000;
  (async () => {
    await connectDB();
    const app = createApp();
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })();
}





