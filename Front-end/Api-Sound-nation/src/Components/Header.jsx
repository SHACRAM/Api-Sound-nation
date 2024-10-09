import React from "react";
import { useState } from "react";
import { NavBarMobile } from "./NavBarMobile";
import { NavLink } from "react-router-dom";
import { NavBarDesktop } from "./NavBarDesktop";
//Composant qui gère l'affichage des différents éléments de la barre de navigation en version mobile et desktop
export const Header = ({setActiveDiv}) => {

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
            case 0:
                return () => {setActiveDiv(0); setMenuClass('menu'); setBurgerClass('burger-bar unclicked');};
            case 1:
                return () => {setActiveDiv(1); setMenuClass('menu'); setBurgerClass('burger-bar unclicked');};
            case 2:
                return () => {setActiveDiv(2); setMenuClass('menu'); setBurgerClass('burger-bar unclicked');};
            case 3:
                return () => {setActiveDiv(3); setMenuClass('menu'); setBurgerClass('burger-bar unclicked');};
            default:
                return () => {setActiveDiv(0); setMenuClass('menu'); setBurgerClass('burger-bar unclicked');};
        }
    };

    return(
    <div className=' border-b border-[#707070] sm:h-[12em] '>
        <div className='flex justify-between sm:hidden'>
            <div>
                <NavLink onClick={handleclick(0)} to="/DisplayMainContent"><img src="src/images/Logo.png" alt="Image du logo du festival" className="w-[5em] m-2"/></NavLink>
            </div>
            <div>
                <NavBarMobile setActiveDiv={setActiveDiv} burgerClass={burgerClass} menuClass={menuClass} updateMenu={updateMenu} handleclick={handleclick}/>
            </div>
        </div>
        <div className="hidden sm:block">
            <NavBarDesktop setActiveDiv={setActiveDiv} />
        </div>




    </div>)
};