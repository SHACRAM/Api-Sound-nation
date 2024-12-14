import React from "react";
import { useState } from "react";
import axios from "axios";
import { DeletePartner } from "./DeletePartner";
import { NavLink } from "react-router-dom";



// Composant qui affiche tous les partenaires par catégorie
export const DisplayAllPartnersByCategory = ({dataPartners, categoryPartner, setInfoModifyPartner,handleAllPartners}) => {
    const [displayDeletePartner, setDisplayDeletePartner] = useState(false);
    const [idToDelete, setIdToDelete] = useState();
    const [messageDeletePartner, setMessageDeletePartner] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);


    const displayDeletePartnerComponent = (boolean)=>{
        setDisplayDeletePartner(boolean);
    }

    const handleClickDeletePartnerButton = (partner)=>{
        setIdToDelete(partner.id);
    }

    const handleDeletePartner = async ()=>{
       
        try{
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/partners/deletePartner`, {id:idToDelete});

            if(response.data.status){
                setMessageDeletePartner(response.data.message);
                setIsSuccess(true);
                setTimeout(()=>{
                    displayDeletePartnerComponent(false);
                    handleAllPartners();
                    setMessageDeletePartner("");
                }, 2000)
            } else{
                setMessageDeletePartner(response.data.message);
                setIsSuccess(false);
            }

        }catch (error){
            setMessageDeletePartner("Erreur serveur merci d'essayer plus tard");
            setIsSuccess(false);
        }

    }




    return(
        <div className="flex flex-col items-center">
            {categoryPartner.map((category, index)=>{
                return(
                    <div key={index} className="">
                        <div className="flex justify-start w-[100%]">
                            <h2 className="text-white text-[1.4rem] p-2 mt-3 mb-3">{category}</h2>
                        </div>
                        <div className="flex flex-wrap justify-center gap-[2em]">
                            {dataPartners.map((partner, index)=>{
                                if(partner.partner_category === category){
                                    return(
                                        <div key={index} className="border border-white flex flex-col items-center rounded-md w-[15em]">
                                            <h2 className="text-white text-[1.4rem] p-2">{partner.partner_name}</h2>
                                            <img src={`${import.meta.env.VITE_API_URL}/${partner.partner_image_path}`} alt={partner.partner_image_alt} className="w-[12em] p-3" />
                                            <div className="flex items-center gap-2 p-2">
                                                <img src="src/Images/WebSite.png" alt="Logo représentant le site web du partenaire" className="w-[1.5em]"/>
                                                <div>
                                                    <a href={partner.partner_site} className="text-white flex gap-1 items-center hover:text-[#FDA900]">Visiter le site  <img src="src/Images/FlecheDroite.png" alt="Logo d'une flèche" className="w-[1em] h-[1em]" /></a>
                                                   
                                                </div>
                                                
                                            </div>
                                            <div className="flex gap-4 mt-2 sm:p-2">
                                            <div className="flex items-center">
                                                <NavLink to='/ModifyPartnerPage' state={partner} className="text-white w-[6em] bg-[#023E33] p-2 mb-4 rounded-md text-center" onClick={()=>setInfoModifyPartner(partner)} >Modifier</NavLink>
                                            </div>
                                            
                                            <div>
                                                <button className="text-white w-[6em] bg-red-600 p-2 mb-4 rounded-md" onClick={()=>{handleClickDeletePartnerButton(partner) ;displayDeletePartnerComponent(true)}} >Supprimer</button>
                                            </div> 
                                        </div>
                                            
                                        </div>  
                                    )
                                }
                            })}
                        </div>
                        

                    </div>
                    
                
                )
            })}
            {displayDeletePartner &&
                <div >
                    <div className="fixed top-0 left-0 z-10 bg-black border w-[100%] h-[100vh] opacity-80 "></div>
                    <div className="z-20 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <DeletePartner displayDeletePartnerComponent={displayDeletePartnerComponent} handleDeletePartner={handleDeletePartner} messageDeletePartner={messageDeletePartner} isSuccess={isSuccess} />
                    </div>
                    
                </div>}

        </div>
    )
} 