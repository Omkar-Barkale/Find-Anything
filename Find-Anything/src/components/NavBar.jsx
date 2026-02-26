import { useState } from 'react'
import './styles/NavBar.css'

function NavBar() {
  const [user, setUser] = useState(null);
  let userMode;
  userMode = (user === null) ? <UnregisteredUser/> : (user === "user") ? <User/> : <Admin/>;
  return (
    <>
        <ul>
          <li><a href = "#" id = 'site' onClick={()=>alert("Site Clicked")}>SiteName</a></li>
          <li><a href = "#" id = 'home' onClick={()=>alert("Home Clicked")}>Home</a></li>
          <li><a href = "#" id = 'about' onClick={()=>alert("About Clicked")}>About</a></li>
          <li><a href = "#" id = 'lib' onClick={()=>alert("Library Clicked")}>Your Library</a></li>
          {userMode}
        </ul>
    </>
  )
  function UnregisteredUser(){
  return(
    <>
          <li id = "login"><a href = "#" onClick={()=>{alert("Login"); setUser("user")}}>Log In</a>  </li>  
          <li id = "register"><a href = "#" onClick={()=>alert("Register")}>Sign Up</a></li>
    </>
  )

}

function User(){

  return(
    <>
    <li class = "profile"> <a href = "#" onClick={()=>alert("Profile Clicked")}>Profile</a>    </li>
    </>
  )

}
function Admin(){

  return(  
  <>
    <li id = "mod"> <a href = "#"  onClick={()=>alert("Mod Clicked")}>Moderation Dashboard</a> </li>
    <li class = "profile"> <a href = "#"  onClick={()=>alert("Profile Clicked")}>Profile</a> </li>
  </>
  )

}
}



export default NavBar
