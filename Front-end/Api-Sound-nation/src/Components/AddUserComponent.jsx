import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from 'axios';


export const AddUserComponent = () => {
    const [identifiant, setIdentifiant] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post('http://localhost:3000/api/user/signup', {identifiant, password});

            if(response.data.status){
                setMessage(response.data.message);
                setIsSuccess(true);
                //TODO rediriger vers la page d'accueil
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }else{
                setMessage(response.data.message);
                setIsSuccess(false);
            }
        } catch (error){
            console.error('There is an error:', error);
            setMessage('Erreur serveur, merci de réessayer ultérieurement');
        }
    };



    return (<div className="flex flex-col items-center gap-[3em]">
        <h1 className="text-white text-[1.5rem]">Ajouter un utilisateur</h1>
        <div className="border rounded-md w-fit p-5 flex flex-col">
            <form className="flex flex-col gap-5 items-center">
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
                <p className={`flex justify-center w-[80%] p-3 text-white ${isSuccess ? 'bg-green-500' : 'bg-red-600'}`}>
                    {message}
                </p>
            )}
        


    </div>)



};