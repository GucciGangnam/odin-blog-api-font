// Impport react 
import React from 'react';
// Import from react-router-dom
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom"
// Import Styles 
import "./Readblog.css"
// Import hooks 
import { useState, useEffect } from "react";
// Import components

// Component 
export const Readblog = ({ blogs, loading }) => {

    // Variables 
    const { id } = useParams();
    const blogByID = blogs.find(blog => blog.POST_ID === id);

    // States 
    const [commentData, setCommentData] = useState("");

    // Input change handlers
    const handleCommenntChange = (e) => {
        const newComment = e.target.value;
        setCommentData(newComment);
    }

    // Button Hgandlers 
    const postComment = async (e) => {
        e.preventDefault();
        const userAccessToken = localStorage.getItem("UserAccessToken")
        try {
            const response =  await fetch(`http://localhost:3000/posts/comment`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': userAccessToken
                    },
                    body: JSON.stringify({
                        postID: id,
                        comment: commentData
                    }),
                    credentials: 'include',
                });
            if (response.ok) {
                console.log('response is OK!');
            } else {
                console.log("response not OK")
                const error = await response.json();
                console.log(error)
            }

        } catch (err) {
            console.error(err)
        }
    }


    // Redner
    return (
        <div className='Readblog'>
            <div className="RB-Blog-Header">
                {loading ? (
                    <p>Loading title...</p>
                ) : (
                    <p>{blogByID.POST_TITLE} by: {blogByID.POST_AUTHOR}</p>
                )}
            </div>

            <div className='RB-Content'>
                {loading ? (
                    <p>Loading posts...</p>
                ) : (
                    <p>{blogByID.POST_CONTENT}</p>
                )}
            </div>

            <div className='RB-Comments-Section'>
                {loading ? (
                    <p>Loading comments...</p>
                ) : (
                    blogByID && blogByID.POST_COMMENTS.length > 0 ? (
                        blogByID.POST_COMMENTS.map(comment => (
                            <div key={comment.COMMENT_ID}> {comment.COMMENT_CONTENT} {comment.COMMENT_TIMESTAMP} </div>
                        ))
                    ) : (
                        <p>No comments</p>
                    )
                )}
            </div>
            <button> Like </button>
            <br />
            <form onSubmit={postComment}>
                <input type='area' maxLength={1000} placeholder='1000 max' onChange={handleCommenntChange} />
                <button type='submit'>Comment</button>
            </form>


        </div>
    )
}