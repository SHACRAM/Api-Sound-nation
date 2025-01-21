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
import { AddGroupe } from './Pages/AddGroupe';
import {AddPartner} from './Pages/AddPartner';
import {AddPlace} from './Pages/AddPlace';
import {AddFaq} from './Pages/AddFaq';
import {AddInfoPratique} from './Pages/AddInfoPratique';
import { AddCguCookie } from './Pages/AddCguCookie';






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
      <Route path='/AddGroupe' element={<AddGroupe/>}/>
      <Route path='/AddPartner' element={<AddPartner/>}/>
      <Route path='/AddPlace' element={<AddPlace/>}/>
      <Route path='/AddFaq' element={<AddFaq/>}/>
      <Route path='/AddInfoPratique' element={<AddInfoPratique/>}/>
      <Route path='/AddCguCookie' element={<AddCguCookie/>}/>
      </Routes>
    </Router>
  )
  
}

export default App 
