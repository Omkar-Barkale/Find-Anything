import { useState } from "react"
import { useNavigate } from "react-router-dom";
import "./styles/card.css"


function Card(props){
     const navigate = useNavigate();

     //Clicking the cards brings you to the page to edit that book
     function handleClick() {
          navigate("/book/edit/${props.key}")
     }

     return(<>
     <div className="card" onClick={handleClick}> 
          <img src={props.cover} className="card-img"></img>
          <h3 className="card-title">{props.name}</h3>
          <h5 className = 'author'>{props.author}</h5>
          <p className="card-body">{props.body}</p>
     </div>
     </>);
}

export default Card;