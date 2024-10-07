import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import 'normalize.css';
import { ConnectionPage } from './Pages/ConnectionPage'
import { AddUser } from './Pages/AddUser'
import { DisplayMainContent } from './Pages/DisplayMainContent'




function App() {
  return (
    <Router>
      <Routes>
      <Route path='/' element={<ConnectionPage/>}/>
      <Route path='/AddUser' element={<AddUser/>}/>
      <Route path='/DisplayMainContent' element={<DisplayMainContent/>}/>
      </Routes>
    </Router>
  )
  
}

export default App 
