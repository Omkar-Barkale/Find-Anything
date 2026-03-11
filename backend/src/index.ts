import express from "express";
import cors from "cors";
import { PORT } from "./constants.js";
import { authRoutes } from "./modules/auth/auth.routes.js";
import { tweetRoutes } from "./modules/tweet/tweet.routes.js";
import { errorHandler } from "./middleware/error-handler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tweets", tweetRoutes);

app.use(errorHandler);

app.listen(PORT, (): void => {
  console.log(`Server running on http://localhost:${PORT}`);
});
