import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// Composant qui permet d'ajouter une nouvelle information pratique
export const AddNewInfoPratique = ({handleClickInfoPratique, getData}) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [information, setInformation] = useState("");
    const [message, setMessage] = useState("");
    const[isSuccess, setIsSuccess] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/informations/addInfoPratique`, {title, information});
            if(response.data.status){
                
                setMessage(response.data.message);
                setIsSuccess(true);
                setTimeout(()=>{
                    handleClickInfoPratique(0);
                    getData();
                }, 2000);
            }

        }catch(error){
            if(error.response){
                setMessage(error.response.data.message);
                setIsSuccess(false);
            } else{
                setMessage("Une erreur s'est produite. Veuillez réessayer plus tard");
                setIsSuccess(false);
            }
        }
    };

    return(
        <div className="flex flex-col items-center w-full p-4">
            <h1 className="text-white text-center text-[1.5rem] p-2">Ajouter une nouvelle information</h1>
            <form onSubmit={handleSubmit} className="border rounded-md p-2 flex flex-col gap-4 w-full mb-5">
                <div className="flex flex-col gap-2">
                    <label htmlFor="title" className="text-white text-[1.3rem]">Titre</label>
                    <input type="text" id="title" className="rounded-md p-1" required onChange={(e)=>setTitle(e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="information" className="text-white text-[1.3rem]">Information</label>
                    <textarea id="information" className="rounded-md p-1 h-[10em] lg:h-[20em]" required onChange={(e)=>setInformation(e.target.value)}></textarea>
                </div>
                <div className="flex justify-center items-end">
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
}