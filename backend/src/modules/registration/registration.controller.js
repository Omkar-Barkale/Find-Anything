import * as registrationService from "./registration.service.js"


export async function createAccount(req, res)
{
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const imgBuffer = req.file.buffer;

    const account = await registrationService.createAccount(email, username, password, imgBuffer);
    res.json(account);

}