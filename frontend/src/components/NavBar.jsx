import { useState } from 'react'
import {Link} from 'react-router-dom';
import './styles/NavBar.css'

function NavBar() {
  const [user, setUser] = useState(null);
  let userMode;
  userMode = (user === null) ? <UnregisteredUser/> : (user === "user") ? <User/> : <Admin/>;
  return (
    <>
        <ul>
          <li id = "home"> <Link to = "/home" >Home  </Link></li>
          <li><a href = "#" id = 'about' onClick={()=>alert("About Clicked")}>About</a></li>
          {userMode}
        </ul>
    </>
  )
  function UnregisteredUser(){
  return(
    <>
          <li id = "login"><Link to = "/login" onClick={()=>{setUser("user")}}>Log In</Link> </li>  
          <li id = "register"><Link to = "/login">Sign Up</Link></li>
    </>
  )

}

function User(){

  return(
    <>
    <li><a href = "#" id = 'lib' onClick={()=>alert("Library Clicked")}>Your Library</a></li>
    <li className = "profile"> <a href = "#" onClick={()=>alert("Profile Clicked")}>Profile</a>    </li>
    </>
  )

}
function Admin(){

  return(  
  <>
    <li><a href = "#" id = 'lib' onClick={()=>alert("Library Clicked")}>Your Library</a></li>
    <li id = "mod"> <a href = "#"  onClick={()=>alert("Mod Clicked")}>Moderation Dashboard</a> </li>
    <li className = "profile"> <a href = "#"  onClick={()=>alert("Profile Clicked")}>Profile</a> </li>
  </>
  )

}
}



export default NavBar
