import React from "react";

export const DisplayAccueil = () => {
    return(<div className="border rounded-sm p-3 flex flex-col gap-7 items-center m-5 mt-[3em]">
        <h1 className="text-white text-[1.5rem]">Accueil</h1>
        <div className="flex flex-col gap-5">
        <p className="text-white text-left text-[1.1rem]">Bienvenue sur le site d’administration du festival Sound-nation.</p>
        <p className="text-white text-left text-[1.1rem]">Ici il vous sera possible de gérer l’ajout, la modification et la suppression d’un artiste/groupe, d’un partenaire ou encore d’une localisation sur la carte.</p>
        </div>

    </div>);
};