import React from "react";
import { useState } from "react";
import { NavBarMobile } from "./NavBarMobile";
import { NavLink } from "react-router-dom";

export const Header = () => {
    return(
    <div className="flex justify-between border-b border-[#707070]">

        <NavLink to="/Accueil" ><img src="src/images/Logo.png" alt="Image du logo du festival" className="w-[5em] m-2" /></NavLink>
        <NavBarMobile/>
    </div>)
};