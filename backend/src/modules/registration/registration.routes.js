import {Router} from "express";
import * as registrationController from "./registration.controller.js";
export const registrationRoutes = Router();

registrationRoutes.post('/', registrationController.createAccount);
