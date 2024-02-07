// Impport react 
import React from 'react';
// Import Links 
import { Link } from 'react-router-dom';
// Import styles 
import "./Homepage.css"
// Import hooks 
import { useState, useEffect } from "react";
// Import components

// Component 
export const Homepage = ({blogs, loading}) => {

    //States

    // Functions

    // Render
    return (
        <div className="Homepage">

            <div className="HP-Section">

                <div className="HP-Section-Header">
                    Blogs
                </div>

                <div className='HP-Section-Blogs'>
                    {loading ? (
                        <p>Loading posts...</p>
                    ) : (
                        blogs.map(blog => (
                            <div className="HP-Blog-Card" key={blog._id}>
                                <div className="HP-Post-Title">{blog.POST_TITLE}</div>
                                <div className="HP-Post-Author">by: {blog.POST_AUTHOR}</div>
                                <div className="HP-Post-Time">{blog.POST_TIMESTAMP}</div>
                                <div className="HP-Post-Bottom">
                                    <div className="HP-Post-Btn-Container">
                                        <Link to={`/post/${blog.POST_ID}`} className="HP-Post-Btn">Read</Link>
                                    </div>
                                    <div className="HP-Post-Intercation-Container">
                                        <div>
                                            <img className="HP-Post-Intercation-Img" src="public/icons/Heart.png" alt="HeartIcon"></img>
                                            {blog.POST_LIKES.length}
                                        </div>
                                        <div>
                                            <img className="HP-Post-Intercation-Img" src="public/icons/Comment.png" alt="CommentIcon"></img>
                                            {blog.POST_COMMENTS.length}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}