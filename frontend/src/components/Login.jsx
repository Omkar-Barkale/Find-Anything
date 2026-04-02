import {useState} from 'react';
import './styles/Login.css';
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';

function Login(){

    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[message, setMessage] = useState("");
    const[badUsername, setBadUsername] = useState("");
    const[badPasswordMessage, setBadPasswordMessage] = useState("");
    const regex_password = /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{9,17}$/;

    const navigate = useNavigate();

    function authenticator(){
        fetch("http://localhost:3000/auth/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
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
                localStorage.setItem('userToken', data.token); //backend returns token inside data json store the token in the browsers local storage
                //at this point i have the token
                setMessage(data.message);
                navigate("/home");
            }
            
        })
        .catch(function(error){
            console.log("Error:", error);
            setMessage("Request failed (check CORS / server response).");
        });
    }

    function CheckInput(e){
        e.preventDefault();

        setBadUsername("");
        setBadPasswordMessage("");


        let validInput = true;

        if(!regex_password.test(password)){
            //badly formated password
            console.log("password is bad");
            setBadPasswordMessage("Password must be between 8 to 16 characters");
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
                    className={badUsername ? "badInput" : ""}
                    placeholder='Username' 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    //pattern="(.+)@([^\.].*)\.([a-z]{2,})"
                />
                {badUsername ? <span>{badUsername}</span> : <></>}
                <input 
                    type='password' 
                    className={badPasswordMessage ? "badInput" : ""}
                    placeholder='Password' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    //pattern="[A-Za-z0-9]\w{8,16}"
                />


                <div id='continue_btns'>
                    <button className='toMain_btn' type='submit'>Log In</button>
                    <button className='toMain_btn' type='button'>Continue as Guest</button>
                </div>
                
                <p id='registerLink'>Don't have an account? <Link to="/register">Register</Link></p>
                
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