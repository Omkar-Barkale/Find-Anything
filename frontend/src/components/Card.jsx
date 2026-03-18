import { useState } from "react"
import "./styles/card.css"


function Card(props){

     return(<>
     <div className="card" onClick={() => console.log("clicked on: " + props.name)}> 
          <img src={props.cover} className="card-img"></img>
          <h3 className="card-title">{props.name}</h3>
          <h5 className = 'author'>{props.author}</h5>
          <p className="card-body">{props.body}</p>
     </div>
     </>);
}

export default Card;