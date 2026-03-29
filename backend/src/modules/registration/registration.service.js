import * as registrationRepo from "./registration.repository.js";


export async function createAccount(email, username, password, imgBuffer)
{
        return await registrationRepo.createAccount(email, username, password, imgBuffer);
}