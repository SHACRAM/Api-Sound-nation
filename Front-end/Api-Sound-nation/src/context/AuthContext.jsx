import React from "react";
import { createContext, useState, useEffect } from "react";
export const AuthContext = createContext();
import axios from 'axios';


// Context qui permet de récupérer les informations de connexion de l'utilisateur
export const AuthProvider = ({ children }) => {
    const [connectInformation, setConnectInformation] = useState(null);
    const [loading, setLoading] = useState(true);
  
    const handleUserInformation = async () => {
      try {
          const response = await axios.get('http://localhost:3000/api/users/connectInformation', { withCredentials: true });
          if (response.status === 200) {
              setConnectInformation(response.data.data);
          } else {
              setConnectInformation(null);
          }
      } catch (error) {
          setConnectInformation(null);
      } finally {
          setLoading(false);
      }
  }
  
    useEffect(() => {
      handleUserInformation();
    }, []);
  
    return (
      <AuthContext.Provider value={{ connectInformation, setConnectInformation, loading }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
