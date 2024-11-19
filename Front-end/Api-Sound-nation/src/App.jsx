import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import 'normalize.css';
import { ConnectionPage } from './Pages/ConnectionPage'
import { AddUser } from './Pages/AddUser'
import { DisplayMainContent } from './Pages/DisplayMainContent'
import { Groupe } from './Pages/Groupe';
import { Partenaire } from './Pages/Partenaire';
import { Carte } from './Pages/Carte';




function App() {
  return (
    <Router>
      <Routes>
      <Route path='/' element={<ConnectionPage/>}/>
      <Route path='/AddUser' element={<AddUser/>}/>
      <Route path='/DisplayMainContent' element={<DisplayMainContent/>}/>
      <Route path='/Groupe' element={<Groupe/>}/>
      <Route path='/Partenaire' element={<Partenaire/>}/>
      <Route path='/Carte' element={<Carte/>}/>
      </Routes>
    </Router>
  )
  
}

export default App 
