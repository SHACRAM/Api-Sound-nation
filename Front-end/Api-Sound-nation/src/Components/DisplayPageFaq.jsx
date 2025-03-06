import React from "react";
import { NavLink } from "react-router-dom";
import { useState,useEffect } from "react";
import { DisplayAllFaq } from "./DisplayAllFaq";
import { AddNewFaq } from "./AddNewFaq";
import { ModifyFaq } from "./ModifyFaq";
import axios from "axios";
// Composant qui affiche les éléments de la page Faq

export const DisplayPageFaq = ({isComingFromModifyFaq}) => {
    const [activeComponentFaq, setActiveComponentFaq] = useState(0);
    const [infoForModifyFaq, setInfoForModifyFaq] = useState({});
    const [data, setData] = useState([]);
    

    const handleClickFaq = (number) => {
        setActiveComponentFaq(number);
    };

   
    const infoModifyFaq = (faq) =>{
        setInfoForModifyFaq(faq);
        handleClickFaq(2);
    }

    const getDataFaq = async () => {
        try{
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/informations/faq`, { withCredentials: true });
            if(response.data.status){
                setData(response.data.data);
            }

        }catch(error){
            if(error.response){
                setMessage(error.response.message);
            } else{
                setMessage('Erreur serveur merci de réessayer plus tard');
            }
        }
    };
    
    

    useEffect(() => {
        if(isComingFromModifyFaq){
            handleClickFaq(1)
        }
        getDataFaq()
    },[]);




    const pageFaq = [
        <DisplayAllFaq infoModifyFaq={infoModifyFaq} handleClickFaq={handleClickFaq} data={data} getDataFaq={getDataFaq} />,
        // <AddNewFaq handleClickFaq={handleClickFaq} getDataFaq={getDataFaq}/>,
    ]

    return(
        <div className="">
            <h1 className="text-white text-[1.5rem] text-center p-2" onClick={() => handleClickFaq(0)}>Faq</h1>
            <div className="hidden sm:flex sm:flex-col sm:fixed sm:left-0 sm:gap-[3em] sm:ml-2 sm:mt-[1em] sm:text-[1rem] border rounded-md">
                <NavLink to='/AddFaq' className='text-white flex justify-center rounded hover:bg-[#858383] w-[11em] pl-1'>Ajouter une Faq</NavLink>
            </div>
             <div className="bg-[#5D5D5D] w-[100vw] flex justify-around p-2 sm:hidden ">
                <NavLink to='https://sound-nation.vercel.app/InformationsFaq' className='text-white border p-1 rounded-md' target="blank">Accéder au site</NavLink>
             </div>
            <div className="bg-[#5D5D5D] flex justify-around p-2 sm:hidden ">
            <NavLink to='/AddFaq' className='text-white border p-1 rounded-md'>Ajouter une question / réponse</NavLink>
            </div>
            <div className="hidden sm:flex sm:flex-col sm:fixed sm:left-0 sm:gap-[3em] sm:ml-2 sm:mt-[6em] sm:text-[1.2rem] border rounded-md">
                <NavLink to='https://sound-nation.vercel.app/InformationsFaq' className='text-white flex justify-center rounded hover:bg-[#858383] w-[9em] pl-1' target="blank">Accéder au site</NavLink>
            </div>
            <div className="">
                {pageFaq[activeComponentFaq]}
            </div>


        </div>
    )
};