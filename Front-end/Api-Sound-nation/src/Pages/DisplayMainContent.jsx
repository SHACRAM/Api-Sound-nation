import React from "react";
import { DisplayAccueil } from "../Components/DisplayAccueil";
import { Header } from "../Components/Header";
import { useState } from "react";
import { DisplayPageGroup } from "../Components/DisplayPageGroup";
import { DisplayPagePartenaire } from "../Components/DisplayPagePartenaire";
import { DisplayPageCarte } from "../Components/DisplayPageCarte";
//Composant qui permet d'afficher le contenu des différentes pages du site
export const DisplayMainContent = () => {
    const [activeDiv, setActiveDiv] = useState(0);
    
   

    const pages = [
        <div className="sm:ml-[12em]"><DisplayAccueil/></div>,
        <div className="sm:ml-[12em]"><DisplayPageGroup /></div>,
        <div className="sm:ml-[12em]"><DisplayPagePartenaire/></div>,
        <div className="sm:ml-[12em]"><DisplayPageCarte/></div>
    ];

    return(<div className="flex flex-col">
        <div>
            <Header setActiveDiv={setActiveDiv}  />
        </div>
        <div>
            <div className="sm:w-[12em] bg-[#5D5D5D] left-0 border-t border-black h-full fixed">
            </div>
            <div>
                {pages[activeDiv]}  
            </div>
            
        </div>
        
    </div>)
};