import { useState } from 'react'
import {Link} from 'react-router-dom';
import "./styles/Register.css"
import FileUploader from './FileUploader';
import {useNavigate} from 'react-router-dom';



function Register()
{


    const navigate = useNavigate();

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

    const password_regex = /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{9,17}$/;
    const email_regex = /^(.+)@([^\.].*)\.([a-z]{2,})$/;
    
    function handleSubmit(e){
        e.preventDefault();

        if(email == "")
        {
            setEmailError("Enter an email");
            return;   
        }
        if(!email_regex.test(email))
        {
            setEmailError("Enter a valid email");
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
        if(!password_regex.test(password))
        {
            setPasswordError("Password must be 9–17 characters long");
            return;
        }
        if(confirmPassword== "")
        {
            setConfirmError("Confirm your password");
            return;
        }
        if(confirmPassword !== password) 
        {
            setConfirmError("Passwords do not match");
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
        formData.append("confirmPassword", confirmPassword);
        formData.append("image", selectedFile);



        fetch("http://localhost:3000/registration", {
            method: "POST",
            body: formData
        })//removed header as we not only sending JSON
        .then(async res => {
            const data = await res.json();
            if(!res.ok)
                throw new Error(data.message);
            return data;
            
        })
        .then(data => {
            console.log("Registration successful:", data); 
            alert("Registration successful!");
            e.target.reset();
            navigate("/login");
        })
        .catch(err => {
            console.error("Registration error: ", err.message);
            setUserNameError(err.message);
        });

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
                                {<p className ="errorText">{avatarError}</p>}

                    </div>
                </div>
                
            </div>

        </>  
    );
}

export default Register;
