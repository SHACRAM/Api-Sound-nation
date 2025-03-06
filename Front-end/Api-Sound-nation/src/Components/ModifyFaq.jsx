import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// Composant qui permet de modifier une question / réponse de la faq

export const ModifyFaq = ({data, setActiveComponentFaq, getDataFaq}) => {
    const [question, setQuestion] = useState(data.question);
    const [reponse, setReponse] = useState(data.reponse);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const id = data.id;
    const navigate = useNavigate();



    const handleSubmit = async (e)=>{
        e.preventDefault();

        try{
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/informations/${id}`, {question, reponse});
            if(response.data.status){
                setMessage(response.data.message);
                setIsSuccess(true);
                setTimeout(()=>{
                    setMessage('');
                    navigate('/Faq');
                }, 2000);
            }
        }catch(error){
            if(error.response){
                setMessage(error.response.data.message);
                setIsSuccess(false);
            }
        }
    }


    return(
        <div className="flex flex-col items-center">
            <h1 className="text-white text-center text-[1.5rem] mt-5">Modifier ma faq</h1>
            <div className="border w-full mt-4 mb-4">
                <form className="m-3 flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="flex flex-col items-center gap-5 sm:flex-row">
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="question" className="text-white text-[1.3rem]">Question</label>
                            <textarea  name="question" id="question" required className="rounded h-[8em] overflow-auto p-1" value={question} onChange={(e)=>setQuestion(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="reponse" className="text-white text-[1.3rem]">Réponse</label>
                            <textarea  name="reponse" id="reponse" required className="rounded h-[8em] overflow-auto p-1" value={reponse} onChange={(e)=>setReponse(e.target.value)} />
                        </div>
                    </div>
                    <div className="flex justify-center items-end">
                    <button type="submit" className="text-white bg-[#023E33] hover:opacity-80 p-2 w-[15em] h-[3em] rounded-md sm:text-[1.2rem]">Enregistrer les modifications</button>
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