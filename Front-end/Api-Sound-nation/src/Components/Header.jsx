import React from "react";
import { useState } from "react";
import { NavBarMobile } from "./NavBarMobile";
import { NavLink } from "react-router-dom";
import { NavBarDesktop } from "./NavBarDesktop";

export const Header = ({setActiveDiv}) => {

    const handleclick = () => {
        setActiveDiv(0);
    };
    
    return(
    <div className=' border-b border-[#707070] sm:h-[12em] '>
        <div className='flex justify-between sm:hidden'>
            <div>
                <NavLink onClick={handleclick} to="/DisplayMainContent"><img src="src/images/Logo.png" alt="Image du logo du festival" className="w-[5em] m-2"/></NavLink>
            </div>
            <div>
                <NavBarMobile setActiveDiv={setActiveDiv}/>
            </div>
        </div>
        <div className="hidden sm:block">
            <NavBarDesktop setActiveDiv={setActiveDiv} />
        </div>




    </div>)
};