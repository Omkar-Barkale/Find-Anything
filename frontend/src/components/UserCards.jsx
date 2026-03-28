import { useState } from "react"
import "./styles/Usercards.css";


function UserCards(props){


     return(
     <>
          <div className="Usercard" onClick={() => alert("This was clicked")}> 
               
               <p className="username">{props.username}</p>
               <img src={props.avatar}></img>
               <p className = 'email'>{props.email}</p>
               <p className="role">{props.role}</p>
               <p className="numPosts">{props.numPosts}</p>
          </div>

     </>);
}

export default UserCards;