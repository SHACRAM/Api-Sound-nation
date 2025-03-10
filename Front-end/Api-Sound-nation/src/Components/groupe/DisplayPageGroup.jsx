import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AddNewGroupe } from "./AddNewGroupe";
import { DisplayAllGroupe } from "./DisplayAllGroupe";



// Page qui permet d'afficher les différentes fonctionnalités liées aux groupes
export const DisplayPageGroup = ({isComingFromModifyGroupe}) => {
    const [activeComponentGroupe, setActiveComponentGroupe] = useState(0);
    const [infoForModifyGroupe, setInfoForModifyGroupe] = useState({});
    
    

    const handleClickGroupe = (number) => {
        setActiveComponentGroupe(number);
    };

    const setInfoModifyGroupe = (groupe) => {
        setInfoForModifyGroupe(groupe);
        handleClickGroupe(2);
    }

    useEffect(()=>{
        if(isComingFromModifyGroupe){
            setActiveComponentGroupe(1)
        }else{
            setActiveComponentGroupe(0)

        }
       
    },[]);
    
    
    const pagesGroupe =[
        <DisplayAllGroupe setInfoModifyGroupe={setInfoModifyGroupe} setActiveComponentGroupe={setActiveComponentGroupe} />
    ];

    return(<div className="flex flex-col items-center">
        <div className="ml-2 mb-1 ">
            <h1  onClick={() => handleClickGroupe(0)}className="text-white text-[1.5rem] sm:hidden">Groupes</h1>
        </div>
        <div className="bg-[#5D5D5D] w-[100vw] flex justify-around p-2 sm:hidden ">
            <NavLink to='/AddGroupe' className='text-white border p-1 rounded-md'>Ajouter un groupe</NavLink>
        </div>
        <div className="bg-[#5D5D5D] w-[100vw] flex justify-around p-2 sm:hidden ">
            <NavLink to='https://sound-nation.vercel.app/Programmation' className='text-white border p-1 rounded-md' target="blank">Accéder au site</NavLink>
        </div>
        <div className="hidden sm:flex sm:flex-col sm:fixed sm:left-0 sm:gap-[3em] sm:ml-2 sm:mt-[3em] sm:text-[1.2rem] border rounded-md">
                <NavLink to='/AddGroupe' className='text-white flex justify-center rounded hover:bg-[#858383] w-[9em] pl-1'>Ajouter un groupe</NavLink>
        </div>
        <div className="hidden sm:flex sm:flex-col sm:fixed sm:left-0 sm:gap-[3em] sm:ml-2 sm:mt-[6em] sm:text-[1.2rem] border rounded-md">
                <NavLink to='https://sound-nation.vercel.app/Programmation' className='text-white flex justify-center rounded hover:bg-[#858383] w-[9em] pl-1' target="blank">Accéder au site</NavLink>
        </div>
        
        <div className="w-[100%]"> 
            {pagesGroupe[activeComponentGroupe]} 

        </div>
        
    </div>)
}