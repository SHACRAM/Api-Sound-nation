import React from "react";
// Affiche les groupe en fonction du jour de leur concert
export const DisplayAllGroupeByDay = ({jour, dateConcert}) => {



    return (
        <div className="flex flex-col"> 
            <div className="p-3">
                <h2 className="text-white text-[1.3rem]">{dateConcert}</h2>
            </div>
            <div className="p-5 flex flex-wrap gap-8 justify-center">
                {jour.map((groupe, index)=>(
                <div key={index} className="border border-white flex flex-col items-center">
                    <h2 className="text-white text-[1.4rem] p-2">{groupe.groupe_name}</h2>
                    <div>
                        <img src={`http://localhost:3000/${groupe.groupe_image_path}`} alt={groupe.groupe_image_alt} className="text-white w-[16em] p-3 rounded sm:w-[12em]"/>
                    </div>
                    <div className="flex flex-col gap-3 p-3 w-[100%] ml-6">
                        <div className="flex gap-3">
                            <img src="src/Images/Hour.svg" alt="Icone représentant une horloge" className="w-[1.5em]"/>
                            <p className="text-white">{groupe.groupe_hour} h</p>
                        </div>
                        <div className="flex gap-3">
                            <img src="src/Images/Stage.svg" alt="" className="w-[1.5em]"/>
                            <p className="text-white">Scène {groupe.groupe_scene}</p>
                        </div>
                        
                    </div>
                </div>
            ))}
                </div>
          
        </div>
    )
};