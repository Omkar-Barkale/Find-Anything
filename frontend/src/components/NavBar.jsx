import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import './styles/NavBar.css'

function NavBar() {

  //i think react does not know localStorage changes

  const[role, setRole] = useState("");
  const[token, setToken] = useState(localStorage.getItem('token'));


  useEffect(() => {
      if(token)
      {
        const decoded = jwtDecode(token);
        console.log(decoded);
        setRole(decoded.role);
      }
      else{
        setRole("");
        console.log("no token found")
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
      mode = <UnregisteredUser />;
    }


  return (
    <>
        <ul>
          <li id = "home"> <Link to = "/home" >Home  </Link></li>
          <li><a href = "#" id = 'about' onClick={()=>alert("About Clicked")}>About</a></li>
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

  return(
    <>
    <li><a href = "#" id = 'lib' onClick={()=>alert("Library Clicked")}>Your Library</a></li>
    <li className = "profile"> <a href = "#" onClick={()=>alert("Profile Clicked")}>Profile</a>    </li>
    <li className = "logout"> <a href = "#" onClick={()=>{localStorage.removeItem('token'); props.setToken(null);}}>Logout</a> </li>
    <li className = "upload"><Link to = "/test">Upload</Link> </li>

    </>
  )

}
function Admin(props){

  return(  
  <>
    <li><a href = "#" id = 'lib' onClick={()=>alert("Library Clicked")}>Your Library</a></li>
        <li className = "upload"> <a href = "#" onClick={()=>{alert("Post clicked")}}>Post+</a>    </li>
    <li id = "mod"> <a href = "#"  onClick={()=>alert("Mod Clicked")}>Moderation Dashboard</a> </li>
    <li className = "profile"> <a href = "#"  onClick={()=>alert("Profile Clicked")}>Profile</a> </li>
        <li className = "logout"> <a href = "#" onClick={()=>{localStorage.removeItem('token'); props.setToken(null);}}>Logout</a>    </li>

  </>
  )

}

export default NavBar
