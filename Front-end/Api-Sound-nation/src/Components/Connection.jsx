import React from "react";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { DisplayMainContent } from "../Pages/DisplayMainContent";

//Composant page de connexion
export const Connection = () => {  
    const [email, setEmail] = useState('');
    const [identifiant, setIdentifiant] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [messageConnect, setMessageConnect] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post('http://localhost:3000/api/authentication/signin', {email, identifiant, password, role}, { withCredentials: true });

            if(response.data.status){
                setMessageConnect(response.data.message);
                setIsSuccess(true);
                setTimeout(() => {
                    navigate('/DisplayMainContent', {state: {userName: response.data.name}});
                }, 2000);

            }else{
                setMessageConnect(response.data.message);
                setIsSuccess(false);
            }

        }catch (error){
            setMessageConnect('Erreur de connexion');
            console.error('There is an error:', error);
        }
    };
    
    


    return (
        <div className="flex flex-col items-center gap-[3em]">
            <img className="w-[6em]" src="/src/Images/Logo.png" alt="Image représentant le logo du festival Sound-nation" />
            <div className="flex flex-col border p-5 rounded-md gap-6">
                <h1 className="text-white text-[1.5rem]">Connexion</h1>
                <form className="flex flex-col gap-4">
                    <div className="flex flex-col items-start gap-1">
                        <label className="text-white" htmlFor="email">Email</label>
                        <input onChange={(e)=>setEmail(e.target.value)} className="bg-[#71A984] rounded-md" type="email" id="email" required />
                    </div>
                    <div className="flex flex-col items-start gap-1">
                        <label className="text-white" htmlFor="identifiant">Identifiant</label>
                        <input onChange={(e)=>setIdentifiant(e.target.value)} className="rounded-md bg-[#71A984]" type="text" id="identifiant" name="identifiant" required />
                    </div>
                    <div className="flex flex-col items-start gap-1">
                        <label className="text-white" htmlFor="password">mot de passe</label>
                        <input onChange={(e)=>setPassword(e.target.value)} className="rounded-md bg-[#71A984]" type="password" id="password" name="password" required />
                    </div>  
                </form>
                <button onClick={handleSubmit} type="submit" className="bg-[#71A984] text-white rounded-md w-[8em] ml-6 p-1 hover:opacity-70">Se connecter</button>
            </div>
            {messageConnect && (
                <p className={`flex justify-center w-[80%] p-3 text-white ${isSuccess ? 'bg-green-500' : 'bg-red-600'} md:w-[15em]`}>
                    {messageConnect}
                </p>
            )}
            
        </div>
    )
}