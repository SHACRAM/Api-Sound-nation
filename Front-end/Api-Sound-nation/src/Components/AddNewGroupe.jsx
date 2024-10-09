import React from "react";
import { useState } from "react";

export const AddNewGroupe = () => {
    const [fileName, setFileName] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
            if(file){
                setFileName(file.name);
            }else {
                setFileName("");
            }
    };

    return(
    <div className="flex flex-col items-center p-5">
        <h2 className="text-white text-center text-[1.2rem] ">Ajouter un groupe</h2>
        <form className="border border-white p-5 flex flex-col gap-5 mt-5 mb-5">
            <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-white">Nom du groupe / artiste</label>
                <input className="rounded bg-[#B6B6B6]" type="text" id="name" required />

            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="hour" className="text-white">Heure du concert</label>
                <input className="rounded bg-[#B6B6B6]" type="number" id="hour" required />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="date" className="text-white">Date du concert</label>
                <input className="rounded bg-[#B6B6B6]" type="text" id="date" required />

            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="scene" className="text-white">Scène</label>
                <input className="rounded bg-[#B6B6B6]" type="number" id="scene" required />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="image" className="text-white">Image du groupe</label>
                <input type="file" id="image" accept="image/*" onChange={handleFileChange} required />
                {fileName && <p className="text-white">{fileName}</p>}
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="alt" className="text-white">Texte alternatif</label>
                <input className="rounded bg-[#B6B6B6]" type="text" id="alt" required />
            </div>
        </form>
        <button className="text-white bg-[#023E33] p-2 w-[7em] rounded-md">Ajouter</button>
        
        

       

    </div>)
};