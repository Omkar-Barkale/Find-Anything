import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import "./styles/Comment.css"

function Comment(props){



    return(
        <>
            <div className="comment">
                <div className="comment-header">

                    <span className="comment-user">{props.username}</span>
                    <span className="comment-date">{props.date}</span>
                </div>

                <div className="comment-body">
                    <p>{props.commentText}</p>
                </div>
            </div>
        </>
    )
}

export default Comment;