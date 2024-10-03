import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { ConnectionPage } from './Pages/ConnectionPage'
import { AddUser } from './Pages/AddUser'



function App() {
  return (
    <Router>
      <Routes>
      <Route path='/' element={<ConnectionPage/>}/>
      <Route path='/AddUser' element={<AddUser/>}/>
      </Routes>
    </Router>
  )
  
}

export default App 
