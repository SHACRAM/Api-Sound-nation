import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { DeleteInfoPratique } from "./DeleteInfoPratique";






// Composant qui affiche toutes les infos pratiques
export const DisplayAllInfoPratique = ({data, handleInfoModifyInfoPratique,getData}) => {
    const [messageDelete, setMessageDelete] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [displayDeleteDiv, setDisplayDeleteDiv] = useState(false);
    const [infoForDeleteInfoPratique, setInfoForDeleteInfoPratique] = useState({});


    const displayDeletePage = (boolean)=>{
        setDisplayDeleteDiv(boolean);
    }

    const handleDeleteInfoPratique = (info) => {
        setInfoForDeleteInfoPratique(info);
    };

    const handleDelete = async () => {
        const id = infoForDeleteInfoPratique.id;

        try{
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/informations/deleteInfoPratique`, {id});
            if(response.data.status){
                setMessageDelete(response.data.message);
                setIsSuccess(true);
                setTimeout(()=>{
                    displayDeletePage(false);
                    getData();
                    setMessageDelete('');
                }, 1000);
            }
        }catch(error){
            if(error.response){
                setMessageDelete(error.response.data.message);
                setIsSuccess(false);
            }
        }
    };



    return(
        <div className="mt-4">
            {data.length === 0 ? 
            <div className="border rounded-md m-4">
                <p className="text-white p-4">Aucune information enregistrée</p>
            </div> :
            <div className="p-4 flex flex-col gap-5 lg:flex-row lg:flex-wrap lg:justify-center">
                {data.map((info, index) => (
                    <div key={index} className="border rounded-md flex flex-col gap-3 p-2 lg:w-[30em]">
                        <div className="flex flex-col gap-1">
                            <p className="text-white">Titre :</p>
                            <p className="text-white">{info.title}</p>
                        </div>
                        <div className="flex flex-col gap-2 ">
                            <p className="text-white">information :</p>
                            <p className="text-white h-60 overflow-auto">{info.information}</p>
                        </div>
                        <div className="flex gap-4 mt-2 sm:p-2 justify-center items-center">
                            <div className="flex items-center">
                                <NavLink to='/ModifyInfoPratique' state={info} className="text-white w-[6em] bg-[#023E33] p-2 mb-4 rounded-md text-center" onClick={()=>handleInfoModifyInfoPratique(info)}   >Modifier</NavLink>
                            </div>
                    
                            <div className="flex items-center">
                                <button className="text-white w-[6em] bg-red-600 p-2 mb-4 rounded-md" onClick={()=>{displayDeletePage(true), handleDeleteInfoPratique(info)}}  >Supprimer</button>
                            </div> 
                        </div>
                    </div>
                ))}
            </div>}
            {displayDeleteDiv &&
                <div >
                    <div className="fixed top-0 z-10 bg-black border w-full h-[100%] opacity-80 "></div>
                    <div className="z-20 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <DeleteInfoPratique displayDeletePage={displayDeletePage} messageDelete={messageDelete} isSuccess={isSuccess} handleDelete={handleDelete}  />
                    </div>
                    
                </div>}
        </div>
    )
}