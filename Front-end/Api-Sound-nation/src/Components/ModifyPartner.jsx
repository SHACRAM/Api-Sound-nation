import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Composant qui permet de modifier un partenaire
export const ModifyPartner = ({partnerData, setActiveComponentPartner, categoryPartner})=>{
        const [partnerId, setPartnerId] = useState(partnerData.id);
        const [partnerName, setPartnerName] = useState(partnerData.partner_name);
        const [partnerSite, setPartnerSite] = useState(partnerData.partner_site);
        const [partnerImage, setPartnerImage] = useState(null);
        const [partnerImageAlt, setPartnerImageAlt] = useState(partnerData.partner_image_alt);
        const [selectedCategory, setSelectedCategory] = useState(false);
        const [category, setCategory] = useState(partnerData.partner_category);
        const [messageModifyPartner, setMessageModifyPartner] = useState("");
        const [isSuccess, setIsSuccess] = useState(false);
        const navigate = useNavigate();

        const handleFileChange = (e) => {
                const file = e.target.files[0];
                if (file) {
                    setPartnerImage(file);
                } else {
                        setPartnerImage(null);
                }
        };

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



        const handleSubmit = async (e) => {
                e.preventDefault();
        
                const formData = new FormData();
                formData.append("name", partnerName);
                formData.append("site", partnerSite);
                formData.append("category", category);
                formData.append("imagePartner", partnerImage);
                formData.append("alt", partnerImageAlt);


                try {
                const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/partners/partner/${partnerId}`, formData, {
                        headers: {
                        'Content-Type': 'multipart/form-data'
                        }
                });
                if (response.data.status) {
                        setMessageModifyPartner(response.data.message);
                        setIsSuccess(true);
                        setTimeout(() => {
                        navigate('/Partenaire');
                        }, 2000);
                } else {
                        setMessageModifyPartner(response.data.message);
                        setIsSuccess(false);
                }
                } catch (error) {
                setMessageModifyPartner('Erreur serveur merci d\'essayer plus tard');
                setIsSuccess(false);
                
                }
        }



        
        return(<div>
                <div className="flex flex-col items-center p-5">
                    <h2 className="text-white text-center text-[1.2rem] sm:text-[1.5rem]">Modifier un partenaire</h2>
                    <form className="border border-white p-5 flex flex-col gap-5 mt-5 mb-5 sm:w-[90%] sm:flex-row sm:flex-wrap sm:gap-[4em]" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-2 sm:w-[15em]">
                            <label htmlFor="name" className="text-white sm:text-[1.3rem]">Nom du partenaire</label>
                            <input className="rounded bg-[#B6B6B6] pl-1 sm:w-[15em] sm:h-7 " type="text" id="name" onChange={(e) => setPartnerName(e.target.value)} value={partnerName} required />
                        </div>
                        <div className="flex flex-col gap-2 sm:w-[15em]">
                            <label htmlFor="category" className="text-white sm:text-[1.3rem]">Catégorie</label>
                            <select className="rounded bg-[#B6B6B6] sm:w-[15em] sm:h-7" id="category" onChange={(e) => {setCategory(e.target.value); handleCategoryChange(e)}} value={category} required>
                                <option value="">Choisir une catégorie</option>
                                {categoryPartner.map((category, index) => {
                            return (
                                <option key={index} value={category}>{category}</option>
                            )
                        })}
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
                            <input className="rounded bg-[#B6B6B6] pl-1 sm:w-[15em] sm:h-7" type="text" id="site" onChange={(e) => setPartnerSite(e.target.value)} value={partnerSite} required />
                        </div>
                       
                        <div className="flex flex-col gap-2 sm:w-[25em]">
                            <label htmlFor="image" className="text-white sm:text-[1.3rem]">Image du partenaire</label>
                            <input className="rounded bg-[#B6B6B6] sm:w-[25em] sm:h-7" type="file" id="image" accept="image/*" onChange={handleFileChange} required />
                        </div>
                        <div className="flex flex-col gap-2 sm:w-[15em]">
                            <label htmlFor="alt" className="text-white sm:text-[1.3rem]">Texte alternatif</label>
                            <input className="rounded bg-[#B6B6B6] pl-1 sm:w-[15em] sm:h-7" type="text" id="alt" onChange={(e) => setPartnerImageAlt(e.target.value)} value={partnerImageAlt} required />
                        </div>
                        <div className="flex justify-center">
                            <button type="submit" className="text-white bg-[#023E33] hover:opacity-80 p-2 w-[7em] rounded-md sm:text-[1.2rem]">Modifier</button>
                        </div>
                    </form>
                    {messageModifyPartner && <p className="text-white">{messageModifyPartner}</p>}
                </div>
            </div>
        )


}