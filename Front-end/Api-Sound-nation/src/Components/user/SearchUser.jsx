import React from "react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";


export const SearchUser = ({data, handleDeleteDiv, handleModifyDiv}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const {connectInformation} = useContext(AuthContext);

    useEffect(()=>{},[connectInformation]);


    return (
        <div className="flex flex-col m-2">
            <div className="flex justify-center p-5">
                <input type="text" className="p-1 rounded-md w-[15em]" placeholder="Rechercher" onChange={(e)=>setSearchTerm(e.target.value)}/>
            </div>
            {searchTerm.length === 0 ? null:
            <div className=" border rounded-md m-2 h-[12em] overflow-auto">
                {data.filter((val)=>{
                    return val.user_email.toLowerCase().includes(searchTerm.toLowerCase()) || val.user_name.toLowerCase().includes(searchTerm.toLowerCase())})
                    .map((val, index)=>{
                        if(val.user_role !== 'adminSys'){
                        return (
                        <div key={index} className="flex flex-col border m-4 p-2 rounded-lg md:flex-row md:justify-between md:items-center">
                            <div>
                                <p className="text-white">{val.user_name}</p>
                                <p className="text-white">{val.user_email}</p>
                                <p className="text-white">Status : {val.user_role}</p> 
                            </div>
                            {connectInformation?.user_role === 'adminSys' ?
                            <div className="flex justify-center p-2 gap-4">
                                <button className="text-white bg-red-600 rounded-md p-1 h-8 hover:opacity-80" onClick={()=>handleDeleteDiv(true, val.user_email)}>Supprimer</button>
                                <button className="text-white p-1 bg-[#023E33] rounded-md h-8 hover:opacity-80" onClick={()=>{handleModifyDiv(true, val.user_role, val.user_email)}}>Modifier le rôle</button>
                            </div>
                            :<div className="flex justify-center p-2 gap-4">
                                <button className="text-white bg-red-600 rounded-md p-1 h-8 hover:opacity-80" onClick={()=>handleDeleteDiv(true, val.user_email)}>Supprimer</button>
                            </div>}
                        </div>) }
                    })
                }

            </div>}
        </div>
        
    );
};