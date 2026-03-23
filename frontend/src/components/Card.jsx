import { useState } from "react"
import "./styles/card.css"
import BookModal from "./BookModal";


function Card(props){

     const [showModal, setShowModel] = useState(false);



     return(<>
     <div className="card" onClick={() => setShowModel(true)}> 
          <img src={props.cover} className="card-img"></img>
          <h3 className="card-title">{props.name}</h3>
          <h5 className = 'author'>{props.author}</h5>
          <p className="card-body">{props.body}</p>
     </div>


          {showModal && <BookModal/>}

     </>);
}

export default Card;