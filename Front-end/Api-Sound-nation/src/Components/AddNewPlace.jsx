import React from "react";
import { useState } from "react";
import axios from "axios";


// Composant qui permet d'ajouter un nouveau lieu
export const AddNewPlace = ({setActiveComponentPlace, placeCategory, handleAllPlace}) => {
    const [messageAddPlace, setMessageAddPlace] = useState("");
    const [newCategory, setNewCategory] = useState(false);
    const [color, setColor] = useState("");
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [markerDiametre, setMarkerDiametre] = useState("");
    const [logo, setLogo] = useState(null);
    const [altLogo, setAltLogo] = useState("");
    const [imagePlace, setImagePlace] = useState(null);
    const [altImage, setAltImage] = useState("");

    const handleCategoryChange = (e) => {
        const selectedValue = e.target.value;
        if(selectedValue === "newCat"){
            setNewCategory(true);
            setCategory("");
        } else{
            setNewCategory(false);
        }
    }

    const handleNewCategoryChange = (e) => {
        setCategory(e.target.value);
    }



   

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLogo(file);
        } else {
            setLogo(null);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePlace(file);
        } else {
            setImagePlace(null);
        }
    };



    const handleSubmit = async (e)=>{
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("category", category);
        formData.append("latitude", latitude);
        formData.append("longitude", longitude);
        formData.append("markerDiametre", markerDiametre);
        formData.append("color", color);
        formData.append("images", logo);
        formData.append("altLogo", altLogo);
        formData.append("images", imagePlace);
        formData.append("altImage", altImage);



        try{
            const response = await axios.post ("http://localhost:3000/api/places/addPlace", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if(response.data.status){
                setMessageAddPlace(response.data.message);
                setTimeout(() => {
                    setActiveComponentPlace(0);
                    handleAllPlace();
                }, 2000);
            } else{
                setMessageAddPlace(response.data.message);
            }
        } catch (error){
            setMessageAddPlace('Erreur serveur merci de réessayer plus tard');

        }
    }


    return(<div>
        <div className="flex flex-col items-center p-5">
            <h2 className="text-white text-center text-[1.2rem] sm:text-[1.5rem]">Ajouter un lieu</h2>
            <form className="border border-white w-[100%] p-5 flex flex-col gap-5 mt-5 mb-5 sm:w-[90%] sm:flex-row sm:flex-wrap sm:gap-[4em]" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2 sm:w-[15em]">
                    <label htmlFor="name" className="text-white sm:text-[1.3rem]">Nom du lieu</label>
                    <input type="text" id="name" className="rounded bg-white pl-1 sm:w-[15em] sm:h-7 " onChange={(e)=>setName(e.target.value)} required />
                </div>
                <div className="flex flex-col gap-2 sm:w-[15em]">
                    <label htmlFor="category" className="text-white sm:text-[1.3rem]">Catégorie</label>
                    <select className="rounded bg-white sm:w-[15em] sm:h-7" id="category" onChange={(e)=>{setCategory(e.target.value); handleCategoryChange(e)}} required>
                        <option value="">Choisir une catégorie</option>
                        {placeCategory.map((cat, index)=>{
                            return(
                                <option key={index} value={cat}>{cat}</option>
                            )
                        })}
                        <option value="newCat">Ajouter une nouvelle catégorie</option>    
                    </select>
                </div>
                {newCategory && 
                    <div className="flex flex-col gap-2 sm:w-[17em]">
                    <label htmlFor="newCat" className="text-white sm:text-[1.3rem]">Nom de la nouvelle catégorie</label>
                    <input className="rounded bg-white pl-1 sm:w-[15em] sm:h-7" type="text" id="newCat" onChange={(e) => handleNewCategoryChange(e)} required />
                </div>}
                <div className="flex flex-col gap-2 sm:w-[15em]">
                    <label htmlFor="latitude" className="text-white sm:text-[1.3rem]">Latitude</label>
                    <input className="rounded bg-white sm:w-[15em] sm:h-7" type="text" id="latitude" onChange={(e)=>setLatitude(e.target.value)} required />
                </div>
                <div className="flex flex-col gap-2 sm:w-[15em]">
                    <label htmlFor="longitude" className="text-white sm:text-[1.3rem]">Longitude</label>
                    <input className="rounded bg-white sm:w-[15em] sm:h-7" type="text" id="longitude" onChange={(e)=>setLongitude(e.target.value)} required />
                </div>
                <div className="flex flex-col gap-2 sm:w-[15em]">
                    <label htmlFor="markerDiametre" className="text-white sm:text-[1.3rem]">Diamètre du marqueur</label>
                    <select className="rounded bg-white sm:w-[15em] sm:h-7" id="category" onChange={(e)=>setMarkerDiametre(e.target.value)} required>
                        <option value="">Choisir un diamètre</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                        <option value="50">50</option>
                    </select>
                </div>
                <div className="flex flex-col gap-2 sm:w-[15em]">
                    <label htmlFor="markerColor" className="text-white sm:text-[1.3rem]">Couleur du marqueur</label>
                    <select className="rounded bg-white sm:w-[15em] sm:h-7" id="category" onChange={(e)=>{setColor(e.target.value); handleColorChange(e)}} required>
                        <option value="">Choisir une couleur</option>
                        <option value="#FF0000">Rouge</option>
                        <option value="#2DC31B">Vert</option>
                        <option value="#FBFF00">Jaune</option>
                        <option value="#0008FF">Bleu</option>
                        <option value="#FF9700">Orange</option>
                        <option value="#C500FF">Violet</option>
                        <option value="##00FFFF	">Turquoise</option>
                        <option value="#800000">Marron</option>
                    </select>
                </div>
                <div className="flex flex-col gap-2 sm:w-[25em]">
                    <label htmlFor="logo" className="text-white sm:text-[1.3rem]">Logo du lieu</label>
                    <input type="file" className="rounded bg-white sm:w-[25em] sm:h-7" id="logo" onChange={handleLogoChange} required/>
                </div>
                <div className="flex flex-col gap-2 sm:w-[15em]">
                    <label htmlFor="altLogo" className="text-white sm:text-[1.3rem]">Texte alternatif du logo</label>
                    <input type="text" id="altLogo" className="rounded bg-white sm:w-[15em] sm:h-7" onChange={(e)=>setAltLogo(e.target.value)} required />
                </div>
                <div className="flex flex-col gap-2 sm:w-[25em]">
                    <label htmlFor="imagePlace" className="text-white sm:text-[1.3rem]">Image du lieu</label>
                    <input type="file" className="rounded bg-white sm:w-[25em] sm:h-7" id="imagePlace" onChange={handleImageChange} required />
                </div>
                <div className="flex flex-col gap-2 sm:w-[15em]">
                    <label htmlFor="altImage" className="text-white sm:text-[1.3rem]">Texte alternatif de l'image</label>
                    <input type="text" id="altImage" className="rounded bg-white sm:w-[15em] sm:h-7" onChange={(e)=>setAltImage(e.target.value)} required />
                </div>
                <div className="flex justify-center w-[100%]">
                    <button type="submit" className="text-white bg-[#023E33] hover:opacity-80 p-2 w-[7em] rounded-md sm:text-[1.2rem]">Ajouter</button>
                </div>
            </form>
            {messageAddPlace && <p className="text-white">{messageAddPlace}</p>}
        </div>
    </div>)
}