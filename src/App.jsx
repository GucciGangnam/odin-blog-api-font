import { useState, useEffect } from 'react';
import React from 'react';

// Import styles 
import './App.css';

// Imprt components 
import { Navbar } from './components/navBar';
import { Homepage } from './pages/HomePage';



function App() { 
  return ( 
    <div className='App'>
      <div className='App-NB'>
        <Navbar/>
      </div>
      <div className='App-Content'>
        <Homepage/>
      </div>
    </div>
  )
}
export default App;
