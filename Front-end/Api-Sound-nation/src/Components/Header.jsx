import React from "react";
import { useState, useContext } from "react";
import { NavBarMobile } from "./NavBarMobile";
import { NavLink } from "react-router-dom";
import { NavBarDesktop } from "./NavBarDesktop";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//Composant qui gère l'affichage des différents éléments de la barre de navigation en version mobile et desktop
export const Header = () => {
    const navigate = useNavigate();
    const [burgerClass, setBurgerClass] = useState("burger-bar unclicked");
    const [menuClass, setMenuClass] = useState('menu');
    const [isMenuClicked, setIsMenuClicked] = useState(false);
    const [disconnectMesssage, setDisconnectMessage] = useState('');

    const handleLogOut = async()=>{

        const response = await axios.get('http://localhost:3000/api/authentication/logOut', { withCredentials: true });
        if(response.data.status){
            setDisconnectMessage(response.data.message);
            setMenuClass('menu'); 
            setBurgerClass('burger-bar unclicked');
            setTimeout(()=>{
                navigate('/');
            }, 2000);
        } else {
            setDisconnectMessage(response.data.message);
        }
    }

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


    return(
    <div className=' border-b border-[#707070] sm:h-[12em] '>
        <div className='flex justify-between sm:hidden'>
            <div>
                <NavLink to="/DisplayMainContent"><img src="src/images/Logo.png" alt="Image du logo du festival" className="w-[5em] m-2"/></NavLink>
            </div>
            <div>
                <NavBarMobile  burgerClass={burgerClass} menuClass={menuClass} updateMenu={updateMenu} handleLogOut={handleLogOut}/>
            </div>
        </div>
        <div className="hidden sm:block">
            <NavBarDesktop handleLogOut={handleLogOut}/>
        </div>
    </div>)
};