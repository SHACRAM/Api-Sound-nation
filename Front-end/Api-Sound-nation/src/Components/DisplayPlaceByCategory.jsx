import React from "react";
import { useState } from "react";
import { DeletePlace } from "./DeletePlace";
import axios from "axios";




// Composant qui permet d'afficher le détail des lieux par catégorie
export const DisplayPlaceByCategory = ({dataPlace, placeCategory, handleAllPlace, setInfoModifyPlace }) => {
    const [deletePlace, setDeletePlace] = useState(false);
    const [idToDelete, setIdToDelete] = useState();
    const [messageDeletePlace, setMessageDeletePlace] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const handleDeletePlace = (boolean)=>{
        setDeletePlace(boolean);
    }



    const submitDeletePlace = async () => {

        try{
            const response = await axios.post('http://localhost:3000/api/places/deletePlace', {id:idToDelete});

            if(response.data.status){
                setMessageDeletePlace(response.data.message);
                setIsSuccess(true);
                setTimeout(()=>{
                    handleDeletePlace(false);
                    handleAllPlace();
                }, 2000)


            } else{
                setMessageDeletePlace(response.data.message);
                isSuccess(false);
                setTimeout(()=>{
                    setMessageDeletePlace("");
                }, 2000);
            }
        } catch (error){
            setMessageDeletePlace("Erreur serveur lors de la suppression du lieu merci de réessayer plus tard");
            setIsSuccess(false);
            setTimeout(()=>{
                setMessageDeletePlace("");
            }, 2000);
        }
    }




    return(
    <div>
        <div className="flex flex-col gap-8">
            {placeCategory.map((category, index)=>{
                return(
                    <div key={index} className="m-2 flex flex-col gap-4">
                        <h2 className="text-white text-[1.4rem] mb-2">{category}</h2>
                        <div className="flex flex-col gap-5">
                            {dataPlace.map((place, index)=>{
                                if(place.place_category === category){
                                    return(
                                    <div key={index} className="border flex flex-col p-2 gap-4">
                                        <div className="md:flex md:flex-row md:gap-[4em]">
                                            <div className="flex gap-4">
                                                <div className="flex flex-col gap-3">
                                                    <h3 className="text-white"><strong>Nom:</strong></h3>
                                                    <p className="text-white"><strong>Latitude:</strong></p>
                                                    <p className="text-white"><strong>Longitude:</strong></p>
                                                    <p className="text-white"><strong>Diamètre marqueur:</strong></p>
                                                    <p className="text-white"><strong>Couleur marqueur:</strong></p>
                                                </div>
                                                <div className="flex flex-col gap-3">
                                                    <h3 className="text-white">{place.place_name}</h3>
                                                    <p className="text-white">{place.place_latitude}</p>
                                                    <p className="text-white">{place.place_longitude}</p>
                                                    <p className="text-white">{place.place_marker_diametre}</p>
                                                    <div className="mt-2">
                                                        <div className="w-8 h-3" style={{backgroundColor: place.place_marker_color}}></div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex flex-col gap-4 mt-5">
                                                <div className="flex flex-col gap-3 md:flex-row md:items-center">
                                                    <img src={`http://localhost:3000/${place.place_logo_path}`} alt={place.place_logo_alt} className="w-[3em] h-[3em] md:w-[6em] md:h-[6em]"/>
                                                    <p className="text-white"><strong>Texte alternatif du logo: </strong> {place.place_logo_alt}</p>
                                                </div>
                                                <div className="flex flex-col gap-3 md:flex-row md:items-center">
                                                    <img src={`http://localhost:3000/${place.place_image_path}`} alt={place.place_image_alt} className="w-[3em] h-[3em] md:w-[6em] md:h-[6em]"/>
                                                    <p className="text-white"><strong>Texte alternatif de l'image: </strong>{place.place_image_alt}</p>
                                                </div>
                                            </div>
                                            <div className="mt-5 flex flex-col gap-2">
                                                <p className="text-white"><strong>Informations du popup:</strong></p>
                                                <p className="text-white">{place.place_info_popup}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex justify-center gap-4 mt-2 sm:p-2 md:mt-5">
                                                <div>
                                                    <button className="text-white w-[6em] bg-[#023E33] p-2 mb-4 rounded-md" onClick={(e)=>setInfoModifyPlace(place)} >Modifier</button>
                                                </div>
                                                
                                                <div>
                                                    <button className="text-white w-[6em] bg-red-600 p-2 mb-4 rounded-md" onClick={(e)=>{handleDeletePlace(true); setIdToDelete(place.id)}}  >Supprimer</button>
                                                </div> 
                                            </div>
                                        
                                    </div>)
                                }
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
        {deletePlace &&
                <div >
                    <div className="fixed top-0 left-0 z-10 bg-black border w-[100%] h-[100vh] opacity-80 "></div>
                    <div className="z-20 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <DeletePlace handleDeletePlace={handleDeletePlace} submitDeletePlace={submitDeletePlace} messageDeletePlace={messageDeletePlace} isSuccess={isSuccess} />
                    </div>
                    
                </div>}

    </div>
    )
}