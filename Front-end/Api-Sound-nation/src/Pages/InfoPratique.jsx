import React from "react";
import {Header} from "../Components/Header";
import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";
import { DisplayPageInfoPratique } from "../Components/DisplayPageInfoPratique";
import { useLocation } from "react-router-dom";
// Page de la section Informations pratiques
export const InfoPratique = () => {
    const {connectInformation} = useContext(AuthContext);
    const location = useLocation();
    const fromModifyPage = location.state;

    return(
        <div>
            <Header/>
            <div>
                <div className="sm:w-[12em] bg-[#5D5D5D] left-0 border-t border-black h-full fixed"></div>
                {connectInformation ?
                <div className="sm:ml-[12em]">
                    <DisplayPageInfoPratique fromModifyPage={fromModifyPage}/>
                </div>
                :null}
            </div>

        </div>
    )
};