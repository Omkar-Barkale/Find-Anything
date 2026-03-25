import {useState} from 'react';
import './styles/Login.css';
import {useNavigate} from 'react-router-dom';
function Login(){

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[message, setMessage] = useState("");
    const[badEmail, setbadEmailMessage] = useState("");
    const[badPassword, setbadPasswordMessage] = useState("");
    const regex_email = /^(.+)@([^\.].*)\.([a-z]{2,})$/;
    const regex_password = /^[a-zA-Z0-9]\w{8,16}$/;

    const navigate = useNavigate();

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
                navigate("/Home");
            }
            
        })
        .catch(function(error){
            console.log("Error:", error);
            setMessage("Request failed (check CORS / server response).");
        });
    }

    function CheckInput(e){
        e.preventDefault();

        setbadEmailMessage("");
        setbadPasswordMessage("");


        let validInput = true;
        if(!regex_email.test(email)){
            //badly formated email
            console.log("Email is bad");
            setbadEmailMessage("Enter a Valid Email Address");
            validInput = false;
        }
        if(!regex_password.test(password)){
            //badly formated password
            console.log("password is bad");
            setbadPasswordMessage("Password must be between 8 to 16 characters");
            validInput = false;
        }

        if(validInput){
            authenticator();
        }
    }



    return(    
        <div id='container'>
            <div className='glass-container'>
            <h2>Login</h2>
            <form onSubmit={CheckInput}>
                <input 
                    type='text'
                    className={badEmail ? "badInput" : ""}
                    placeholder='Email' 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    //pattern="(.+)@([^\.].*)\.([a-z]{2,})"
                />
                {badEmail ? <span>{badEmail}</span> : <></>}
                <input 
                    type='password' 
                    className={badPassword ? "badInput" : ""}
                    placeholder='Password' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    //pattern="[A-Za-z0-9]\w{8,16}"
                />
                {badPassword ? <span>{badPassword}</span> : <></>}

                <div id='continue_btns'>
                    <button className='toMain_btn' type='submit'>Submit</button>
                    <button className='toMain_btn' type='button'>Continue as Guest</button>
                </div>
                
                <button id='register' type='button'>Don't have an account? Click Here to Register</button>
                
            </form>
        <p>{message}</p>
        </div>
        </div>
        
    );
}

export default Login;



    /* <div id='preferences'>
                    <div id='Remember'>
                        <input type='checkbox'/>Remeber me
                    </div>
                    <button id='forgotPassword'>Forgot Password?</button>
                </div> */