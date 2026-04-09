import { useState, useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import './styles/BookModal.css'
import Card from './Card'
import { jwtDecode } from 'jwt-decode';
import Comment from './Comment';


function BookModal(props){

    //if not logged in and click comment give them message saying must be logged in

    const token = localStorage.getItem('token');
    const [comments, setComments] = useState([]);
    const[commentInput, setCommentInput] = useState("");

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
        })
        .catch(err=>{
            console.error("Error fetching comments", err);
        });
    },[props.id]); //load all new comments for each book

    function handleSubmit(e){
        e.preventDefault();


        fetch(`http://localhost:3000/books/${props.id}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },  
            body: JSON.stringify({
                comment : commentInput,
            })
        })
        .then(async res => {
            const data = await res.json();
            if(!res.ok)
                throw new Error(data.message);

            setComments(prev => [data, ...prev]);
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

    function checkComments(){
        if(comments.length <=0)
        {
            return <h3>No comments yet</h3>;
        }
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
                            

                            {checkComments()}
                            
                             {comments.map((c) => (
                                    <Comment
                                        key={c._id}
                                        username={c.username}
                                        date={new Date(c.createdAt).toLocaleDateString()}
                                        commentText={c.comment}
                                    />
                            ))}
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
