// impprt react 
import React from 'react';// Import Styles 
// Import Links
import { Link } from 'react-router-dom';

// Imports styles
import "./Navbar.css"

// Import compoenents 

// Nav bar 

// DELETE ME // function to create sample post 
const createSamplePost = async () => {
    try {
        const response = await fetch('http://localhost:3000/posts/samplepost', {
            method: 'POST', // specify the HTTP method
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        console.log(data); // Log the fetched posts
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
};




export const Navbar = () => {
    return (
        <div className="Navbar">
            <div className="NB-left">
                <Link to={`/`} className="NB-Home-Btn">Home</Link>
            </div>
            <div className="NB-mid">
                <input className="NB-input"></input>
                <button className="NB-search-btn">?</button>
            </div>
            <div className="NB-right">
                <button onClick={createSamplePost} className="NB-btn">Create</button>
                <Link to={`/signup`} className="HP-Post-Btn">Sign up</Link>
                <Link to={`/login`} className="HP-Post-Btn">Long in</Link>
            </div>
        </div>
    )
}