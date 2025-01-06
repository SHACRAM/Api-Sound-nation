import React from "react";
import { useState, useContext } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

//Composant page de connexion
export const Connection = () => {  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [messageConnect, setMessageConnect] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();
    const {setConnectInformation,refreshUserInformation} = useContext(AuthContext);
    const backEndConnect = true;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/authentication/signin`, {email, password, backEndConnect}, { withCredentials: true });

            if(response.data.status){
                setMessageConnect(response.data.message);
                setIsSuccess(true);
                await refreshUserInformation();
                setTimeout(() => {
                    navigate('/DisplayMainContent', {state: {userName: response.data.name}});
                }, 2000);

            }else{
                setMessageConnect(response.data.message);
                setIsSuccess(false);
            }

        }catch (error){
            setMessageConnect(error.response.data.message);
            console.error('There is an error:', error);
        }
    };
    
    


    return (
        <div className="flex flex-col items-center gap-[3em]">
            <img className="w-[6em]" src="/src/Images/Logo.png" alt="Image représentant le logo du festival Sound-nation" />
            <div className="flex flex-col border p-5 rounded-md gap-6 items-center">
                <h1 className="text-white text-[1.5rem]">Connexion</h1>
                <form className="flex flex-col gap-4">
                    <div className="flex flex-col items-start gap-1">
                        <label className="text-white" htmlFor="email">Email</label>
                        <input onChange={(e)=>setEmail(e.target.value)} className="bg-[#71A984] rounded-md w-[15em] p-1" type="email" id="email" required />
                    </div>
                    <div className="flex flex-col items-start gap-1">
                        <label className="text-white" htmlFor="password">Mot de passe</label>
                        <input onChange={(e)=>setPassword(e.target.value)} className="rounded-md bg-[#71A984] w-[15em] p-1" type="password" id="password" name="password" required />
                    </div>  
                </form>
                <button onClick={handleSubmit} type="submit" className="bg-[#71A984] text-white rounded-md w-[8em]  p-1 hover:opacity-70">Se connecter</button>
            </div>
            {messageConnect && (
                <p className={`flex justify-center w-[80%] p-3 text-white ${isSuccess ? 'bg-green-500' : 'bg-red-600'} md:w-[15em]`}>
                    {messageConnect}
                </p>
            )}
            
        </div>
    )
}