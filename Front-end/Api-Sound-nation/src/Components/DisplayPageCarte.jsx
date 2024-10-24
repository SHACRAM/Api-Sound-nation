import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AddNewPlace } from "./AddNewPlace";
import { DisplayAllPlace } from "./DisplayAllPlace";
import { ModifyPlace } from "./ModifyPlace";


// Page qui permet d'afficher les différentes fonctionnalités liées aux lieux
export const DisplayPageCarte = ({}) => {
    const [activeComponentPlace, setActiveComponentPlace] = useState(0);
    // const [infoForModifyGroupe, setInfoForModifyGroupe] = useState({});
    
    

    const handleClickPlace = (number) => {
        setActiveComponentPlace(number);
    };

    // const setInfoModifyPlace = (groupe) => {
    //     setInfoForModifyGroupe(groupe);
    //     handleClickGroupe(2);
    // }
    
    
    const pagesPlace =[
        <DisplayAllPlace/>,
        <AddNewPlace />,
        <ModifyPlace />
    ];

    return(<div className="flex flex-col items-center">
        <div className="ml-2 mb-1 ">
            <h1  onClick={() => handleClickPlace(0)}className="text-white text-[1.5rem] sm:hidden">Carte</h1>
        </div>
        <div className="bg-[#5D5D5D] w-[100vw] flex justify-around p-2 sm:hidden ">
            <NavLink onClick={() => handleClickPlace(1)} className='text-white border p-1 rounded-md'>Ajouter un lieu</NavLink>
            
        </div>
        <div className="hidden sm:flex sm:flex-col sm:fixed sm:left-0 sm:gap-[3em] sm:ml-2 sm:mt-[3em] sm:text-[1.2rem] border rounded-md">
                <NavLink onClick={() => handleClickPlace(1)} className='text-white flex justify-center rounded hover:bg-[#858383] w-[9em] pl-1'>Ajouter un lieu</NavLink>
                
        </div>
        <div className="w-[100%]"> 
            {pagesPlace[activeComponentPlace]} 

        </div>
        
    </div>)
}