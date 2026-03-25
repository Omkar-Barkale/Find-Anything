import {useState} from 'react';
import './styles/Login.css';
import {useNavigate} from 'react-router-dom';
function Register(){

    //account information
    const[email, setEmail] = useState("");
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[confirmedPassword, setConfirmedPassword] = useState("");

    //unset used for debugging
    const[message, setMessage] = useState(""); //unset used for debugging

    //error states
    const[badEmail, setbadEmailMessage] = useState("");
    const[badPassword, setbadPasswordMessage] = useState("");
    const[badUsername, setBadUsername] = useState("");
    const[badConfirmedPassword, setBadConfirmedPassword] = useState("");
    const[duplicateUsername, setDuplicateUsername] = useState(false);

    //regex paterns
    const regex_email = /^(.+)@([^\.].*)\.([a-z]{2,})$/;
    const regex_password = /^[a-zA-Z0-9]\w{8,16}$/;
    const regex_userName = /^[a-zA-Z0-9]+$/;


    const navigate = useNavigate();

async function checkDuplicateUsername(){
    fetch("http://localhost:3000/auth/dupUsername", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username
            })
        })
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            if('error' in data){
                console.log("error was sent");
                setMessage(data.error);
            }
            else{
                console.log("gotten token");
                localStorage.setItem('userToken', data.token); //back end returns token inside data json store the token in the browsers local storage
                //at this point i have the token
                setMessage(data.message);
                navigate("/Home");
            }
        })
        .catch(function(error){
            console.log("Error:", error);
            setMessage("Request failed (check CORS / server response).");
        });
}


function authenticator(){
        fetch("http://localhost:3000/auth/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            if('error' in data){
                console.log("error was sent");
                setMessage(data.error);
            }
            else{
                console.log("gotten token");
                localStorage.setItem('userToken', data.token); //back end returns token inside data json store the token in the browsers local storage
                //at this point i have the token
                setMessage(data.message);
                navigate("/login");
            }
        })
        .catch(function(error){
            console.log("Error:", error);
            setMessage("Request failed (check CORS / server response).");
        });
    }

async function CheckInput(e){
        e.preventDefault();

        setbadEmailMessage("");
        setbadPasswordMessage("");
        setBadConfirmedPassword("");
        setBadUsername("");

        let validInput = true;
        
        if(!regex_email.test(email)){
            //badly formated email
            console.log("Email is bad");
            setbadEmailMessage("Enter a Valid Email Address");
            validInput = false;
        }
        if(!regex_userName.test(username)){
            //username is special characters
            console.log("Username is bad");
            setBadUsername("Username can have only letters and numbers");
            validInput = false;
        }
        if(!regex_password.test(password)){
            //badly formated password
            console.log("password is bad");
            setbadPasswordMessage("Password must be between 8 to 16 characters");
            validInput = false;
        }
        if(!regex_password.test(confirmedPassword)){
            //badly formated confirmedPassword
            console.log("confirmedPassword is bad");
            setBadConfirmedPassword("Password must be between 8 to 16 characters");
            validInput = false;
        }
        if(confirmedPassword !== password && validInput){
            console.log("confirmed password does not match password");
            setBadConfirmedPassword("Passwords do not match");
            validInput = false;
        }
        await checkDuplicateUsername();
        if(duplicateUsername){
            console.log("Username already Exists");
            setBadUsername("Username already exists choose another one");
            validInput = false;
        }

        if(validInput){
            //authenticator();
        }
}

    return(    
        <div id='container'>
            <div className='glass-container'>
            <h2>Create Account</h2>
            <form onSubmit={CheckInput}>
                <input 
                    type='text'
                    className={badEmail ? "badInput" : ""}
                    placeholder='Email' 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  
                />
                {badEmail ? <span>{badEmail}</span> : <></>}
                
                <input 
                    type='text'
                    className={badUsername ? "badInput" : ""}
                    placeholder='Username' 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {badUsername ? <span>{badUsername}</span> : <></>}

                <input 
                    type='password' 
                    className={badPassword ? "badInput" : ""}
                    placeholder='Password' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {badPassword ? <span>{badPassword}</span> : <></>}


                <input 
                    type='password' 
                    className={badConfirmedPassword ? "badInput" : ""}
                    placeholder='Confirm Password' 
                    value={confirmedPassword}
                    onChange={(e) => setConfirmedPassword(e.target.value)}
                />
                {badConfirmedPassword ? <span>{badConfirmedPassword}</span> : <></>}


                <div id='continue_btns'>
                    <button className='toLogin_btn' type='button'>Create</button>
                </div> 
            </form>
        <p>{message}</p>
        </div>
        </div>
        
    );
}

export default Register;
