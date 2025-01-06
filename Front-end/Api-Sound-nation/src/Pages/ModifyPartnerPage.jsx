import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import { Header } from "../Components/Header";
import { useContext,useState, useEffect, useCallback } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ModifyPartner } from "../Components/ModifyPartner";
import axios from "axios";

export const ModifyPartnerPage = () => {
    const {connectInformation} = useContext(AuthContext);
    const location = useLocation();
    const infoPartner = location.state;
    const [categoryPartner, setCategoryPartner] = useState([]);
    const [message, setMessage] = useState("");

    const handleAllPartners = useCallback( async ()=>{
        try{
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/partners`);
            if(response.data.status){
                const tempData = [];
                response.data.data.forEach((partner)=>{
                    tempData.push(partner.partner_category);
                })
                setCategoryPartner([...new Set(tempData)]);
                setDataPartners(response.data.data);
 
            }
        }catch (error){
            setMessage("Erreur serveur, impossible d'afficher le contenu de la page");
        }
    }, []);

    useEffect(()=>{
        handleAllPartners();
    },[handleAllPartners]);


    return(
        <div>
            <Header/>
            <div>
                <div className="sm:w-[12em] bg-[#5D5D5D] left-0 border-t border-black h-full fixed"></div>
                <div className="hidden sm:flex sm:flex-col sm:fixed sm:left-0 sm:gap-[3em] sm:ml-2 sm:mt-[1em] sm:text-[1rem] border rounded-md">
                    <NavLink to='/Partenaire' state={true} className='text-white flex justify-center rounded hover:bg-[#858383] w-[11em] pl-1'>Ajouter un Partenaire</NavLink>
                </div>
                {infoPartner ?
                <div className="sm:ml-[12em]">
                    <ModifyPartner partnerData={infoPartner} categoryPartner={categoryPartner} />
                </div>
                :null}
            </div>
        </div>
    )
}