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
export const Readblog = () => { 

    // Variables 
    const { id } = useParams();

    //API 
    
    return( 
        <div className='Readblog'>
            Hello from ReadBlog: 
            You are reading the post with teh id of: 
            {id}
        </div>
    )
}