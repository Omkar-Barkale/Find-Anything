import {useState} from 'react'
import './components/styles/Login.css'
function Login(){

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[message, setMessage] = useState("");

    function handleSubmit(e){
        e.preventDefault();
        
        fetch("http://localhost:3001/login", {
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
            setMessage("Email: " + data.email + " Passowrd: " + data.password);
        })
        .catch(function(error){
            console.log("Error:", error);
            setMessage("Request failed (check CORS / server response).");
        });
        //add fetch method with post to port 3001 (port 3000 is the search bar listener)
    }



    return(    
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
        
    );
}

export default Login;