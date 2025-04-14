import React, { createContext } from 'react'
import { BrowserRouter , Routes, Route,  } from 'react-router-dom';
import Home from '../Screen/Rwaltz/Home.js';


export default function RoutesContainer() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
