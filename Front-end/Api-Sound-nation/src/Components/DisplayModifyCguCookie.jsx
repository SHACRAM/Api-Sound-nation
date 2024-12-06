import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export const DisplayModifyCguCookie = ({item}) => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [cat, setCat] = useState(item.category);
    const [title, setTitle] = useState(item.title);
    const [content, setContent] = useState(item.content);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = item.id;

        try{
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/informations/modifyCguCookie`, {id, cat, title, content} );
            if(response.data.status){
                setMessage(response.data.message);
                setIsSuccess(true);
                setTimeout(()=>{
                    navigate('/CguCookie');
                }, 2000);
            }

        }catch(error){
            if(error.response){
                setMessage(error.response.data.message);
                setIsSuccess(false);
            }else{
                setMessage("Une erreur s'est produite. Veuillez réessayer ultérieurement");
                setIsSuccess(false);
            }
        }
    };


    return(
        <div className="flex flex-col items-center w-full p-4">
            <h2 className="text-white text-center mt-5 text-[1.3rem]">Modifier une Cgu ou un cookie</h2>
            <form className="border rounded-md p-4 mt-5 flex flex-col gap-5 sm:flex-row sm:flex-wrap mb-5 w-full " onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2 sm:w-60">
                    <label className="text-white" htmlFor="cat">Catégorie</label>
                    <select id="cat" className="rounded-md h-8" value={cat} onChange={(e)=>setCat(e.target.value)}>
                        <option value=''>Choisir une catégorie</option>
                        <option value="cgu">Cgu</option>
                        <option value="cookie">Cookie</option>
                    </select>
                </div>
                <div className="flex flex-col gap-2 sm:w-[25em]">
                    <label className="text-white" htmlFor="title">Titre</label>
                    <input type="text" id="title" className="rounded-md p-1" required value={title} onChange={(e)=>setTitle(e.target.value)}/>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <label className="text-white" htmlFor="content">Contenu</label>
                    <textarea id="content" className="rounded-md p-1 h-40 sm:w-full" value={content} required onChange={(e)=>setContent(e.target.value)}></textarea>
                </div>
                <div className="flex justify-center w-full">
                    <button type="submit" className="text-white bg-[#023E33] hover:opacity-80 p-2 w-[7em] h-[3em] rounded-md sm:text-[1.2rem]">Modifier</button>
                </div>
            </form>
            {message && (
                <p className={`flex justify-center w-[80%] p-3 text-white ${isSuccess ? 'bg-green-500' : 'bg-red-600'} md:w-[15em]`}>
                    {message}
                </p>
            )}
        </div>
    )
};