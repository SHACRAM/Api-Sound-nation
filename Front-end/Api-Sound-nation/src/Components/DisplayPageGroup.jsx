import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AddNewGroupe } from "./AddNewGroupe";
import { DisplayAllGroupe } from "./DisplayAllGroupe";
import { ModifyGroupe } from "./ModifyGroupe";
import { DeleteGroupe } from "./DeleteGroupe";

export const DisplayPageGroup = () => {
    const [activeDiv, setActiveDiv] = useState(0);

    const handleClick = (number) => {
        setActiveDiv(number);
    };

    const pagesGroupe =[
        <DisplayAllGroupe/>,
        <AddNewGroupe />,
        <ModifyGroupe/>,
        <DeleteGroupe/>

    ];



    return(<div className="flex flex-col items-center w-[100vw]">
        <div className="ml-2 mb-1 ">
            <h1  onClick={() => handleClick(0)}className="text-white text-[1.5rem]">Groupes</h1>
        </div>
        <div className="bg-[#5D5D5D] w-[100%] flex justify-around p-2 ">
            <NavLink onClick={() => handleClick(1)} className='text-white'>Ajouter</NavLink>
            <NavLink onClick={() => handleClick(2)} className='text-white'>Modifier</NavLink>
            <NavLink onClick={() => handleClick(3)} className='text-white'> Supprimer</NavLink>
        </div>
        <div className="w-[100%]"> 
            {pagesGroupe[activeDiv]} 

        </div>
        
    </div>)
}