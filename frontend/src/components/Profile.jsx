import { useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
 



function Profile()
{

    const[user, setUser] = useState("null");
    //for best practice it is not recommended to get data about user from token
    //since they are used for authentication primarily
    const[token, setToken] = useState(localStorage.getItem('token'));
    const decoded = jwtDecode(token);
    const userId = decoded._id;



    //Error where it seems to call two methods since it matches
    useEffect(()=>{
            fetch(`http://localhost:3000/auth/users/${userId}`)
            .then(res => {
                res.json();
            })
            .then(data => {
                const jsonData = JSON.parse(data)
                setUser(jsonData);
                console.log("THe json data is" + jsonData.email);
                console.log("fetching user by id");
            })
            .catch(err => console.error('Failed to fetch user by id', err));
    }, [])




    return(
        <>
            <h1>{user.email}</h1>
        </>
    )
}

export default Profile;
