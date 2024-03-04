import React, { useState, useEffect } from 'react';
// Import Routes 
import { Route, Routes } from 'react-router-dom'
// Import styles 
import './App.css';



// Imprt components 
import { Navbar } from './components/navBar';
// Impor Pages(components)
import { Homepage } from './pages/HomePage';
import { Readblog } from './pages/ReadBlog';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';



function App() {
  // States
  const [userAccessToken, setUserAccessToken] = useState("")
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  // Ese effect to console.log UAT when its changed 
  useEffect(() => { 
    console.log(userAccessToken)
  }, [userAccessToken])
  // API FETCH ALL BLOGS
  // API FETCH
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
    <div className='App'>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Homepage blogs={blogs} loading={loading}/>}/>
        <Route path="/post/:id" element={<Readblog blogs={blogs} loading={loading}/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login setUserAccessToken={setUserAccessToken}/>} />
      </Routes>
    </div>
  )
}
export default App;
