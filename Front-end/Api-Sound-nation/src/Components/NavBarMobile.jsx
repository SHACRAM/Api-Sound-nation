import React from "react";
import { useState } from "react";
import {NavLink} from "react-router-dom";


export const NavBarMobile = () => {
    const [burgerClass, setBurgerClass] = useState("burger-bar unclicked");
    const [menuClass, setMenuClass] = useState('menu');
    const [isMenuClicked, setIsMenuClicked] = useState(false);

    const updateMenu = ()=>{
        if(!isMenuClicked){
            setBurgerClass('burger-bar clicked');
            setMenuClass('menu visible');
        } else{
            setBurgerClass('burger-bar unclicked');
            setMenuClass('menu');  
        }
        setIsMenuClicked(!isMenuClicked);
    }



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
            {/* TODO ajouter le lien des pages */}
            <NavLink className='text-white w-[100%] flex justify-center pb-2 pt-2 text-[1.3rem]'>Groupes</NavLink>
            <NavLink className='text-white  w-[100%] flex justify-center pb-2 pt-2 text-[1.3rem]'>Partenaires</NavLink>
            <NavLink className='text-white  w-[100%] flex justify-center pb-2 pt-2 text-[1.3rem]'>Carte</NavLink>
        </div>

    </div>)
};