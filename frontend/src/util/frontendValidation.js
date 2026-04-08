export const emailRegex = /^(.+)@([^\.].*)\.([a-z]{2,})$/;
export const passwordRegex = /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{9,17}$/;

export function validateEmail(email) {
    if (!email) 
        return "Enter an email";

    if (!emailRegex.test(email)) 
        return "Enter a valid email";

    return "";
}

export function validateUsername(username) {
    if (!username) 
        return "Enter a username";

    return "";
}

export function validatePassword(password) {
    if(password == "") //if no input password then its fine
        return ""

    if (!passwordRegex.test(password))
        return "Password must be 9–17 characters long";

    return "";
}

export function validateConfirmPassword(password, confirmPassword) {

    if (password != "" && !confirmPassword) 
        return "Confirm your password";

    if (password !== confirmPassword) 
        return "Passwords do not match";

    return "";
}



