import { useState } from 'react'
import {Link} from 'react-router-dom';
import "./styles/Register.css"
import FileUploader from './FileUploader';



function Register()
{
    const[email, setEmail] = useState("");
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmError, setConfirmError] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [avatarError, setAvatarError] = useState("");
    const [invalidTypeError, setInvalidTypeError] = useState("");

    function handleSubmit(e){
        e.preventDefault();

        
        if(selectedFile == null){
            console.log("Avatar not uploaded")
            setAvatarError("Please upload an avatar");
            return;
        }
        else{
            setAvatarError("");
        }

        const formData = new FormData(); //need this as cant send picture as JSON
        formData.append("email", email);
        formData.append("username", username);
        formData.append("password", password);
        formData.append("image", selectedFile); //has an error where multer reads from undefined



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
                        <form onSubmit={handleSubmit}>
                            <div className = "inputGroup">
                                <label>Email</label>
                                <input type="email" placeholder="Enter your email"  required onChange={(e) => setEmail(e.target.value)}/>   
                            </div>

                            <div className = "inputGroup">
                                <label>Username</label>
                                <input type="text" placeholder="Enter your username" required onChange={(e) => setUsername(e.target.value)}/>   
                            </div>



                            <div className = "inputGroup">
                                <label>Password</label>
                                <input type="password" placeholder="Enter your password" required 
                                onChange={(e) => {setPassword(e.target.value)
                                    const val = e.target.value;


                                }}/>
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
