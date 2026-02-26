import { useState } from "react"
import "./card.css"


function Card(props){

     function console(){
          console.log("clicked on: " + props.title);
     }


     return(<>
     <div class="card" onClick={console}> 
          <img src={props.img} class="card-img"></img>
          <h3 class="card-title">{props.title}</h3>
          <p class="card-body">{props.body}</p>
     </div>
     </>);
}

export default Card;