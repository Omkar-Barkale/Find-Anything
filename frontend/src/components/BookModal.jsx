import { useState } from 'react'
import {Link} from 'react-router-dom';
import './styles/BookModal.css'
import Card from './Card'

function BookModal(props)
{
    return(
        
        <>
            <div id = "modalOverlay" onClick={props.onClose}>
                <div id="modalStyle" onClick={(e) => e.stopPropagation()}>  {/*does not notify the parent to close since we only want it to close outside or x*/}
                        <img src={props.cover} id="cover"></img>
                        <button id = "close" onClick={props.onClose}>x</button>
                        <h4>{props.name}</h4>
                        <h5> {props.author}</h5>
                </div>
            </div>
        </>
    );
}

export default BookModal;
