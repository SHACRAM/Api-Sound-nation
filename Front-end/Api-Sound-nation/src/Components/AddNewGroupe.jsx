import React, { useState } from "react";
import axios from "axios";

// Permet d'ajouter un nouveau groupe
export const AddNewGroupe = ({setActiveComponentGroupe}) => {
    const [imageGroupe, setImageGroupe] = useState(null);
    const [name, setName] = useState("");
    const [hour, setHour] = useState();
    const [date, setDate] = useState("");
    const [scene, setScene] = useState("");
    const [alt, setAlt] = useState("");
    const [messageAddGroupe, setMessageAddGroupe] = useState("");
    

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

        try {
            const response = await axios.post('http://localhost:3000/api/groupes/addGroupe', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.status) {
                setMessageAddGroupe(response.data.message);
                setTimeout(() => {
                    setActiveComponentGroupe(0);
                }, 2000);
            } else {
                setMessageAddGroupe(response.data.message);
            }
        } catch (error) {
            setMessageAddGroupe('Erreur serveur merci d\'essayer plus tard');
        }
    };

    return (
        <div className="flex flex-col items-center p-5">
            <h2 className="text-white text-center text-[1.2rem] sm:text-[1.5rem]">Ajouter un groupe</h2>
            <form className="border border-white p-5 flex flex-col gap-5 mt-5 mb-5 sm:w-[90%] sm:flex-row sm:flex-wrap sm:gap-[4em]" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2 sm:w-[15em]">
                    <label htmlFor="name" className="text-white sm:text-[1.3rem]">Nom du groupe / artiste</label>
                    <input className="rounded bg-[#B6B6B6] pl-1 sm:w-[15em] sm:h-7 " type="text" id="name" onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="flex flex-col gap-2 sm:w-[15em]">
                    <label htmlFor="hour" className="text-white sm:text-[1.3rem]">Heure du concert</label> 
                    <select className="rounded bg-[#B6B6B6] sm:w-[15em] sm:h-7" id="hour" onChange={(e) => setHour(parseInt(e.target.value))} required>
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
                    <select className="rounded bg-[#B6B6B6] sm:w-[15em] sm:h-7" id="date" onChange={(e) => setDate(e.target.value)} required>
                        <option value="">Choisir une date</option>
                        <option value="Vendredi 22 juillet">Vendredi 22 juillet</option>
                        <option value="Samedi 23 Juillet">Samedi 23 Juillet</option>
                        <option value="Dimanche 24 Juillet">Dimanche 24 Juillet</option>
                    </select>
                </div>
                <div className="flex flex-col gap-2 sm:w-[15em]">
                    <label htmlFor="scene" className="text-white sm:text-[1.3rem]">Scène</label>
                    <select className="rounded bg-[#B6B6B6] sm:w-[15em] sm:h-7" id="scene" onChange={(e) => setScene(e.target.value)} required>
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
                    <input className="rounded bg-[#B6B6B6] sm:w-[25em] sm:h-7" type="file" id="image" accept="image/*" onChange={handleFileChange} required />
                </div>
                <div className="flex flex-col gap-2 sm:w-[15em]">
                    <label htmlFor="alt" className="text-white sm:text-[1.3rem]">Texte alternatif</label>
                    <input className="rounded bg-[#B6B6B6] pl-1 sm:w-[15em] sm:h-7" type="text" id="alt" value={alt} onChange={(e) => setAlt(e.target.value)} required />
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="text-white bg-[#023E33] hover:opacity-80 p-2 w-[7em] rounded-md sm:text-[1.2rem]">Ajouter</button>
                </div>
            </form>
            {messageAddGroupe && <p className="text-white">{messageAddGroupe}</p>}
        </div>
    );
};

