import { useState, useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import './styles/BookModal.css'
import Card from './Card'
import { jwtDecode } from 'jwt-decode';

function BookModal(props){

    //if not logged in and click comment give them message saying must be logged in

    const token = localStorage.getItem('token');
    const [comments, setComments] = useState([]);
    const[commentInput, setCommentInput] = useState("");
    const[loading, setLoading] = useState(true);

    useEffect(()=>{
        fetch(`http://localhost:3000/books/${props.id}/comments`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
        })
        .then(res => res.json())
        .then(data =>{
            setComments(data);
            setLoading(false);
        })
        .catch(err=>{
            console.error("Error fetching comments", err);
            setLoading(false);
        });
    },[props.id]); //load all new comments for each book

    function handleSubmit(e){
        e.preventDefault();


        if (!token) {
            alert("You must be logged in to create a comment");
            return;
        }

        if(!commentInput){
            alert("Enter something");
            return;
        }


        fetch(`http://localhost:3000/books/${props.id}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },  
            body: JSON.stringify({
                comment : commentInput,
            })
        })
        .then(async res => {
            const data = await res.json();
            if(!res.ok)
                throw new Error(data.message);
            setCommentInput("");
            return data;
            
        })
        .then(data => {
            console.log(data);
            e.target.reset();
        })
        .catch(err => {
            console.error("Comment error: ", err.message);
        });
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
                            <h1>{comments.length > 0? comments[0].comment : "bruh what happeing"}</h1>
                        </div>
                        <form id = "commentForm" onSubmit = {handleSubmit}>
                            <div id="commentInputContainer">
                                <textarea id="commentInput" placeholder="Write a comment..." value={commentInput} onChange={(e) => setCommentInput(e.target.value)}/>
                                <button id="postBtn" type="submit" disabled={!commentInput.trim() }>Post</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookModal;
