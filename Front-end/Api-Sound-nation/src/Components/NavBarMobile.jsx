import React from "react";
import { useState, useContext } from "react";
import {NavLink} from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";


// Menu de navigation pour les écrans inférieurs à 640px
export const NavBarMobile = ({burgerClass, menuClass,updateMenu, handleLogOut }) => {
    const {connectInformation} = useContext(AuthContext);
    

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
            <NavLink className='text-white w-[100%] flex justify-center pb-2 pt-2 text-[1.3rem]' to='/Groupe'>Groupes</NavLink>
            <NavLink className='text-white  w-[100%] flex justify-center pb-2 pt-2 text-[1.3rem]'to='/Partenaire'>Partenaires</NavLink>
            <NavLink className='text-white  w-[100%] flex justify-center pb-2 pt-2 text-[1.3rem]' to='/Carte'>Carte</NavLink>
            {connectInformation && 
            <button onClick={()=>handleLogOut()} className='text-white  w-[100%] flex justify-center pb-2 pt-2 text-[1.3rem] active:opacity-80'>Se déconnecter</button>}
        </div>

    </div>)
};