import * as registrationRepo from "./registration.repository.js";


export async function createAccount(email, username, password)
{
    return await registrationRepo.createAccount(email, username, password);
}