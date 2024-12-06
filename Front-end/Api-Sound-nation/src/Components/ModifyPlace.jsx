import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


// Composant qui permet de modifier un lieu
export const ModifyPlace = ({setActiveComponentPlace, placeCategory, handleAllPlace, infoForModifyPlace}) => {
    const [messageModifyPlace, setMessageModifyPlace] = useState("");
    const [newCategory, setNewCategory] = useState(false);
    const [color, setColor] = useState(infoForModifyPlace.place_marker_color);
    const [category, setCategory] = useState(infoForModifyPlace.place_category);
    const [name, setName] = useState(infoForModifyPlace.place_name);
    const [latitude, setLatitude] = useState(infoForModifyPlace.place_latitude);
    const [longitude, setLongitude] = useState(infoForModifyPlace.place_longitude);
    const [markerDiametre, setMarkerDiametre] = useState(infoForModifyPlace.place_marker_diametre);
    const [logo, setLogo] = useState(null);
    const [altLogo, setAltLogo] = useState(infoForModifyPlace.place_logo_alt);
    const [imagePlace, setImagePlace] = useState(null);
    const [altImage, setAltImage] = useState(infoForModifyPlace.place_image_alt);
    const [placeId, setPlaceId] = useState(infoForModifyPlace.id);
    const [info, setInfo] = useState(infoForModifyPlace.place_info_popup);
    const navigate = useNavigate();

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
        formData.append('id', placeId);
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
        formData.append("info", info);



        try{
            const response = await axios.post (`${import.meta.env.VITE_API_URL}/api/places/modifyPlace`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if(response.data.status){
                setMessageModifyPlace(response.data.message);
                setTimeout(() => {
                    navigate('/Carte');
                    handleAllPlace();
                }, 2000);
            } else{
                setMessageModifyPlace(response.data.message);
            }
        } catch (error){
            setMessageModifyPlace('Erreur serveur merci de réessayer plus tard');

        }
    }


    return(<div>
        <div className="flex flex-col items-center p-5">
            <h2 className="text-white text-center text-[1.2rem] sm:text-[1.5rem]">Modifier un lieu</h2>
            <form className="border border-white w-[100%] p-5 flex flex-col gap-5 mt-5 mb-5 sm:w-[90%] sm:flex-row sm:flex-wrap sm:gap-[4em]" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2 sm:w-[15em]">
                    <label htmlFor="name" className="text-white sm:text-[1.3rem]">Nom du lieu</label>
                    <input type="text" id="name" className="rounded bg-white pl-1 sm:w-[15em] sm:h-7 " value={name} onChange={(e)=>setName(e.target.value)} required />
                </div>
                <div className="flex flex-col gap-2 sm:w-[15em]">
                    <label htmlFor="category" className="text-white sm:text-[1.3rem]">Catégorie</label>
                    <select className="rounded bg-white sm:w-[15em] sm:h-7" id="category" value={category} onChange={(e)=>{setCategory(e.target.value); handleCategoryChange(e)}} required>
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
                    <input className="rounded bg-white sm:w-[15em] sm:h-7" type="text" id="latitude" value={latitude} onChange={(e)=>setLatitude(e.target.value)} required />
                </div>
                <div className="flex flex-col gap-2 sm:w-[15em]">
                    <label htmlFor="longitude" className="text-white sm:text-[1.3rem]">Longitude</label>
                    <input className="rounded bg-white sm:w-[15em] sm:h-7" type="text" id="longitude" value={longitude} onChange={(e)=>setLongitude(e.target.value)} required />
                </div>
                <div className="flex flex-col gap-2 sm:w-[15em]">
                    <label htmlFor="markerDiametre" className="text-white sm:text-[1.3rem]">Diamètre du marqueur</label>
                    <select className="rounded bg-white sm:w-[15em] sm:h-7" id="category" value={markerDiametre} onChange={(e)=>setMarkerDiametre(e.target.value)} required>
                        <option value="">Choisir un diamètre</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                        <option value="50">50</option>
                    </select>
                </div>
                <div className="flex flex-col gap-2 sm:w-[15em]">
                    <label htmlFor="markerColor" className="text-white sm:text-[1.3rem]">Couleur du marqueur</label>
                    <select className="rounded bg-white sm:w-[15em] sm:h-7" id="category" value={color} onChange={(e)=>{setColor(e.target.value); handleColorChange(e)}} required>
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
                    <input type="text" id="altLogo" className="rounded bg-white sm:w-[15em] sm:h-7" value={altLogo} onChange={(e)=>setAltLogo(e.target.value)} required />
                </div>
                <div className="flex flex-col gap-2 sm:w-[25em]">
                    <label htmlFor="imagePlace" className="text-white sm:text-[1.3rem]">Image du lieu</label>
                    <input type="file" className="rounded bg-white sm:w-[25em] sm:h-7" id="imagePlace" onChange={handleImageChange} required />
                </div>
                <div className="flex flex-col gap-2 sm:w-[15em]">
                    <label htmlFor="altImage" className="text-white sm:text-[1.3rem]">Texte alternatif de l'image</label>
                    <input type="text" id="altImage" className="rounded bg-white sm:w-[15em] sm:h-7" value={altImage} onChange={(e)=>setAltImage(e.target.value)} required />
                </div>
                <div className="flex flex-col gap-2 sm:w-[15em]">
                    <label htmlFor="info" className="text-white sm:text-[1.3rem]">Informations du popup</label>
                    <input type="text" id="info" className="rounded bg-white sm:w-[15em] sm:h-7" value={info} onChange={(e)=>setInfo(e.target.value)} required />
                </div>
                <div className="flex justify-center w-[100%]">
                    <button type="submit" className="text-white bg-[#023E33] hover:opacity-80 p-2 w-[7em] rounded-md sm:text-[1.2rem]">Modifier</button>
                </div>
            </form>
            {messageModifyPlace && <p className="text-white">{messageModifyPlace}</p>}
        </div>
    </div>)
}