import { useState } from "react"
import "./styles/Usercards.css";


function UserCards(props){

     if(props.menu === "users"){
          const username = props.username;
          const avatar = props.avatar;
          const email = props.email;
          const role = props.role;
          const deleteUser = props.onDelete;
          const banUser = props.onBan;
          const unbanUser = props.onUnban;
          const id = props.id; //string
          

          return(
          <>
               <div className="Usercard"> 
                    
                    <p className="username">{username}</p>

                    <p className = 'email'>{email}</p>
                    <p className="role">{role}</p>
                    <button id="delete" onClick={() => deleteUser(id)}>Delete</button>
                    <button id="ban" onClick={() => {role === "banned" ? unbanUser(id) : banUser(id)}}>{role === "banned" ? "Unban" : "Ban"}</button>
               
               </div>

          </>);
     }else if(props.menu === "books"){
          const name = props.name;
          const cover = props.cover;
          const author = props.author;
          const body = props.body;
          const deleteBook = props.onDelete;
          const id = props.id; //string
          

          return(
          <>
               <div className="Usercard"> 
                    
                    <p className="name">{name}</p>
                
                    <p className = 'author'>{author}</p>
                    <p className="body">{body}</p>
                    <button id="delete" onClick={() => deleteBook(id)}>Delete</button>
               </div>

          </>);
     }
     else if(props.menu === "logs"){
          const username = props.username;
          const email = props.email;
          const body = props.body;
          const time = props.time;
           
          return(<>
               <div className="Usercard">
                    <p className="username">{username}</p>
                    <p className="email">{email}</p>
                    <p className="logBody">{body}</p>
                    <p className="time">{time}</p>
               </div>
          
          
          </>);
     }

     
}

export default UserCards;