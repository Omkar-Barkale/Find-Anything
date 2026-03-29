import * as registrationService from "./registration.service.js"
import bcrypt from 'bcrypt';


export async function createAccount(req, res)
{
    try{
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(password, 10);
        const imgBuffer = req.file ? req.file.buffer : null; //safety check added

        const account = await registrationService.createAccount(email, username, hashedPassword, imgBuffer);
        res.status(201).json({ id: account });    //mongodb id
    }
    catch(err){
        res.status(400).json({ message: err.message });
    }

}