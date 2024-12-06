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
import { Utilisateur } from './Pages/Utilisateur';
import { Faq } from './Pages/Faq';
import { InfoPratique } from './Pages/InfoPratique';
import { ModifyInfoPratique } from './Pages/ModifyInfoPratique';
import { CguCookie } from './Pages/CguCookie';
import { ModifyCguCookie } from './Pages/ModifyCguCookie';
import { ModifyGroupePage } from './Pages/ModifyGroupePage';
import { ModifyPartnerPage } from './Pages/ModifyPartnerPage';
import { ModifyPlacePage } from './Pages/ModifyPlacePage';
import { ModifyFaqPage } from './Pages/ModifyFaqPage';





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
      <Route path='/Utilisateur' element={<Utilisateur/>}/>
      <Route path='/Faq' element={<Faq/>}/>
      <Route path='/InfoPratique' element={<InfoPratique/>}/>
      <Route path='/ModifyInfoPratique' element={<ModifyInfoPratique/>}/>
      <Route path='/CguCookie' element={<CguCookie/>}/>
      <Route path='/ModifyCguCookie' element={<ModifyCguCookie/>}/>
      <Route path='/ModifyGroupePage' element={<ModifyGroupePage/>}/>
      <Route path='/ModifyPartnerPage' element={<ModifyPartnerPage/>}/>
      <Route path='/ModifyPlacePage' element={<ModifyPlacePage/>}/>
      <Route path='/ModifyFaqPage' element={<ModifyFaqPage/>}/>
      </Routes>
    </Router>
  )
  
}

export default App 
