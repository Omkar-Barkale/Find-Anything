import {useState} from 'react';
import './styles/Login.css';
import {useNavigate} from 'react-router-dom';
function Login(){

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[message, setMessage] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault();
        
        fetch("http://localhost:3000/auth/token", {
            method: "GET",
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



    return(    
        <div id='container'>
            <div className='glass-container'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type='text' 
                    placeholder='Email' 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input 
                    type='password' 
                    placeholder='Password' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div id='preferences'>
                    <div id='Remember'>
                        <input type='checkbox'/>Remeber me
                    </div>
                    <button id='forgotPassword'>Forgot Password?</button>
                </div>

                <div id='continue_btns'>
                    <button className='toMain_btn' type='submit'>Submit</button>
                    <button className='toMain_btn' type='button'>Continue as Guest</button>
                </div>
                
                <button id='register'>Don't have an account? Click Here to Register</button>
                
            </form>
        <p>{message}</p>
        </div>
        </div>
        
    );
}

export default Login;