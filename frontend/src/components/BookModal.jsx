import { useState } from 'react'
import {Link} from 'react-router-dom';
import './styles/BookModal.css'

function BookModal(props)
{

    const[isOpen, setOpen] = useState(false);

    return(
    
        <>
            <div id = "modalOverlay" >
                <div id="modalStyle">
                        <h1> hello </h1>
                        <button id = "close" onClick={props.onClose}>X</button>
                </div>
            </div>
        </>
    );
}

export default BookModal;
