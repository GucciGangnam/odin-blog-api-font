import { useState, useEffect } from 'react';
import React from 'react';
// Import Routes 
import { Route, Routes } from 'react-router-dom'

// Import styles 
import './App.css';

// Imprt components 
import { Navbar } from './components/navBar';
// Impor Pages(components)
import { Homepage } from './pages/HomePage';
import { Readblog } from './pages/ReadBlog';



function App() {
  return (
    <div className='App'>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Homepage />}/>
        <Route path="/post/:id" element={<Readblog/>}/>
      </Routes>
    </div>
  )
}





// function App() { 
//   return ( 
//     <div className='App'>
//       <div className='App-NB'>
//         <Navbar/>
//       </div>
//       <div className='App-Content'>
//         <Homepage/>
//       </div>
//     </div>
//   )
// }
export default App;
