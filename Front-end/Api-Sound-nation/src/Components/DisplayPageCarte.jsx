import React from "react";
import { useState,useEffect, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { AddNewPlace } from "./AddNewPlace";
import { DisplayAllPlace } from "./DisplayAllPlace";
import { ModifyPlace } from "./ModifyPlace";
import axios from "axios";


// Page qui permet d'afficher les différentes fonctionnalités liées aux lieux
export const DisplayPageCarte = ({}) => {
    const [activeComponentPlace, setActiveComponentPlace] = useState(0);
    const [infoForModifyPlace, setInfoForModifyPlace] = useState({});
    const [dataPlace, setDataPlace] = useState([]);
    const [messageDisplayPlace, setMessageDisplayPlace] = useState("");
    const [placeCategory, setPlaceCategory] = useState([]);
    const [isLoaded, setIsLoaded] = useState(true);
    
    

    const handleClickPlace = (number) => {
        setActiveComponentPlace(number);
    };

    const setInfoModifyPlace = (place) => {
        setInfoForModifyPlace(place);
        handleClickPlace(2);
    }
    
    
    

   
    
    const handleAllPlace = useCallback( async ()=>{
        try{
            const tempdataPlace = [];
            const response = await axios.get("http://localhost:3000/api/places");
            if(response.data.status){
                setDataPlace(response.data.data);
                response.data.data.forEach((data)=>{
                    tempdataPlace.push(data.place_category);
                });
                setPlaceCategory([...new Set(tempdataPlace)]);

            } else{
                setMessageDisplayPlace(response.data.message);
                isLoaded(false);
            }

        }catch (error){
            setMessageDisplayPlace("Erreur serveur lors de la récupération des lieux");
            isLoaded(false);

        }
    }, []);

    useEffect(()=>{
        handleAllPlace();
    },[handleAllPlace]);
 
   
    const pagesPlace =[
        <DisplayAllPlace dataPlace={dataPlace} placeCategory={placeCategory} messageDisplayPlace={messageDisplayPlace} isLoaded={isLoaded} handleAllPlace={handleAllPlace} setInfoModifyPlace={setInfoModifyPlace} />,
        <AddNewPlace setActiveComponentPlace={setActiveComponentPlace} placeCategory={placeCategory} handleAllPlace={handleAllPlace} />,
        <ModifyPlace infoForModifyPlace={infoForModifyPlace} setActiveComponentPlace={setActiveComponentPlace} placeCategory={placeCategory} handleAllPlace={handleAllPlace}/>
    ];

    return(<div className="flex flex-col items-center">
        <div className="ml-2 mb-1 ">
            <h1  onClick={() => handleClickPlace(0)}className="text-white text-[1.5rem] sm:hidden">Carte</h1>
        </div>
        <div className="bg-[#5D5D5D] w-[100vw] flex justify-around p-2 sm:hidden ">
            <NavLink onClick={() => handleClickPlace(1)} className='text-white border p-1 rounded-md'>Ajouter un lieu</NavLink>
            
        </div>
        <div className="hidden sm:flex sm:flex-col sm:fixed sm:left-0 sm:gap-[3em] sm:ml-2 sm:mt-[3em] sm:text-[1.2rem] border rounded-md">
                <NavLink onClick={() => handleClickPlace(1)} className='text-white flex justify-center rounded hover:bg-[#858383] w-[9em] pl-1'>Ajouter un lieu</NavLink>
                
        </div>
        <div className="w-[100%]"> 
            {pagesPlace[activeComponentPlace]} 

        </div>
        
    </div>)
}