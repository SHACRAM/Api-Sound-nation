import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const AddNewFaq = ({handleClickFaq, getDataFaq}) => {
    const [question, setQuestion] = useState("");
    const [reponse, setReponse] = useState("");
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();
    
    // Composant qui permet d'ajouter une question / réponse à la faq


    const handleSubmit = async (e)=>{
        e.preventDefault();

        try{
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/informations/addFaq`, {question, reponse});
            if(response.data.status){
                setMessage(response.data.message);
                setIsSuccess(true);
                setTimeout(()=>{
                    navigate('/Faq');
                }, 1500);
                
            }else{
                setMessage(response.data.message);
                setIsSuccess(false);
            }

        }catch(error){
            if(error.response){
                setMessage(error.response.data.message);
                setIsSuccess(false);
            }
        }
    }

    return(
        <div className="flex flex-col items-center mb-8 p-3">
            <h2 className="text-white text-[1.5rem] p-2">Ajouter une question / réponse</h2>
            <div className="border rounded-md w-full m-4">
                <form className="m-3 flex flex-col gap-5" onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center gap-5 lg:flex-row">
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="question" className="text-white text-[1.3rem]">Question</label>
                            <textarea  name="question" id="question" required className="rounded h-[8em] overflow-auto p-1" onChange={(e)=>setQuestion(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="reponse" className="text-white text-[1.3rem]">Réponse</label>
                            <textarea  name="reponse" id="reponse" required className="rounded h-[8em] overflow-auto p-1" onChange={(e)=>setReponse(e.target.value)} />
                        </div>
                    </div>
                    
                    <div className="flex justify-center items-end">
                    <button type="submit" className="text-white bg-[#023E33] hover:opacity-80 p-2 w-[7em] h-[3em] rounded-md sm:text-[1.2rem]">Ajouter</button>
                </div>
                </form>
            </div>
            {message && (
                <p className={`flex justify-center w-[80%] p-3 text-black ${isSuccess ? 'bg-green-500' : 'bg-red-600'} md:w-[15em]`}>
                    {message}
                </p>
            )}
        </div>
    )
};