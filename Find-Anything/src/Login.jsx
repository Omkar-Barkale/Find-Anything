import {useState} from 'react'

function Login(){

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    function handleSubmit(e){
        e.preventDefault();
        //add fetch method with post to port 3001 (port 3000 is the search bar listener)
    }



    return(<>
    
    <div className='glass-container'>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <input 
                type='text' 
                placeholder='Email' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            ></input>

            <input 
                type='password' 
                placeholder='Password' 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            ></input>

            <div>
                <input type='checkbox'>Remeber me</input>
                <button id='forgotPassword'>Forgot Password?</button>
            </div>

            <button className='toMain_btn' type='submit'>Submit</button>
            <button className='toMain_btn' type='button'>Continue as Guest</button>

            <button id='register'>Don't have an account? Click Here to Register</button>
        </form>
    </div>
    
    
    
    
    </>);


}

export default Login