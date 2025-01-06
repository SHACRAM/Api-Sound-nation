import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { DisplayAllInfoPratique } from "../Components/DisplayAllInfoPratique";
import { AddNewInfoPratique } from "../Components/AddNewInfoPratique";
import { NavLink } from "react-router-dom";


// Composant qui affiche les éléments de la page Informations pratiques
export const DisplayPageInfoPratique = ({fromModifyPage}) => {
    const [activeComponentInfoPratique, setActiveComponentInfoPratique] = useState(0);
    const [infoForModifyInfoPratique, setInfoForModifyInfoPratique] = useState({});
    const [data, setData] = useState([]);
    const [message, setMessage] = useState('');
    

    const handleClickInfoPratique = (number) => {
        setActiveComponentInfoPratique(number);
    };

   
    const handleInfoModifyInfoPratique = (info) =>{
        setInfoForModifyInfoPratique(info);
    }

    
    const getData = async ()=>{

        try{
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/informations/`);
            if(response.data.status){
                setData(response.data.data);
            }

        }catch(error){
            if(error.response){
                setMessage(error.response.data.message);
            }else{
                setMessage("Une erreur s'est produite. Veuillez réessayer ultérieurement");
            }
        }
    }

    useEffect(()=>{
        getData();
        if(fromModifyPage){
            handleClickInfoPratique(1);
        }
    }, [fromModifyPage]);

    const pageInfoPratique = [
        <DisplayAllInfoPratique data={data}  handleInfoModifyInfoPratique={handleInfoModifyInfoPratique} getData={getData}/>,
        <AddNewInfoPratique handleClickInfoPratique={handleClickInfoPratique} getData={getData} />,
    ]


    return(
        <div className="">
        <h1 className="text-white text-[1.5rem] text-center p-2" onClick={() => handleClickInfoPratique(0)}>Informations pratiques</h1>
        <div className="hidden sm:flex sm:flex-col sm:fixed sm:left-0 sm:gap-[3em] sm:ml-2 sm:mt-[1em] sm:text-[1rem] border rounded-md">
            <NavLink onClick={() => handleClickInfoPratique(1)} className='text-white flex justify-center rounded hover:bg-[#858383] w-[11em] pl-1'>Ajouter une information</NavLink>
        </div>
        <div className="bg-[#5D5D5D] flex justify-around p-2 sm:hidden ">
        <NavLink onClick={() => handleClickInfoPratique(1)} className='text-white border p-1 rounded-md'>Ajouter une information</NavLink>
        </div>
        <div className="">
            {pageInfoPratique[activeComponentInfoPratique]}
        </div>


    </div>
    )
};