import React from "react";
import { useState,useEffect,useCallback } from "react";
import axios from "axios";
import { DisplayAllPartnersByCategory } from "./DisplayAllPartnersByCategory";



// Composant qui affiche tous les partenaires
export const AllPartners = ({setInfoModifyPartner})=>{
    const [dataPartners, setDataPartners] = useState([]);
    const [message, setMessage]= useState("");
    const [categoryPartner, setCategoryPartner] = useState([]);


    const handleAllPartners = useCallback( async ()=>{
        try{
            const response = await axios.get('http://localhost:3000/api/partners');
            if(response.data.status){
                const tempData = [];
                response.data.data.forEach((partner)=>{
                    tempData.push(partner.partner_category);
                })
                setCategoryPartner([...new Set(tempData)]);
                setDataPartners(response.data.data);

            }else{
                setMessage(response.data.message);
            }

        }catch (error){
            setMessage("Erreur serveur, impossible d'afficher le contenu de la page");
        }
    }, []);

    useEffect(()=>{
        handleAllPartners();
    },[handleAllPartners]);




    return(
        <div className="mb-[3em]">
            <DisplayAllPartnersByCategory dataPartners={dataPartners} categoryPartner={categoryPartner} setInfoModifyPartner={setInfoModifyPartner} handleAllPartners={handleAllPartners}/>
        </div>)
}