import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AddNewGroupe } from "./AddNewGroupe";
import { DisplayAllGroupe } from "./DisplayAllGroupe";
import { ModifyGroupe } from "./ModifyGroupe";
import { DeleteGroupe } from "./DeleteGroupe";

export const DisplayPageGroup = () => {
    const [activeComponent, setActiveComponent] = useState(0);

    const handleClick = (number) => {
        setActiveComponent(number);
    };

    const pagesGroupe =[
        <DisplayAllGroupe/>,
        <AddNewGroupe setActiveComponent={setActiveComponent}/>,
        <ModifyGroupe/>,
        <DeleteGroupe/>

    ];

    return(<div className="flex flex-col items-center">
        <div className="ml-2 mb-1 ">
            <h1  onClick={() => handleClick(0)}className="text-white text-[1.5rem] sm:hidden">Groupes</h1>
        </div>
        <div className="bg-[#5D5D5D] w-[100vw] flex justify-around p-2 sm:hidden ">
            <NavLink onClick={() => handleClick(1)} className='text-white'>Ajouter</NavLink>
            <NavLink onClick={() => handleClick(2)} className='text-white'>Modifier</NavLink>
            <NavLink onClick={() => handleClick(3)} className='text-white'> Supprimer</NavLink>
        </div>
        <div className="flex flex-col absolute left-0 gap-[3em] ml-[2em] mt-[3em] text-[1.2rem] opacity-0 sm:opacity-100">
                <NavLink onClick={() => handleClick(1)} className='text-white flex justify-start rounded focus:bg-[#858383] w-[8em] pl-1'>Ajouter</NavLink>
                <NavLink onClick={() => handleClick(2)} className='text-white flex justify-start rounded focus:bg-[#858383] w-[8em] pl-1'>Modifier</NavLink>
                <NavLink onClick={() => handleClick(3)} className='text-white flex justify-start rounded focus:bg-[#858383] w-[8em] pl-1'> Supprimer</NavLink>
        </div>
        <div className="w-[100%]"> 
            {pagesGroupe[activeComponent]} 

        </div>
        
    </div>)
}