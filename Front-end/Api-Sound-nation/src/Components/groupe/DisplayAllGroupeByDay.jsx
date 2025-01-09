import React from "react";
import { DeleteGroupe } from "./DeleteGroupe";
import { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

// Affiche les groupe en fonction du jour de leur concert
// Affiche le bouton supprimer si deleteGroupe est à true et execute l'appel à l'api pour supprimer le groupe
export const DisplayAllGroupeByDay = ({jour, dateConcert, setInfoModifyGroupe, handleAllGroupes}) => {
    const [displayDeleteGroupe, setDisplayDeleteGroupe] = useState(false);
    const [idToDelete, setIdToDelete] = useState();
    const [messageDeleteGroupe, setMessageDeleteGroupe] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);



    const handleClikModifyButton =(groupe)=>{
        setInfoModifyGroupe(groupe)
    }

    const displayDeleteGroupeComponent = (boolean)=>{
        setDisplayDeleteGroupe(boolean);
    }

    const handleClickDeleteGroupeButton = (groupe)=>{
        setIdToDelete(groupe.id);
    }
    


    const handleDeleteGroupe = async ()=>{
       
        try{
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/groupes/${idToDelete}`);

            if(response.data.status){
                setMessageDeleteGroupe(response.data.message);
                setIsSuccess(true);
                setTimeout(()=>{
                    displayDeleteGroupeComponent(false);
                    handleAllGroupes();
                }, 2000)
            } else{
                setMessageDeleteGroupe(response.data.message);
                setIsSuccess(false);
            }

        }catch (error){
            setMessageDeleteGroupe("Erreur serveur merci d'essayer plus tard");
            setIsSuccess(false);
        }

    }



    return (
        <div className="flex flex-col"> 
            <div className="p-3">
                <h2 className="text-white text-[1.3rem]">{dateConcert}</h2>
            </div>
            <div className="p-5 flex flex-wrap gap-8 justify-center">
                {jour.map((groupe, index)=>(
                <div key={index} className="border border-white flex flex-col items-center rounded-md">
                    <h2 className="text-white text-[1.4rem] p-2">{groupe.groupe_name}</h2>
                    <div>
                        <img src={`${import.meta.env.VITE_API_URL}/${groupe.groupe_image_path}`} alt={groupe.groupe_image_alt} className="text-white w-[16em] p-3 rounded sm:w-[12em]"/>
                    </div>
                    <div className="flex flex-col gap-3 p-3 w-[100%] ml-6">
                        <div className="flex gap-3">
                            <img src="src/images/Hour.svg" alt="Icone représentant une horloge" className="w-[1.5em]"/>
                            <p className="text-white">{groupe.groupe_hour} h</p>
                        </div>
                        <div className="flex gap-3">
                            <img src="src/images/Stage.svg" alt="Logo d'une scène de concert" className="w-[1.5em]"/>
                            <p className="text-white">Scène {groupe.groupe_scene}</p>
                        </div>
                    </div>
                    <div className="flex gap-4 mt-2 sm:p-2">
                        <div className="flex items-center">
                             <NavLink to='/ModifyGroupePage' state={groupe} className="text-white w-[6em] bg-[#023E33] p-2 mb-4 rounded-md text-center" onClick={()=>handleClikModifyButton(groupe)} >Modifier</NavLink>
                        </div>
                        
                        <div>
                            <button className="text-white w-[6em] bg-red-600 p-2 mb-4 rounded-md" onClick={()=>{handleClickDeleteGroupeButton(groupe) ;displayDeleteGroupeComponent(true)}} >Supprimer</button>
                        </div> 
                    </div>
                    
                            
                </div>
                
            ))}
                </div>
                {displayDeleteGroupe &&
                <div >
                    <div className="fixed top-0 z-10 bg-black border w-[100%] h-[100vh] opacity-80 "></div>
                    <div className="z-20 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <DeleteGroupe displayDeleteGroupeComponent={displayDeleteGroupeComponent} handleDeleteGroupe={handleDeleteGroupe} messageDeleteGroupe={messageDeleteGroupe} isSuccess={isSuccess} />
                    </div>
                    
                </div>}
        </div>
    )
};