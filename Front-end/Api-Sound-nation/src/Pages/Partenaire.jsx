import React from "react";
import { Header } from "../components/Header";
import { DisplayPagePartner } from "../components/DisplayPagePartner";
import { useContext,useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation } from "react-router-dom";

export const Partenaire = () => {
    const {connectInformation} = useContext(AuthContext);
    useEffect(() => {}, [connectInformation]);
    const location = useLocation();
    const {state} = location;

    return (
        <div className="flex flex-col">
            <div>
                <Header />
            </div>
            <div>
                <div className="sm:w-[12em] bg-[#5D5D5D] left-0 border-t border-black h-full fixed">
                </div>
                {connectInformation ?
                <div className="sm:ml-[12em]">
                    <DisplayPagePartner isComingFromPageModifyPartner={state}/>
                </div>
                :null}
            </div>
        </div>
        
    )
}