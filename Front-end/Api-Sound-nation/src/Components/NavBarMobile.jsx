import React from "react";
import { useState } from "react";
import {NavLink} from "react-router-dom";


// Menu de navigation pour les écrans inférieurs à 640px
export const NavBarMobile = ({burgerClass, menuClass,updateMenu, handleclick }) => {
    


    return (
    <div>
        <nav>
            <div className="burger-menu" onClick={updateMenu}>
                <div className={burgerClass}></div>
                <div className={burgerClass}></div>
                <div className={burgerClass}></div>
            </div>
        </nav>

        <div className={`flex flex-col items-center ${menuClass}`}>
            {/* TODO ajouter la fonction pour se déconnecter */}
            <NavLink onClick={handleclick(1)} className='text-white w-[100%] flex justify-center pb-2 pt-2 text-[1.3rem]'>Groupes</NavLink>
            <NavLink onClick={handleclick(2)} className='text-white  w-[100%] flex justify-center pb-2 pt-2 text-[1.3rem]'>Partenaires</NavLink>
            <NavLink onClick={handleclick(3)} className='text-white  w-[100%] flex justify-center pb-2 pt-2 text-[1.3rem]'>Carte</NavLink>
            <NavLink className='text-white  w-[100%] flex justify-center pb-2 pt-2 text-[1.3rem]'>Se déconnecter</NavLink>
        </div>

    </div>)
};