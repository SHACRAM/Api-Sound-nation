import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import 'normalize.css';
import { ConnectionPage } from './Pages/ConnectionPage'
import { AddUser } from './Pages/AddUser'
import { Accueil } from './Pages/Accueil'




function App() {
  return (
    <Router>
      <Routes>
      <Route path='/' element={<ConnectionPage/>}/>
      <Route path='/AddUser' element={<AddUser/>}/>
      <Route path='/Accueil' element={<Accueil/>}/>
      </Routes>
    </Router>
  )
  
}

export default App 
