import { useState, useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import './styles/BookModal.css'
import Card from './Card'
import { jwtDecode } from 'jwt-decode';
import Comment from './Comment';



function BookModal(props){


    const token = localStorage.getItem('token');
    const user = token ? jwtDecode(token) : null;
    const currentUserId = user?._id;
    const [comments, setComments] = useState([]);
    const[commentInput, setCommentInput] = useState("");
    const [showComments, setShowComments] = useState(true);
    const [newCommentCount, setNewCommentCount] = useState(0);
    const [baseCommentCount, setBaseCommentCount] = useState(0);
    const [firstLoad, setFirstLoad] = useState(false);
    const [visibleCount, setVisibleCount] = useState(5);
    const [downloadError, setDownloadError] = useState("");



    useEffect(()=>{
        function fetchComments(){
            fetch(`http://localhost:3000/search/${props.id}/comments`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
            })
            .then(res => res.json())
            .then(data => {
                setComments(data); //show comment alerts, except for user who posted it, reset on close modal
                const others = data.filter(c => c.userId !== currentUserId);
                if (!firstLoad) {
                    setBaseCommentCount(others.length);
                    setFirstLoad(true);
                    return;
                }
                const newCount = others.length - baseCommentCount;
                setNewCommentCount(newCount > 0 ? newCount : 0);
            })
            .catch(err=>{
                console.error("Error fetching comments", err);
            });
    }
        fetchComments();
        const interval = setInterval(fetchComments, 2000);//fetch from DB every 2 second for async updates
        return ()=>clearInterval(interval);


    },[props.id, baseCommentCount]); //load all new comments for each book

    

    function handleSubmit(e){
        e.preventDefault();

        if(!token){
            alert("You must be logged in to post comments");
            setCommentInput("");
            return;
        }


        fetch(`http://localhost:3000/search/${props.id}/comments`, {
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
    function handleClose() { 
        const others = comments.filter(c => c.userId !== currentUserId);
        setBaseCommentCount(others.length);
        setNewCommentCount(0);
        setFirstLoad(false);
        props.onClose();
    }
    
    async function getFile(){
        setDownloadError("");
        if(!token){
            alert("You must be logged in to download files");
            return;
        }
        try{
            if(user)
            console.log("Attempting to download file with token:", token , "for Book ID:", props.id);
       
            const response = await fetch(`http://localhost:3000/search/file/${props.id}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if(!response.ok){
                const data = await response.json();
                throw new Error(data.message);
            }
            const file = await response.blob();
            const url = URL.createObjectURL(file);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${props.name}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (err) {
            console.error("Error downloading file", err);
            setDownloadError(err.message || "Failed to download file");
        }
    }

    return(
        
        <>
            <div id = "modalOverlay" onClick={handleClose}>
                <div id="modalStyle" onClick={(e) => e.stopPropagation()}>  {/*does not notify the parent to close since we only want it to close outside or x*/}
                    <div id = "bookSide">
                        <button id = "close" onClick={handleClose}>x</button>
                        <div id = "bookContainer">
                            <img src={props.cover} id="bookCover"/>
                        </div>
                        <div id = "bookInfo">
                            <h4 className = "bookName">{props.name}</h4>
                            <h5 className = "author">{props.author}</h5>
                            <p className="bookDescription"> {props.description} </p>
                            <button id = "downloadButton" onClick = {getFile}>Download</button>
                            {downloadError && <span style={{color: 'red', fontSize: '0.9em', marginTop: '5px', display: 'block'}}>{downloadError}</span>}
                        </div>
                    </div>




                    <div id = "commentSide">
                            <button className = "toggleCommentsBtn" onClick={() => setShowComments(prev => !prev)}>
                                {showComments ? "Hide Comments" : "Show Comments"}
                            </button>
                                {newCommentCount > 0 && (
                                <span className="commentAlert">
                                    {newCommentCount} new comments
                                </span>
                                )}
                            {showComments && (
                            <div id="commentSection">
                                {checkComments()}
                                {comments.slice(0,visibleCount).map((c) => (
                                <Comment
                                    key={c._id}
                                    username={c.username}
                                    date={new Date(c.createdAt).toLocaleDateString()}
                                    commentText={c.comment}
                                />
                                ))}
                                {comments.length > visibleCount && (
                                    <button className ="seeMoreBtn"  onClick={() => setVisibleCount(prev => prev + 10)}> See more comments</button>

                                )}
                            </div>
                            
                            )}
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
