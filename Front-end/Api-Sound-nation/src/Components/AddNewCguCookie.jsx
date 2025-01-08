import React from "react";
import { useState } from "react";
import axios from "axios";
// Composant qui permet d'ajouter une nouvelle cgu ou cookie
export const AddNewCguCookie = ({handleClickCguCookie, getData}) => {
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [cat, setCat] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!cat || !title || !content){
            setMessage('Merci de remplir tous les champs');
            setIsSuccess(false);
            return;
        }

        try{    
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/informations/addCguCookie`, {cat, title, content});
            if(response.data.status){
                setMessage(response.data.message);
                setIsSuccess(true);
                setTimeout(()=>{
                    setMessage('');
                    handleClickCguCookie(0);
                    getData();
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
            <form className="border rounded-md p-4 mt-5 flex flex-col gap-5 sm:flex-row sm:flex-wrap mb-5 w-full " onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2 sm:w-60">
                    <label className="text-white" htmlFor="cat">Catégorie</label>
                    <select id="cat" className="rounded-md h-8" onChange={(e)=>setCat(e.target.value)}>
                        <option value=''>Choisir une catégorie</option>
                        <option value="cgu">Cgu</option>
                        <option value="cookie">Cookie</option>
                        <option value='pData'>Données personnelles</option>
                    </select>
                </div>
                <div className="flex flex-col gap-2 sm:w-[25em]">
                    <label className="text-white" htmlFor="title">Titre</label>
                    <input type="text" id="title" className="rounded-md p-1" required onChange={(e)=>setTitle(e.target.value)}/>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <label className="text-white" htmlFor="content">Contenu</label>
                    <textarea id="content" className="rounded-md p-1 h-40 sm:w-full" required onChange={(e)=>setContent(e.target.value)}></textarea>
                </div>
                <div className="flex justify-center w-full">
                    <button type="submit" className="text-white bg-[#023E33] hover:opacity-80 p-2 w-[7em] h-[3em] rounded-md sm:text-[1.2rem]">Ajouter</button>
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