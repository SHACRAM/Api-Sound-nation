import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'normalize.css';
import {AuthProvider} from "./Context/AuthContext";



createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider>
      <App />
     </AuthProvider>
  </StrictMode>,
)
