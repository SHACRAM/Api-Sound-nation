import React from "react";
import { useState, useContext,useEffect } from "react";
import {NavLink} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";


// Menu de navigation pour les écrans inférieurs à 640px
export const NavBarMobile = ({burgerClass, menuClass,updateMenu, handleLogOut, setMenuClass, setBurgerClass, isInfoClicked, setIsInfoClicked }) => {
    const {connectInformation} = useContext(AuthContext);
    

    useEffect(()=>{},[connectInformation]);

    const handleInfoClick = (boolean)=>{
        setIsInfoClicked(boolean);
        if(boolean){
            setMenuClass('menu visible');
            setBurgerClass('burger-bar clicked');
        }
    };
    

    return (
    <div>
        <nav>
            <div className="burger-menu" onClick={updateMenu}>
                <div className={burgerClass}></div>
                <div className={burgerClass}></div>
                <div className={burgerClass}></div>
            </div>
        </nav>
        {!isInfoClicked ?
            <div className={`flex flex-col items-center ${menuClass}`}>
            <NavLink className='text-white w-[100%] flex justify-center pb-2 pt-2 text-[1.3rem]' to='/Groupe'>Groupes</NavLink>
            <NavLink className='text-white  w-[100%] flex justify-center pb-2 pt-2 text-[1.3rem]'to='/Partenaire'>Partenaires</NavLink>
            <NavLink className='text-white  w-[100%] flex justify-center pb-2 pt-2 text-[1.3rem]' to='/Carte'>Carte</NavLink>
            <NavLink className='text-white  w-[100%] flex justify-center pb-2 pt-2 text-[1.3rem]' to='/Utilisateur'>Utilisateurs</NavLink>
            <NavLink className='text-white  w-[100%] flex justify-center pb-2 pt-2 text-[1.3rem]' onClick={()=>handleInfoClick(true)}>Informations</NavLink>
            {connectInformation && 
            <button onClick={()=>handleLogOut()} className='text-white  w-[100%] flex justify-center pb-2 pt-2 text-[1.3rem] active:opacity-80'>Se déconnecter</button>}
        </div> :
        <div className={`flex flex-col items-center ${menuClass}`}>
            <NavLink className='text-white w-[100%] flex justify-center pb-2 pt-2 text-[1.3rem]' to='/Faq'>FAQ</NavLink>
            <NavLink className='text-white w-[100%] flex justify-center pb-2 pt-2 text-[1.3rem]' to='/InfoPratique'>Infos pratiques</NavLink>
            <NavLink className='text-white w-[100%] flex justify-center pb-2 pt-2 text-[1.3rem]' to='/CguCookie'>CGU & cookies</NavLink>
            <div className="flex gap-2 justify-start w-full ml-2" onClick={()=>handleInfoClick(false)}>
                <img src="src/images/FlecheDroite2.png" alt="Fleche de retour au menu précédant" className="rotate-180 w-6" />
                <p className="text-white">Retour</p>
            </div>
            
        </div>
        }
        

    </div>)
};