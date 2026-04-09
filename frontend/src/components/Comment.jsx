import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
function Comment(props){


    const userId = props.comment.userId;

    return(
        <>
            <div className="comment">
                <div className="comment-header">

                    <span className="comment-user">User: {user.username}</span>
                    <span className="comment-date">{props.date}</span>
                </div>

                <div className="comment-body">
                    <p>{props.comment}</p>
                </div>
            </div>
        </>
    )
}

export default Comment;