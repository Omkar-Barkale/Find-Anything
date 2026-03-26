import { useState } from 'react'
import {Link} from 'react-router-dom';
import "./styles/Register.css"
import FileUploader from './FileUploader';



function Register()
{

    return(    
        <>
            <div id = "registerBackground"> 
                <div id = "registerBox">
                    <div id = "leftRegister">
                        <h3>Register</h3>
                        <form>
                            <div className = "inputGroup">
                                <label>Email</label>
                                <input type="email" placeholder="Enter your email" />   
                            </div>

                            <div className = "inputGroup">
                                <label>Username</label>
                                <input type="text" placeholder="Enter your username" />   
                            </div>



                            <div className = "inputGroup">
                                <label>Password</label>
                                <input type="password" placeholder="Enter your password" />
                            </div>


                            <div className = "inputGroup">
                                <label>Confirm password</label>
                                <input type="password" placeholder="Confirm your password" />
                            </div>

                              <button id = "registerBtn"type="submit">Register now</button>

   
                        </form>
                        <p className = "registerP">Already have an account? <Link to="/login">Log in</Link></p>

                    </div>

                    <div id = "rightRegister">
                                <h3 id = "uploadText">Add a profile photo</h3>
                                <FileUploader/>
                    </div>
                </div>
                
            </div>

        </>  
    );
}

export default Register;
