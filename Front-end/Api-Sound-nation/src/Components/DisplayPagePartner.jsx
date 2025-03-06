import React from "react";
import { useState,useCallback, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AddNewPartner } from "./AddNewPartner";
import { AllPartners } from "./AllPartners";
import { ModifyPartner } from "./ModifyPartner";
import axios from "axios";

// Composant qui affiche les pages de gestion des partenaires
export const DisplayPagePartner = ({isComingFromPageModifyPartner}) => {
    const [activeComponentPartner, setActiveComponentPartner] = useState(0);
    const [infoForModifyPartner, setInfoForModifyPartner] = useState({});
    const [dataPartners, setDataPartners] = useState([]);
    const [message, setMessage]= useState("");
    const [categoryPartner, setCategoryPartner] = useState([]);



    const handleAllPartners = useCallback( async ()=>{
        try{
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/partners`);
            if(response.data.status){
                const tempData = [];
                response.data.data.forEach((partner)=>{
                    tempData.push(partner.partner_category);
                })
                setCategoryPartner([...new Set(tempData)]);
                setDataPartners(response.data.data);

            }else{
                setMessage(response.data.message);
            }

        }catch (error){
            setMessage("Erreur serveur, impossible d'afficher le contenu de la page");
        }
    }, []);

    useEffect(()=>{
        if(isComingFromPageModifyPartner){
            handleClickPartner(1);
        }
        handleAllPartners();
    },[handleAllPartners]);
    
    

    const handleClickPartner = (number) => {
        setActiveComponentPartner(number);
    };

    const setInfoModifyPartner = (partner) => {
        setInfoForModifyPartner(partner);
        handleClickPartner(2);
    }
    
    
    const pagesPartner =[
        <AllPartners setInfoModifyPartner={setInfoModifyPartner} setActiveComponentPartner={setActiveComponentPartner} dataPartners={dataPartners} message={message} categoryPartner={categoryPartner} handleAllPartners={handleAllPartners} />
    ];



    


    






    return(<div className="flex flex-col items-center">
        <div className="ml-2 mb-1 ">
            <h1  onClick={() => handleClickPartner(0)}className="text-white text-[1.5rem] sm:hidden">Nos partenaires</h1>
        </div>
        <div className="bg-[#5D5D5D] w-[100vw] flex justify-around p-2 sm:hidden ">
            <NavLink to='/AddPartner' state={categoryPartner} className='text-white border p-1 rounded-md'>Ajouter un partenaire</NavLink>
            
        </div>
         <div className="bg-[#5D5D5D] w-[100vw] flex justify-around p-2 sm:hidden ">
                    <NavLink to='https://sound-nation.vercel.app/Partenaire' className='text-white border p-1 rounded-md' target="blank">Accéder au site</NavLink>
                </div>
        <div className="hidden sm:flex sm:flex-col sm:fixed sm:left-0 sm:gap-[3em] sm:ml-2 sm:mt-[3em] sm:text-[1rem] border rounded-md">
                <NavLink to='/AddPartner' state={categoryPartner} className='text-white flex justify-center rounded hover:bg-[#858383] w-[11em] pl-1'>Ajouter un partenaire</NavLink>
                
        </div>
        <div className="hidden sm:flex sm:flex-col sm:fixed sm:left-0 sm:gap-[3em] sm:ml-2 sm:mt-[6em] sm:text-[1.2rem] border rounded-md">
                        <NavLink to='https://sound-nation.vercel.app/Partenaire' className='text-white flex justify-center rounded hover:bg-[#858383] w-[9em] pl-1' target="blank">Accéder au site</NavLink>
                </div>
        <div className="w-[100%]"> 
            {pagesPartner[activeComponentPartner]} 

        </div>
        
    </div>)
}