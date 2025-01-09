import React from "react";
import { DisplayAllCguCookie } from "./DisplayAllCguCookie";
import { AddNewCguCookie } from "./AddNewCguCookie";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";


export const DisplayPageCguCookie = ({fromModifyPage}) => {
    const [activeComponentCguCookie, setActiveComponentCguCookie] = useState(0);
    const [data, setData] = useState([]);
    const [messageError, setMessageError] = useState('');
    const [cgu, setCgu] = useState([]);
    const [cookie, setCookie] = useState([]);
    const [pData, setPData] = useState([]);



    const handleClickCguCookie = (number) => {
        setActiveComponentCguCookie(number);
    };

    


    const getData = async ()=>{
        const tempCgu = [];
        const tempCookie = [];
        const tempPData = [];
        try{
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/informations/getCguCookie`);
            if(response.data.status){
                response.data.data.map((info)=>{
                    if(info.category === 'cgu'){
                        tempCgu.push(info);
                    } else if(info.category === 'cookie'){
                        tempCookie.push(info);
                    }else{
                        tempPData.push(info);
                    }
                })
                setCgu(tempCgu);
                setCookie(tempCookie); 
                setPData(tempPData);   
            } 

        }catch(error){
            if(error.response){
                setMessageError(error.response.data.message);
            }
        }
    }

    




useEffect(()=>{
    getData();
    if(fromModifyPage){
        handleClickCguCookie(1);
    }
},[]);



    const pageCguCookie = [
        <DisplayAllCguCookie cgu={cgu} cookie={cookie} pData={pData} getData={getData} />,
        <AddNewCguCookie handleClickCguCookie={handleClickCguCookie} getData={getData} />,
    ] 

    return(
        <div className="">
        <h1 className="text-white text-[1.5rem] text-center p-2" onClick={() => handleClickCguCookie(0)}>CGU / cookies / données personnelles</h1>
        <div className="hidden sm:flex sm:flex-col sm:fixed sm:left-0 sm:gap-[3em] sm:ml-2 sm:mt-[1em] sm:text-[1rem] border rounded-md">
            <NavLink onClick={() => handleClickCguCookie(1)} className='text-white flex justify-center rounded hover:bg-[#858383] w-[11em] pl-1'>Ajouter une CGU, un cookie ou une donnée personnelle</NavLink>
        </div>
        <div className="bg-[#5D5D5D] flex justify-around p-2 sm:hidden ">
        <NavLink onClick={() => handleClickCguCookie(1)} className='text-white border p-1 rounded-md text-center'>Ajouter une CGU, un cookie ou une donnée personnelle</NavLink>
        </div>
        <div className="">
            {pageCguCookie[activeComponentCguCookie]}
        </div>


    </div>
    )
};