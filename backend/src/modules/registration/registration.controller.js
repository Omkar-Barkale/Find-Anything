import * as registrationService from "./registration.service.js"
import bcrypt from 'bcrypt';




export async function createAccount(req, res)
{
    try{
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;  
        const password_regex = /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{9,17}$/;
        const email_regex = /^(.+)@([^\.].*)\.([a-z]{2,})$/;

        if(!email_regex.test(email))
            throw new Error("Invalid email format");

        if(!password_regex.test(password))
            throw new Error("Invalid password format");

        if(confirmPassword !== password)
            throw new Error("Passwords do not match");

        const hashedPassword = await bcrypt.hash(password, 10);

        if(!req.file)
            throw new Error("Image error");

        const maxImageSize = 1024 * 1024; 
        const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

        if(!allowedTypes.includes(req.file.mimetype))
            throw new Error("Avatar must be a PNG or JPEG image");

        if(req.file.size > maxImageSize)
            throw new Error("Avatar image must be 1MB or smaller");

        const imgBuffer = req.file.buffer;
        const imgType = req.file.mimetype;

        const account = await registrationService.createAccount(email, username, hashedPassword, imgBuffer, imgType);
        res.status(201).json({ id: account });    //mongodb id
    }
    catch(err){
        res.status(400).json({ message: err.message });
    }

}