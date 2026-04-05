import { useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import "../components/styles/Profile.css"



/*TODO FIX THE REGISTRATION ERROR WHERE IT LETS USER PROCEED EVEN IF USERNAME TAKEN
*/

function Profile()
{

    //for best practice it is not recommended to get data about user from token
    //since they are used for authentication primarily
    const[user, setUser] = useState(null);
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const userId = decoded._id;
    const[avatar, setAvatar] = useState("");


    useEffect(()=>{
        const load = async () => {
                const response = await fetch(`http://localhost:3000/auth/users/${userId}`);
                const data = await response.json();
                setUser(data);
                setAvatar(`data:${data.avatarType};base64,${data.avatar}`);


        }
        load();
    }, [])


    return(
        <>
        <div id = "profileOverlay">
            <div id = "profileModal">
                <div id = "profileSidebar">
                    <h1>stuff</h1>
                </div>
                <div id = "userInfo">
                        <h1>Account Settings</h1>
                        <h1>{user? user.email : ""}</h1>
                        <img src = {avatar}></img>
                </div>
            </div>
        </div>
        </>
    )
}

export default Profile;
