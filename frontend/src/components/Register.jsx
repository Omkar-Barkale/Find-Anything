import { useState } from 'react'
import {Link} from 'react-router-dom';
import "./styles/Register.css"



function Register()
{

    return(    
        <>
            <div id = "registerBackground"> 
                <div id = "registerBox">
                    <div id = "leftRegister">
                        <h3>Register</h3>
                        <form>
                            <label>Email</label>
                            <input type="email" placeholder="Enter your email" />

                            <label>Password</label>
                            <input type="password" placeholder="Enter your password" />

                            <label>Confirm password</label>
                            <input type="password" placeholder="Confirm your password" />
                        </form>
                    </div>

                    <div id = "rightRegister">

                    </div>
                </div>
                
            </div>

        </>  
    );
}

export default Register;
