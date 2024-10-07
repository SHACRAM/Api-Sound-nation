import React from "react";
import { useState } from "react";
import {NavLink} from "react-router-dom";


// Menu de navigation pour les écrans inférieurs à 640px
export const NavBarMobile = ({setActiveDiv}) => {
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

    const handleclick = (number) => {
        switch(number){
            case 1:
                return () => setActiveDiv(1);
            case 2:
                return () => setActiveDiv(2);
            case 3:
                return () => setActiveDiv(3);
            default:
                return () => setActiveDiv(0);
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

        <div className={`flex flex-col items-center ${menuClass}`}>
            {/* TODO ajouter la fonction pour se déconnecter */}
            <NavLink onClick={handleclick(1)} className='text-white w-[100%] flex justify-center pb-2 pt-2 text-[1.3rem]'>Groupes</NavLink>
            <NavLink onClick={handleclick(2)} className='text-white  w-[100%] flex justify-center pb-2 pt-2 text-[1.3rem]'>Partenaires</NavLink>
            <NavLink onClick={handleclick(3)} className='text-white  w-[100%] flex justify-center pb-2 pt-2 text-[1.3rem]'>Carte</NavLink>
            <NavLink className='text-white  w-[100%] flex justify-center pb-2 pt-2 text-[1.3rem]'>Se déconnecter</NavLink>
        </div>

    </div>)
};