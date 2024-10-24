import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AddNewPartner } from "./AddNewPartner";
import { AllPartners } from "./AllPartners";
import { ModifyPartner } from "./ModifyPartner";

// Composant qui affiche les pages de gestion des partenaires
export const DisplayPagePartner = () => {
    const [activeComponentPartner, setActiveComponentPartner] = useState(0);
    const [infoForModifyPartner, setInfoForModifyPartner] = useState({});
    
    

    const handleClickPartner = (number) => {
        setActiveComponentPartner(number);
    };

    const setInfoModifyPartner = (partner) => {
        setInfoForModifyPartner(partner);
        handleClickPartner(2);
    }
    
    
    const pagesPartner =[
        <AllPartners setInfoModifyPartner={setInfoModifyPartner} setActiveComponentPartner={setActiveComponentPartner} />,
        <AddNewPartner setActiveComponentPartner={setActiveComponentPartner}/>,
        <ModifyPartner partnerData = {infoForModifyPartner} setActiveComponentPartner={setActiveComponentPartner}/>
    ];






    return(<div className="flex flex-col items-center">
        <div className="ml-2 mb-1 ">
            <h1  onClick={() => handleClickPartner(0)}className="text-white text-[1.5rem] sm:hidden">Nos partenaires</h1>
        </div>
        <div className="bg-[#5D5D5D] w-[100vw] flex justify-around p-2 sm:hidden ">
            <NavLink onClick={() => handleClickPartner(1)} className='text-white border p-1 rounded-md'>Ajouter un partenaire</NavLink>
            
        </div>
        <div className="hidden sm:flex sm:flex-col sm:fixed sm:left-0 sm:gap-[3em] sm:ml-2 sm:mt-[3em] sm:text-[1rem] border rounded-md">
                <NavLink onClick={() => handleClickPartner(1)} className='text-white flex justify-center rounded hover:bg-[#858383] w-[11em] pl-1'>Ajouter un partenaire</NavLink>
                
        </div>
        <div className="w-[100%]"> 
            {pagesPartner[activeComponentPartner]} 

        </div>
        
    </div>)
}