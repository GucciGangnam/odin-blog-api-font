// Import styles 
import "./Homepage.css"

// Import components

// Import hooks 
import { useState, useEffect } from "react";

// Component 
export const Homepage = () => {

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:3000/posts');
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const data = await response.json();
                console.log(data.allposts); // Log the fetched posts
                setBlogs(data.allposts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false); // Set loading state to false after fetch completes
            }
        };
        fetchPosts();
    }, []);
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
                                        <button className="HP-Post-Btn">Read</button>
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


// <div className='posts'>
//     {loading ? (
//         <p>Loading posts...</p>
//     ) : (
//         blogs.map(blog => (
//             <div key={blog.POST_ID}>
//                 <h3>{blog.POST_TITLE}</h3>
//                 <p>{blog.POST_CONTENT}</p>
//             </div>
//         ))
//     )}
// </div>