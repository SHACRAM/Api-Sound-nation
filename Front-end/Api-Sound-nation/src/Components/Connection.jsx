import React from "react";
import { useState } from "react";
import axios from 'axios';
//Composant page dde connexion
export const Connection = () => {  
    const [identifiant, setIdentifiant] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post('', {identifiant, password});

            if(response.data.status){
                setMessage(response.data.message);
                //TODO : Rediriger vers la page d'accueil
                //TODO : Stocker le token dans les cookies ou le local storage
                //TODO : Stocker l'utilisateur dans le local storage ou les cookies

            }else{
                setMessage(response.data.message);
            }

        }catch (error){
            setMessage('Erreur de connexion');
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
                        <label className="text-white" htmlFor="identifiant">Identifiant</label>
                        <input onChange={(e)=>setIdentifiant(e.target.value)} className="rounded-md bg-[#71A984]" type="text" id="identifiant" name="identifiant" />
                    </div>
                    <div className="flex flex-col items-start gap-1">
                        <label className="text-white" htmlFor="password">mot de passe</label>
                        <input onChange={(e)=>setPassword(e.target.value)} className="rounded-md bg-[#71A984]" type="text" id="password" name="password" />
                    </div>  
                </form>
                <button onClick={handleSubmit} type="submit" className="bg-[#71A984] text-white rounded-md w-[8em] ml-6 p-1">Se connecter</button>
            </div>
            
        </div>
    )
}