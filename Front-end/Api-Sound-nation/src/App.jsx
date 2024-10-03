import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { ConnectionPage } from './Pages/ConnectionPage'



function App() {
  return (
    <Router>
      <Routes>
      <Route path='/' element={<ConnectionPage/>}/>
      </Routes>
    </Router>
  )
  
}

export default App 
