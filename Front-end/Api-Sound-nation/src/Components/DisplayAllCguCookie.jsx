import React from "react";
import { useState, useEffect } from "react";
import { DisplayAllCguAndCookiesComponent } from "./DisplayAllCguAndCookiesComponent";
import { DeleteCguCookie } from "./DeleteCguCookie";
import axios from "axios";

export const DisplayAllCguCookie = ({cgu, cookie, pData, getData}) => {
    const [deleteDiv, setDeleteDiv] = useState(false);
    const [messageDelete, setMessageDelete] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [itemToDelete, setItemToDelete] = useState({})

    const handleDeleteDiv = (boolean)=>{
        setDeleteDiv(boolean);
    }

    const handleItemToDelete = (item)=>{
        setItemToDelete(item)
    }


    const handleDelete = async (itemToDelete)=>{
        const id = itemToDelete.id;
        const cat = itemToDelete.category;

        try{
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/informations/deleteCguCookie`, {id, cat});
            if(response.data.status){
                setMessageDelete(response.data.message)
                setIsSuccess(true)
                setTimeout(()=>{
                    setMessageDelete('')
                    handleDeleteDiv(false)
                    getData();
                }, 2000)
            }
        }catch(error){
            if(error.response){
                setMessageDelete(error.response.data.message)
                setIsSuccess(false)
            }else{
                setMessageDelete('Erreur serveur, merci d\'essayer ultérieurement');
                setIsSuccess(false)
            }
        }
    }



    return(
        <div>
            <div className="mt-5">
                <h2 className="text-white text-center text-[1.3rem]">Conditions générales d'utilisation</h2>
                {cgu.length > 0 ? 
                <div className="border rounded-md flex flex-col m-4 h-90 overflow-auto">
                    {cgu.map((item, index) => (
                        <div key={index}>
                            <DisplayAllCguAndCookiesComponent item={item} handleDeleteDiv={handleDeleteDiv} handleItemToDelete={handleItemToDelete} />
                        </div>
                    ))}
                </div>
                :
                <div className="border rounded-md m-4 flex justify-center">
                    <p className="text-white p-5">Aucune CGU rédigée</p>
                </div>
                }
            </div>
            <div className="mt-5">
                <h2 className="text-white text-center text-[1.3rem]">Cookies</h2>
                {cookie.length > 0 ? 
                <div className="border rounded-md flex flex-col m-4 h-90 overflow-auto">
                    {cookie.map((item, index) => (
                        <div key={index}>
                            <DisplayAllCguAndCookiesComponent item={item} handleDeleteDiv={handleDeleteDiv} handleItemToDelete={handleItemToDelete} />
                        </div>
                    ))}
                </div>
                :
                <div className="border rounded-md m-4 flex justify-center">
                    <p className="text-white p-5">Aucun cookie rédigé</p>
                </div>
                }
            </div>
            <div className="mt-5">
                <h2 className="text-white text-center text-[1.3rem]">Données personnelles</h2>
                {pData.length > 0 ? 
                <div className="border rounded-md flex flex-col m-4 h-90 overflow-auto">
                    {pData.map((item, index) => (
                        <div key={index}>
                            <DisplayAllCguAndCookiesComponent item={item} handleDeleteDiv={handleDeleteDiv} handleItemToDelete={handleItemToDelete} />
                        </div>
                    ))}
                </div>
                :
                <div className="border rounded-md m-4 flex justify-center">
                    <p className="text-white p-5">Aucune donnée personnelle rédigée</p>
                </div>
                }
            </div>
            {deleteDiv &&
                <div >
                    <div className="fixed top-0 z-10 bg-black border w-full h-[100%] opacity-80 "></div>
                    <div className="z-20 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <DeleteCguCookie handleDeleteDiv={handleDeleteDiv} messageDelete={messageDelete} isSuccess={isSuccess} handleDelete={handleDelete} itemToDelete={itemToDelete} />
                    </div>
                    
                </div>}
        </div>
    )
};

