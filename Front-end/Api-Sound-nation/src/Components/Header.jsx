import React from "react";
import { useState } from "react";
import { NavBarMobile } from "./NavBarMobile";
import { NavLink } from "react-router-dom";
import { NavBarDesktop } from "./NavBarDesktop";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//Composant qui gère l'affichage des différents éléments de la barre de navigation en version mobile et desktop
export const Header = ({setActiveDiv, isAuthenticated, setIsAuthenticated, userName}) => {
    const navigate = useNavigate();
    const [burgerClass, setBurgerClass] = useState("burger-bar unclicked");
    const [menuClass, setMenuClass] = useState('menu');
    const [isMenuClicked, setIsMenuClicked] = useState(false);
    const [disconnectMesssage, setDisconnectMessage] = useState('');

    const handleLogOut = async()=>{

        const response = await axios.get('http://localhost:3000/api/authentication/logOut', { withCredentials: true });
        if(response.data.status){
            setIsAuthenticated(false);
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
                <NavBarMobile burgerClass={burgerClass} menuClass={menuClass} updateMenu={updateMenu} handleclick={handleclick} isAuthenticated={isAuthenticated} handleLogOut={handleLogOut}/>
            </div>
        </div>
        <div className="hidden sm:block">
            <NavBarDesktop setActiveDiv={setActiveDiv} userName={userName} handleLogOut={handleLogOut} isAuthenticated={isAuthenticated}/>
        </div>




    </div>)
};