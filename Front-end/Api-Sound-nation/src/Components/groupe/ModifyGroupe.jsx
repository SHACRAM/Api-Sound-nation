import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//Composant qui affiche le formulaire de modification d'un groupe
export const ModifyGroupe = ({groupeData,setActiveComponentGroupe}) => {
    const [id, setId] = useState(groupeData.id);
    const [imageGroupe, setImageGroupe] = useState(null);
    const [name, setName] = useState(groupeData.groupe_name);
    const [hour, setHour] = useState(groupeData.groupe_hour);
    const [date, setDate] = useState(groupeData.groupe_date);
    const [scene, setScene] = useState(groupeData.groupe_scene);
    const [alt, setAlt] = useState(groupeData.groupe_image_alt);
    const [bio, setBio] = useState(groupeData.groupe_bio);
    const [messageModifyGroupe, setMessageModifyGroupe] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageGroupe(file);
        } else {
            setImageGroupe(null);
        }
    };

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('name', name);
        formData.append('hour', hour);
        formData.append('date', date);
        formData.append('scene', scene);
        formData.append('imageGroupe', imageGroupe);
        formData.append('alt', alt);
        formData.append('bio', bio);

        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/groupes/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.status) {
                setMessageModifyGroupe(response.data.message);
                setIsSuccess(true);
                setTimeout(() => {
                    navigate('/Groupe');
                }, 1500);
            } else {
                setMessageModifyGroupe(response.data.message);
                setIsSuccess(false);
            }
        } catch (error) {
            setMessageModifyGroupe('Erreur serveur merci d\'essayer plus tard');
            setIsSuccess(false);
            
        }
    };



    return (
        <div className="flex flex-col items-center p-5">
            <h2 className="text-white text-center text-[1.2rem] sm:text-[1.5rem]">Modifier un groupe</h2>
            <form className="border border-white p-5 flex flex-col gap-5 mt-5 mb-5 sm:w-[90%] sm:flex-row sm:flex-wrap sm:gap-[4em]" onSubmit={handleSubmit} >
                <div className="flex flex-col gap-2 sm:w-[15em]">
                    <label htmlFor="name" className="text-white sm:text-[1.3rem]">Nom du groupe / artiste</label>
                    <input className="rounded bg-[#B6B6B6] pl-1 sm:w-[15em] sm:h-7 " type="text" id="name" onChange={(e) => setName(e.target.value)} required value={name} />
                </div>
                <div className="flex flex-col gap-2 sm:w-[15em]">
                    <label htmlFor="hour" className="text-white sm:text-[1.3rem]">Heure du concert</label> 
                    <select className="rounded bg-[#B6B6B6] sm:w-[15em] sm:h-7" id="hour" onChange={(e) => setHour(parseInt(e.target.value))} required value={hour}>
                        <option value="">Choisir une heure</option>
                        <option value="14">14h</option>
                        <option value="15">15h</option>
                        <option value="16">16h</option>
                        <option value="17">17h</option>
                        <option value="18">18h</option>
                        <option value="19">19h</option>
                        <option value="20">20h</option>
                        <option value="21">21h</option>
                        <option value="22">22h</option>
                        <option value="23">23h</option>
                    </select>
                </div>
                <div className="flex flex-col gap-2 sm:w-[15em]">
                    <label htmlFor="date" className="text-white sm:text-[1.3rem]">Date du concert</label>
                    <select className="rounded bg-[#B6B6B6] sm:w-[15em] sm:h-7" id="date" onChange={(e) => setDate(e.target.value)} required value={date}>
                        <option value="">Choisir une date</option>
                        <option value="Vendredi 22 juillet">Vendredi 22 juillet</option>
                        <option value="Samedi 23 juillet">Samedi 23 Juillet</option>
                        <option value="Dimanche 24 juillet">Dimanche 24 Juillet</option>
                    </select>
                </div>
                <div className="flex flex-col gap-2 sm:w-[15em]">
                    <label htmlFor="scene" className="text-white sm:text-[1.3rem]">Scène</label>
                    <select className="rounded bg-[#B6B6B6] sm:w-[15em] sm:h-7" id="scene" onChange={(e) => setScene(e.target.value)} required value={scene}>
                        <option value="">Choisir une scène</option>
                        <option value="1">Scène 1</option>
                        <option value="2">Scène 2</option>
                        <option value="3">Scène 3</option>
                        <option value="4">Scène 4</option>
                        <option value="5">Scène 5</option>
                    </select>
                </div>
                <div className="flex flex-col gap-2 sm:w-[25em]">
                    <label htmlFor="image" className="text-white sm:text-[1.3rem]">Image du groupe</label>
                    <input className="rounded bg-[#B6B6B6] sm:w-[25em] sm:h-7" type="file" id="image" accept="image/*" required onChange={handleFileChange}/>
                </div>
                <div className="flex flex-col gap-2 sm:w-[15em]">
                    <label htmlFor="alt" className="text-white sm:text-[1.3rem]">Texte alternatif</label>
                    <textarea className="rounded bg-white pl-1 h-[5em] sm:w-[15em] sm:h-[10em]" type="text" id="alt" value={alt} onChange={(e) => setAlt(e.target.value)} required />
                </div>
                <div className="flex flex-col gap-2 sm:w-[15em]">
                    <label htmlFor="bio" className="text-white sm:text-[1.3rem]">Biographie</label>
                    <textarea className="rounded bg-white pl-1 h-[5em] sm:w-[15em] sm:h-[10em]" type="text" id="bio" value={bio} onChange={(e) => setBio(e.target.value)} required />
                </div>
                <div className="flex justify-center items-end">
                    <button type="submit" className="text-white bg-[#023E33] h-[2em] flex items-center justify-center hover:opacity-80 p-2 w-[7em] rounded-md sm:text-[1.2rem]">Modifier</button>
                </div>
            </form>
            {messageModifyGroupe && (
                <p className={`flex justify-center w-[80%] p-3 ${isSuccess ? 'bg-green-500 text-black' : 'bg-red-600 text-white'} md:w-[15em]`}>
                    {messageModifyGroupe}
                </p>
            )}
            
        </div>
    );
};