

// impprt react 
import React from 'react';// Import Styles 
// Import Links
import { Link } from 'react-router-dom';

// Imports styles
import "./Navbar.css"

// Import compoenents 

// Nav bar 

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
                <button className="NB-btn">Create</button>
                <button className="NB-btn">Sign up</button>
                <button className="NB-btn">Log in</button>
            </div>
        </div>
    )
}