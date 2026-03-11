import { Router } from "express";
import * as tweetController from "./tweet.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

export const tweetRoutes: Router = Router();

tweetRoutes.get("/", tweetController.getAll);
tweetRoutes.post("/", authMiddleware, tweetController.create);
tweetRoutes.patch("/:id", authMiddleware, tweetController.update);
tweetRoutes.delete("/:id", authMiddleware, tweetController.remove);
