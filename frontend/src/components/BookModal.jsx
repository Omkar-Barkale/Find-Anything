import { useState } from 'react'
import {Link} from 'react-router-dom';
import './styles/BookModal.css'

function BookModal({onClose})
{

    const[isOpen, setOpen] = useState(false);

    return(
    
        <>
            <div id = "modalOverlay" onClick={()=>{onClose}}>
                <div id="modalStyle">
                        <h1> hello </h1>
                        <button onClick={onClose}>X</button>
                </div>
            </div>
        </>
    );
}

export default BookModal;
