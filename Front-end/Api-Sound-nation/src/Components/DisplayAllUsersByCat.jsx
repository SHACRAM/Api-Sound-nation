import React from "react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
// Composant qui affiche les utilisateurs et qui permet de mettre à jour ou supprimer un utilisateur
export const DisplayAllUsersByCat = ({data, handleDeleteDiv, handleModifyDiv}) => {
    const {connectInformation} = useContext(AuthContext);

    useEffect(()=>{},[connectInformation]);


    return(
        <div className="border rounded-md h-[20em] overflow-auto">
            {data.map((user, index)=>(
                <div key={index} className="flex flex-col border m-4 p-2 rounded-lg md:flex-row md:justify-between md:items-center">
                    <div>
                        <p className="text-white">{user.user_name}</p>
                        <p className="text-white">{user.user_email}</p>
                        <p className="text-white">Status : {user.user_role}</p>
                    </div>
                    {connectInformation?.user_role === 'adminSys' ?
                    <div className="flex justify-center p-2 gap-4">
                        <button className="text-white bg-red-600 rounded-md p-1 h-8 hover:opacity-80" onClick={()=>handleDeleteDiv(true, user.user_email)}>Supprimer</button>
                        <button className="text-white p-1 bg-[#023E33] rounded-md h-8 hover:opacity-80" onClick={()=>{handleModifyDiv(true, user.user_role, user.user_email)}}>Modifier le rôle</button>
                    </div>
                    :
                    <div className="flex justify-center p-2 gap-4">
                        <button className="text-white bg-red-600 rounded-md p-1" onClick={()=>handleDeleteDiv(true)}>Supprimer</button>
                    </div>}
            
                </div>
            ))}
            
        </div>
    )
};