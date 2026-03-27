import { useState } from "react"
import BookModal from "./BookModal";


function UserCards(props){


     return(
     <>
          <div className="card" onClick={alert("This was clicked")}> 
               <h3 className="username">{props.username}</h3>
               <h5 className = 'author'>{props.email}</h5>
               <p className="card-body">{props.numPosts}</p>
          </div>

     </>);
}

export default UserCards;