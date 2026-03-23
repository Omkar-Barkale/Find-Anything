import { useState } from 'react'
import {Link} from 'react-router-dom';
import './styles/BookModal.css'

function BookModal()
{

    const[isOpen, setOpen] = useState(false);





    return(
    
        <>
            <div id = "modalOverlay">
                <div id="modalStyle">
                        <h1> hello </h1>
                </div>
            </div>
        </>
    );
}

export default BookModal;
