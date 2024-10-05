import React from "react";
import { DisplayAccueil } from "../Components/DisplayAccueil";
import { Header } from "../Components/Header";

export const Accueil = () => {
    return(<div className="flex flex-col">
        <div>
            <Header/>
        </div>
        <DisplayAccueil/>
    </div>)
};