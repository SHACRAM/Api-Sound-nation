import React from "react";
import { useState } from "react";



export const AddNewPlace = () => {


    const handleSubmit = ()=>{}


    return(<div>
        <div className="flex flex-col items-center p-5">
            <h2 className="text-white text-center text-[1.2rem] sm:text-[1.5rem]">Ajouter un lieu</h2>
            <form className="border border-white w-[100%] p-5 flex flex-col gap-5 mt-5 mb-5 sm:w-[90%] sm:flex-row sm:flex-wrap sm:gap-[4em]" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2 sm:w-[15em]">
                    <label htmlFor="name" className="text-white sm:text-[1.3rem]">Nom du lieu</label>
                    <input type="text" id="name" className="rounded bg-[#B6B6B6] pl-1 sm:w-[15em] sm:h-7 " required />
                </div>
                <div className="flex flex-col gap-2 sm:w-[15em]">
                    <label htmlFor="category" className="text-white sm:text-[1.3rem]">Catégorie</label>
                    <select className="rounded bg-[#B6B6B6] sm:w-[15em] sm:h-7" id="category" required>
                        <option value="">Choisir une catégorie</option>
                        <option value="Scène">Scène</option>
                        <option value="Food-truck">Food-truck</option>
                        <option value="Camping">Camping</option>
                        <option value="Point de rencontre">Point de rencontre</option>
                        <option value="Toilette">Toilette</option>
                        <option value="Parking">Parking</option>
                        <option value="Entrée">Entrée du festival</option>
                        <option value="newCat">Ajouter une nouvelle catégorie</option>    
                    </select>
                </div>
                <div className="flex flex-col gap-2 sm:w-[15em]">
                    <label htmlFor="latitude" className="text-white sm:text-[1.3rem]">Latitude</label>
                    <input className="rounded bg-[#B6B6B6] sm:w-[15em] sm:h-7" type="text" id="latitude" required />
                </div>
                <div className="flex flex-col gap-2 sm:w-[15em]">
                    <label htmlFor="longitude" className="text-white sm:text-[1.3rem]">Longitude</label>
                    <input className="rounded bg-[#B6B6B6] sm:w-[15em] sm:h-7" type="text" id="longitude" required />
                </div>
                <div className="flex flex-col gap-2 sm:w-[15em]">
                    <label htmlFor="merkerDiametre" className="text-white sm:text-[1.3rem]">Diamètre du marqueur</label>
                    <input type="text" />
                </div>
                <div>
                    <label htmlFor=""></label>
                    <input type="text" />
                </div>
                <div>
                    <label htmlFor=""></label>
                    <input type="text" />
                </div>
                <div>
                    <label htmlFor=""></label>
                    <input type="text" />
                </div>
                <div>
                    <label htmlFor=""></label>
                    <input type="text" />
                </div>
                
                
            </form>
            {/* {messageAddPartner && <p className="text-white">{messageAddPartner}</p>} */}
        </div>
    </div>)
}