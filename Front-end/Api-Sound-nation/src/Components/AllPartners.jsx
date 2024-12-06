import React from "react";
import { useState,useEffect,useCallback } from "react";
import axios from "axios";
import { DisplayAllPartnersByCategory } from "./DisplayAllPartnersByCategory";



// Composant qui affiche tous les partenaires
export const AllPartners = ({setInfoModifyPartner,dataPartners, message, categoryPartner, handleAllPartners })=>{
    

    useEffect(()=>{
        handleAllPartners();
    },[handleAllPartners]);




    return(
        <div className="mb-[3em]">
            <DisplayAllPartnersByCategory dataPartners={dataPartners} categoryPartner={categoryPartner} setInfoModifyPartner={setInfoModifyPartner} handleAllPartners={handleAllPartners}/>
        </div>)
}