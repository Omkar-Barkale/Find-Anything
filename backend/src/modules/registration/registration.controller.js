import * as registrationService from "./registration.service.js"


export async function createAccount(req, res)
{
    try{
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;
        const imgBuffer = req.file ? req.file.buffer : null; //safety check added

        const account = await registrationService.createAccount(email, username, password, imgBuffer);
        res.status(201).json({ id: account });    //mongodb id
    }
    catch(err){
        res.status(400).json({ message: err.message });
    }

}