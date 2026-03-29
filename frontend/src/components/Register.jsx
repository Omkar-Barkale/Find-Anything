import { useState } from 'react'
import {Link} from 'react-router-dom';
import "./styles/Register.css"
import FileUploader from './FileUploader';
import NavBar from './NavBar'



function Register()
{
    const[email, setEmail] = useState("");
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmError, setConfirmError] = useState("");
    const [emailError, setEmailError] = useState();
    const [selectedFile, setSelectedFile] = useState(null);
    const [avatarError, setAvatarError] = useState("");
    const [userNameError, setUserNameError] = useState("");
    const password_regex = /^[a-zA-Z][A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,16}$/;
    const email_regex = /^(.+)@([^\.].*)\.([a-z]{2,})$/;
    
    function handleSubmit(e){
        e.preventDefault();

        if(email == "")
        {
            setEmailError("Enter an email");
            return;   
        }
        if(username == "")
        {
            setUserNameError("Enter a username");
            return;
        }
        if(password == "")
        {
            setPasswordError("Enter a password");
            return;
        }
        if(confirmPassword== "")
        {
            setConfirmError("Confirm your password");
            return;
        }
        if(selectedFile == null){
            setAvatarError("Please upload an avatar");
            return;
        }

        


        const formData = new FormData(); //need this as cant send picture as JSON
        formData.append("email", email);
        formData.append("username", username);
        formData.append("password", password);
        formData.append("image", selectedFile);



        fetch("http://localhost:3000/registration", {
            method: "POST",
            body: formData
        })//removed header as we not only sending JSON
        .then(res => res.json())
        .then(data => {console.log("Success:", data); alert("Registration successful!");})
        .catch(err => {console.error("Error: ", err);});

        //e.target.reset();
    }   

    return(    
        <>
            <div id = "registerBackground"> 
                <div id = "registerBox">
                    <div id = "leftRegister">
                        <h3>Register</h3>
                        <form onSubmit={handleSubmit} noValidate>
                            <div className = "inputGroup">
                                <label>Email</label>
                                <input type="email" placeholder="Enter your email"  required onChange={(e) => {setEmail(e.target.value)
                                    const val = e.target.value;
                                    if(val != "")
                                        setEmailError("");


                                }}/>   
                                {<p className="errorText">{emailError}</p>}
                            </div>


                            <div className = "inputGroup">
                                <label>Username</label>
                                <input type="text" placeholder="Enter your username" required onChange={(e) => {setUsername(e.target.value)
                                     const val = e.target.value;
                                    if(val != "")
                                        setUserNameError("");
                                }}/>   
                                {<p className="errorText">{userNameError}</p>}
                            </div>



                            <div className = "inputGroup">
                                <label>Password</label>
                                <input type="password" placeholder="Enter your password" required 
                                onChange={(e) => {setPassword(e.target.value)
                                    const val = e.target.value;
                                    if(val != "")
                                        setPasswordError("");
  
                                }}/>
                                {<p className="errorText">{passwordError}</p>}
                            </div>


                            <div className = "inputGroup">
                                <label>Confirm password</label>
                                <input type="password" placeholder="Confirm your password"  required 
                                onChange={(e) => {setConfirmPassword(e.target.value)
                                    const val = e.target.value;
                                    if(val === password || val == "")
                                        setConfirmError("");
                                    else
                                        setConfirmError("Passwords do not match")

                                }}/>
                                {<p className="errorText">{confirmError}</p>}
                            </div>

                              <button id = "registerBtn" type="submit"> Register now</button>

   
                        </form>

                        <p className = "registerP">Already have an account? <Link to="/login">Log in</Link></p>

                    </div>

                    <div id = "rightRegister">
                                <h2 id = "uploadText">Add a profile photo</h2>
                                <FileUploader setFile={setSelectedFile} setAvatarError={setAvatarError}/> {/*child sends data to parent*/}
                                {<p class ="errorText">{avatarError}</p>}

                    </div>
                </div>
                
            </div>

        </>  
    );
}

export default Register;
