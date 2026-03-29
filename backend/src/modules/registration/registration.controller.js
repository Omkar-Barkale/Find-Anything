import * as registrationService from "./registration.service.js"
import {log} from '../../middleware/logging.middleware.js';

export async function createAccount(req, res)
{
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    await log("User : " + email + " tried to register");
    const account = await registrationService.createAccount(email, username, password);
    res.json(account);

}