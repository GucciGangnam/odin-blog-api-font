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
    console.log(blogByID)

    // States 


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
                ) :(
                    blogByID && blogByID.POST_COMMENTS.length > 0 ? (
                        blogByID.POST_COMMENTS.map(comment => (
                            <div key={comment.COMMENT_ID}> {comment.text} </div>
                        ))
                    ) : (
                        <p>No comments</p>
                    )
                    )}
            </div>
            <button> Like </button>
            <br />
            <input type='area' placeholder='1000 max' />


        </div>
    )
}