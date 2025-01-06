import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

export const DisplayAllCguAndCookiesComponent = ({item, handleDeleteDiv, handleItemToDelete}) => {
    



    return(
        <div className="border rounded-md p-2 m-4">
            <div className="flex flex-col gap-5 h-60">
                <div className="flex flex-col gap-1">
                    <p className="text-white">Titre :</p>
                    <p className="text-white">{item.title}</p>
                </div>
                <div className="flex flex-col gap-1 mt-3 overflow-auto">
                    <p className="text-white">Contenu :</p>
                    <p className="text-white">{item.content}</p>
                </div>
            </div>
            <div className="flex gap-4 mt-4 sm:p-2 justify-center items-center">
                <div className="flex items-center">
                    <NavLink to='/ModifyCguCookie' state={item} className="text-white w-[6em] bg-[#023E33] p-2 mb-4 rounded-md text-center">Modifier</NavLink>
                </div>
        
                <div className="flex items-center">
                    <button className="text-white w-[6em] bg-red-600 p-2 mb-4 rounded-md" onClick={()=>{handleDeleteDiv(true), handleItemToDelete(item)}}  >Supprimer</button>
                </div> 
            </div>
        </div>
    )
}