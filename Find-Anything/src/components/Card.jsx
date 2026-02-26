import { useState } from "react"
import "./styles/card.css"


function Card(props){

     


     return(<>
     <div className="card" onClick={() => console.log("clicked on: " + props.title)}> 
          <img src={props.img} className="card-img"></img>
          <h3 className="card-title">{props.title}</h3>
          <p className="card-body">{props.body}</p>
     </div>
     </>);
}

export default Card;