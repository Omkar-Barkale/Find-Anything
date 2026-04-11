import { useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import "../components/styles/Profile.css"
import NavBar from './NavBar.jsx';
import * as Validation from '../util/frontendValidation.js'
import { useNavigate } from 'react-router-dom';


function Profile()
{

    //for best practice it is not recommended to get data about user from token
    //since they are used for authentication primarily
    const navigate = useNavigate();


    const [userId, setUserId] = useState(null);
    const[user, setUser] = useState(null);
    const[avatar, setAvatar] = useState("");
    const[userInfo, setUserInfo] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [avatarFile, setAvatarFile] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState("");

    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmError, setConfirmError] = useState("");
    const [avatarError, setAvatarError] = useState("");



    const token = localStorage.getItem('token');
    useEffect(() => {
        if (!token) 
            return;
        const decoded = jwtDecode(token);
        setUserId(decoded._id);
    }, []);



    function handleSubmit(e) {

        e.preventDefault();
        if(!token)
        {
            console.log("Requires token");
            return;
        }

        const usernameErr = Validation.validateUsername(userInfo.username);
        const emailErr = Validation.validateEmail(userInfo.email);
        const passwordErr = userInfo.password ? Validation.validatePassword(userInfo.password): "";
        const confirmErr = userInfo.password ? Validation.validateConfirmPassword(userInfo.password, confirmPassword) : "";

        setUsernameError(usernameErr);
        setEmailError(emailErr);
        setPasswordError(passwordErr);
        setConfirmError(confirmErr);

        if (usernameErr || emailErr || passwordErr || confirmErr || avatarError) 
            return; //return if one of the fields has an error, as "" is falsy 

        const formData = new FormData();
        formData.append("id", userId);
        formData.append("username", userInfo.username);
        formData.append("email", userInfo.email);
        if (avatarFile) 
            formData.append("avatar", avatarFile);
        if (userInfo.password) //if the user password is empty does not append
        {
            formData.append("password", userInfo.password);
            formData.append("confirmPassword", confirmPassword);
        }
        fetch("http://localhost:3000/auth/users/update", {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        })
        .then(async res => {
            const data = await res.json();
            if (!res.ok) 
                throw new Error(data.message);
            return data;
        })
        .then(data => {
            console.log("Profile updated:", data);
            alert("Update successful");
        })
        .catch(err => {
            console.error("Username error", err.message);
            setUsernameError(err.message); 
        });
    }


    useEffect(()=>{ //only load component once we get the userId
        if(!userId)
            return;

        const load = async () => {
                const response = await fetch(`http://localhost:3000/auth/users/${userId}`,{
                    method: "GET",
                    headers: {
                    'Authorization': `Bearer ${token}`
                    }
                });
                
                const data = await response.json();
                setUser(data);
                setAvatar(`data:${data.avatarType};base64,${data.avatar}`);
                setUserInfo({
                    username: data.username,
                    email: data.email,
                    password: ""
                });
                setConfirmPassword("");
        }
        load();
    }, [userId])

    

    function handleFileChange(e)
    {

        if(e.target.files)//checks filelist object
        { 
            const newFile = e.target.files[0]; //need this as state updates are async, so cant use file
            if((newFile.type == 'image/png' || newFile.type == 'image/jpeg')) 
            {
                setAvatar(newFile ? URL.createObjectURL(newFile) : undefined); //preview
                setAvatarFile(newFile); //to send to backend
                
            } 
            else
            {   
                e.target.value = '';
                setAvatarError('Only png and jpeg files are supported');
                console.log('Only png and jpeg files are supported');
            }
        }
    }


    return(
        <>
        <NavBar/>
        <div id = "profileOverlay">
            <div id = "profileModal">
                <div id = "profileSidebar">
                    <h3>Home</h3>
                </div>
                <div id = "userInfo">
                    <form onSubmit={handleSubmit}>
                        <h2 id = "edit">Edit Profile</h2>
                        <img src = {avatar} id = "pfp"></img>

                        <input value ={userInfo.username} type = "text" placeholder = 'Username' onChange={(e) => {
                            setUserInfo({username: e.target.value,
                                         email : userInfo.email, 
                                         password: userInfo.password}); 
                            setUsernameError("")}}></input>

                        {<p className="errorText">{usernameError}</p>}

                        <input value = {userInfo.email} type = "text" placeholder = 'Email' onChange={(e) => {
                            setUserInfo({username: userInfo.username, 
                                        email : e.target.value, 
                                        password: userInfo.password})
                            setEmailError("")}}></input>

                        {<p className="errorText">{emailError}</p>}

                        <input type = "password" placeholder='Change password' onChange={(e) =>{
                            setUserInfo({username: userInfo.username, 
                                        email: userInfo.email, 
                                        password: e.target.value})
                            setPasswordError("")}}></input>

                        {<p className="errorText">{passwordError}</p>}

                        <input type = "password" placeholder='Confirm new password' onChange={(e) => setConfirmPassword(e.target.value)}></input>
                        {<p className="errorText">{confirmError}</p>}

                        <input type = "file" onChange = {handleFileChange} ></input>
                        {<p className="errorText">{avatarError}</p>}



                        <button id = "registerBtn" type="submit"> Save Changes</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default Profile;
