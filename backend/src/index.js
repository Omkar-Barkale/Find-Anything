import {bookRoutes} from "./modules/books/books.routes.js";
import express from "express"

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


//Books route
app.use("/api/books",bookRoutes);

app.get('/*path', (req, res) => {
  res.status(404).send('Page Not Found');
});