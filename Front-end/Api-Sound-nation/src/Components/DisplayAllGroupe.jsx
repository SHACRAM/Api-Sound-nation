import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { DisplayAllGroupeByDay } from "./DisplayAllGroupeByDay";

//Permet d'afficher tous les groupes en fonction du jour de leur concert
export const DisplayAllGroupe = ({setInfoModifyGroupe}) => {
    const [messageAllGroupe, setMessageAllGroupe] = useState("");
    const [vendredi, setVendredi] = useState([]);
    const [samedi, setSamedi] = useState([]);
    const [dimanche, setDimanche] = useState([]);

    // Fonction pour récupérer tous les groupes
    const handleAllGroupes = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/groupes");
            if (response.data.status) {
                const tempDatas = [];
                const tempVendredi = [];
                const tempSamedi = [];
                const tempDimanche = [];
                
                response.data.data.forEach((data) => {
                    tempDatas.push(data.groupe_date);
                    switch (data.groupe_date) {
                        case "Vendredi 22 juillet":
                            tempVendredi.push(data);
                            break;
                        case "Samedi 23 Juillet":
                            tempSamedi.push(data);
                            break;
                        case "Dimanche 24 Juillet":
                            tempDimanche.push(data);
                            break;
                        default:
                            break;
                    }
                });

                
                setVendredi(tempVendredi);
                setSamedi(tempSamedi);
                setDimanche(tempDimanche);
            } else {
                setMessageAllGroupe(response.data.message);
            }
        } catch (error) {
            setMessageAllGroupe("Erreur serveur, impossible d'afficher le contenu de la page");
        }
    }, []); 

    
    useEffect(() => {
        handleAllGroupes();
    }, [handleAllGroupes]);

    return (
        <div>
            <DisplayAllGroupeByDay
                jour={vendredi}
                dateConcert="Vendredi 22 juillet"
                setInfoModifyGroupe={setInfoModifyGroupe}
                handleAllGroupes={handleAllGroupes} 
            />
            <DisplayAllGroupeByDay
                jour={samedi}
                dateConcert="Samedi 23 Juillet"
                setInfoModifyGroupe={setInfoModifyGroupe}
                handleAllGroupes={handleAllGroupes}
            />
            <DisplayAllGroupeByDay
                jour={dimanche}
                dateConcert="Dimanche 24 Juillet"
                setInfoModifyGroupe={setInfoModifyGroupe}
                handleAllGroupes={handleAllGroupes} 
            />
        </div>
    );
};
