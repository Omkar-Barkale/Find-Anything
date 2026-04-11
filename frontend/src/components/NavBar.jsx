import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import './styles/NavBar.css'



function NavBar() {


  const[role, setRole] = useState("");
  const[token, setToken] = useState(localStorage.getItem('token'));


  useEffect(() => {
      if(token && token.includes('.'))
      {
        try{
           const decoded = jwtDecode(token);
          console.log(decoded);
          setRole(decoded.role);
        }catch(err){
          console.error("NavBar Decode Failed:", err.message);
          setRole("");
        }
      }
      else{
        setRole("");
        console.log("Token removed/not found")
      }
  }, [token]);

    let mode;
    if (role === "admin") {
      mode = <Admin setToken = {setToken}/>;
    } 
    else if (role === "user"){
      mode = <User setToken = {setToken}/>;
    } 
    else {
      mode = <UnregisteredUser/>;
    }


  return (
    <>
        <ul>
          <li id = "home"> <Link to = "/home" >Home  </Link></li>
          {mode}
        </ul>
    </>
  )
}

  function UnregisteredUser(){
  return(
    <>
          <li id = "login"><Link to = "/login" >Log In</Link> </li>  
          <li id = "register"><Link to = "/register">Sign Up</Link></li>
    </>
  )

}

function User(props){
  const navigate = useNavigate();

  return(
    <>
    <li className = "upload"><Link to = "/upload">Upload</Link> </li>
    <li className = "profile"><Link to ="/profile" > Profile </Link></li>
    <li className = "logout"> <a href = "#" onClick={()=>{localStorage.removeItem('token'); props.setToken(null); navigate('/')}}>Logout</a> </li>

    </>
  )

}
function Admin(props){
    const navigate = useNavigate();


  return(  
  <>
        <li className = "upload"><Link to = "/upload">Upload</Link> </li>
        <li id = "mod"> <Link to="/admindashboard">Moderation Dashboard</Link> </li>
        <li className = "profile"><Link to ="/profile" > Profile </Link></li>
        <li className = "logout"> <a href = "#" onClick={()=>{localStorage.removeItem('token'); props.setToken(null); navigate('/')}}>Logout</a>    </li>

  </>
  )

}

export default NavBar
