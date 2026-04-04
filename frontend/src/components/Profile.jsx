import { useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import { jwtDecode } from "jwt-decode";




function Profile()
{

    const[user, setUser] = useState(null);
    //for best practice it is not recommended to get data about user from token
    //since they are used for authentication primarily
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const userId = decoded._id;


    useEffect(()=>{
        const load = async () => {
                const response = await fetch(`http://localhost:3000/auth/users/${userId}`);
                const data = await response.json();
                setUser(data);
        }
        load();
    }, [])


    return(
        <>
            <h1>{user.email}</h1>
        </>
    )
}

export default Profile;
