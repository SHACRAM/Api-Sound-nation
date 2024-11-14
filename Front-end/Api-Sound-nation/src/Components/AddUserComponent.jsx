import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { DisplayMainContent } from "../Pages/DisplayMainContent";
import axios from 'axios';
axios.defaults.withCredentials = true;


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
            const response = await axios.post('http://localhost:3000/api/user/signup', 
                { email, identifiant, password, role },
                { headers: { 'Content-Type': 'application/json' }}
            );
    
            if (response.data.status) {
                setMessage(response.data.message);
                setIsSuccess(true);
                setTimeout(() => {
                    navigate('/DisplayMainContent');
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



    return (<div className="flex flex-col items-center gap-[3em]">
        <h1 className="text-white text-[1.5rem]">Ajouter un utilisateur</h1>
        <div className="border rounded-md w-fit p-5 flex flex-col">
            <form className="flex flex-col gap-5 items-center">
                <div className="flex flex-col items-start gap-1">
                    <label className="text-white" htmlFor="email">Email</label>
                    <input onChange={(e)=>setEmail(e.target.value)} className="bg-[#71A984] rounded-md" type="email" id="email" required />
                </div>
                <div className="flex flex-col items-start gap-1">
                    <label className="text-white" htmlFor="identifiant">Identifiant</label>
                    <input onChange={(e)=>setIdentifiant(e.target.value)} className="bg-[#71A984] rounded-md" type="text" id="identifiant" required />
                </div>
                <div className="flex flex-col items-start">
                    <label className="text-white" htmlFor="password">Mot de passe</label>
                    <input onChange={(e)=>setPassword(e.target.value)} className="bg-[#71A984] rounded-md" type="password" id="password" required />
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