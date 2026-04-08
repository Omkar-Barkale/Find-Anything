import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import './styles/BookModal.css'
import Card from './Card'
import { jwtDecode } from 'jwt-decode';

function BookModal(props){

    const[commentInput, setCommentInput] = useState("");
    //add comment body cap?

    function handleSubmit(){

    }


    return(
        
        <>
            <div id = "modalOverlay" onClick={props.onClose}>
                <div id="modalStyle" onClick={(e) => e.stopPropagation()}>  {/*does not notify the parent to close since we only want it to close outside or x*/}
                    <div id = "bookSide">
                        <button id = "close" onClick={props.onClose}>x</button>
                        <div id = "bookContainer">
                            <img src={props.cover} id="bookCover"></img>
                        </div>

                        <div id = "bookInfo">
                            <h4 id = "bookName">{props.name}</h4>
                            <h5 id = "bookAuthor"> {props.author}</h5>
                        </div>
                    </div>




                    <div id = "commentSide">
                        <div id = "commentSection"> 
                            <h3>No comments yet</h3>
                        </div>
                        <form id = "commentForm" onSubmit = {handleSubmit}>
                            <div id="commentInputContainer">
                                <textarea id="commentInput" placeholder="Write a comment..." value={commentInput} onChange={(e) => setCommentInput(e.target.value)}/>
                                <button id="postBtn" type="submit">Post</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookModal;
