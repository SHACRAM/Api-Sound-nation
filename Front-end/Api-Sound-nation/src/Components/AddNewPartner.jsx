import React from "react";
import axios from "axios";
import { useState } from "react";

export const AddNewPartner = ({setActiveComponentPartner})=>{
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [imagePartner, setImagePartner] = useState(null);
    const [site, setSite] = useState("");
    const [alt, setAlt] = useState("");
    const [messageAddPartner, setMessageAddPartner] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(false);

    const handleCategoryChange = (e) => {
        const selectedValue = e.target.value;
         if(selectedValue === "newCat"){
            setSelectedCategory(true);
            setCategory("");
         }else{
            setSelectedCategory(false);
         } 
    };
    const handleNewCategoryChange = (e) => {
        setCategory(e.target.value);
    }
    

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePartner(file);
        } else {
            setImagePartner(null);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();


        const formData = new FormData();
        formData.append("name", name);
        formData.append("site", site);
        formData.append("category", category);
        formData.append("imagePartner", imagePartner);
        formData.append("alt", alt);


        try{
            const response = await axios.post("http://localhost:3000/api/partners/addPartner", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            if(response.data.status){
                setMessageAddPartner(response.data.message);
                setTimeout(() => {
                    setActiveComponentPartner(0);
                }, 2000);
            }else{
                setMessageAddPartner(response.data.message);
            }

        }catch (error){
            setMessageAddPartner("Erreur serveur, merci d'essayer plus tard");
        }
    };



    return(
    <div>
        <div className="flex flex-col items-center p-5">
            <h2 className="text-white text-center text-[1.2rem] sm:text-[1.5rem]">Ajouter un partenaire</h2>
            <form className="border border-white p-5 flex flex-col gap-5 mt-5 mb-5 sm:w-[90%] sm:flex-row sm:flex-wrap sm:gap-[4em]" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2 sm:w-[15em]">
                    <label htmlFor="name" className="text-white sm:text-[1.3rem]">Nom du partenaire</label>
                    <input className="rounded bg-[#B6B6B6] pl-1 sm:w-[15em] sm:h-7 " type="text" id="name" onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="flex flex-col gap-2 sm:w-[15em]">
                    <label htmlFor="category" className="text-white sm:text-[1.3rem]">Catégorie</label>
                    <select className="rounded bg-[#B6B6B6] sm:w-[15em] sm:h-7" id="category" onChange={(e) => {setCategory(e.target.value); handleCategoryChange(e)}} required>
                        <option value="">Choisir une catégorie</option>
                        <option value="Banque">Banque</option>
                        <option value="Alimentaire">Alimentaire</option>
                        <option value="Service">Service</option>
                        <option value="Audio">Audio</option>
                        <option value="newCat">Ajouter une nouvelle catégorie</option>
                    </select>
                </div>
                {selectedCategory && 
                    <div className="flex flex-col gap-2 sm:w-[15em]">
                    <label htmlFor="newCat" className="text-white sm:text-[1.3rem]">Nom de la nouvelle catégorie</label>
                    <input className="rounded bg-[#B6B6B6] pl-1 sm:w-[15em] sm:h-7" type="text" id="newCat" onChange={(e) => handleNewCategoryChange(e)} required />
                </div>}
                <div className="flex flex-col gap-2 sm:w-[15em]">
                    <label htmlFor="site" className="text-white sm:text-[1.3rem]">Site internet</label>
                    <input className="rounded bg-[#B6B6B6] pl-1 sm:w-[15em] sm:h-7" type="text" id="site" onChange={(e) => setSite(e.target.value)} required />
                </div>
               
                <div className="flex flex-col gap-2 sm:w-[25em]">
                    <label htmlFor="image" className="text-white sm:text-[1.3rem]">Image du partenaire</label>
                    <input className="rounded bg-[#B6B6B6] sm:w-[25em] sm:h-7" type="file" id="image" accept="image/*" onChange={handleFileChange} required />
                </div>
                <div className="flex flex-col gap-2 sm:w-[15em]">
                    <label htmlFor="alt" className="text-white sm:text-[1.3rem]">Texte alternatif</label>
                    <input className="rounded bg-[#B6B6B6] pl-1 sm:w-[15em] sm:h-7" type="text" id="alt" onChange={(e) => setAlt(e.target.value)} required />
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="text-white bg-[#023E33] hover:opacity-80 p-2 w-[7em] rounded-md sm:text-[1.2rem]">Ajouter</button>
                </div>
            </form>
            {messageAddPartner && <p className="text-white">{messageAddPartner}</p>}
        </div>
    </div>
)
}