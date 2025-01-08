import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { DisplayMainContent } from "../Pages/DisplayMainContent";
import axios from 'axios';
axios.defaults.withCredentials = true;

// Composant qui permet d'ajouter un utilisateur à la base de données
export const AddUserComponent = () => {
    const [email, setEmail] = useState('');
    const [identifiant, setIdentifiant] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();
    const role = "admin";


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!identifiant || !password || !email) {
            setMessage("Veuillez remplir tous les champs.");
            setIsSuccess(false);
            return;
        }
    
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/signup`, 
                { email, identifiant, password, role },
                { headers: { 'Content-Type': 'application/json' }}
            );
    
            if (response.data.status) {
                setMessage(response.data.message);
                setIsSuccess(true);
                setTimeout(() => {
                    navigate('/Utilisateur');
                }, 2000);
            } else {
                setMessage(response.data.message);
                setIsSuccess(false);
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setMessage(error.response.data.message);
            } else {
                setMessage('Erreur serveur, merci de réessayer ultérieurement');
            }
            setIsSuccess(false);
        }
    };


    return (<div className="flex flex-col items-center gap-[3em] mt-5">
        <h1 className="text-white text-[1.5rem]">Ajouter un utilisateur</h1>
        <div className="border rounded-md w-fit p-5 flex flex-col">
            <form className="flex flex-col gap-5 items-center">
                <div className="flex flex-col items-start gap-1">
                    <label className="text-white" htmlFor="email">Email</label>
                    <input onChange={(e)=>setEmail(e.target.value)} className="bg-[#71A984] rounded-md w-[15em] p-1" type="email" id="email" required />
                </div>
                <div className="flex flex-col items-start gap-1">
                    <label className="text-white" htmlFor="identifiant">Identifiant</label>
                    <input onChange={(e)=>setIdentifiant(e.target.value)} className="bg-[#71A984] rounded-md w-[15em] p-1" type="text" id="identifiant" required />
                </div>
                <div className="flex flex-col items-start">
                    <label className="text-white" htmlFor="password">Mot de passe</label>
                    <input onChange={(e)=>setPassword(e.target.value)} className="bg-[#71A984] rounded-md w-[15em] p-1" type="password" id="password" required />
                </div>
                <button onClick={handleSubmit} className="bg-[#71A984] rounded-md w-[10em] hover:opacity-70 mt-2">Créer un utilisateur</button>
            </form>
        </div>

        {message && (
                <p className={`flex justify-center w-[80%] p-3 text-white ${isSuccess ? 'bg-green-500' : 'bg-red-600'} md:w-[15em]`}>
                    {message}
                </p>
            )}
        


    </div>)



};