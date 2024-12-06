import React from "react";
import {Header} from "../Components/Header";
import { NavLink } from "react-router-dom";
import { useContext,useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { DisplayPageFaq } from "../Components/DisplayPageFaq";




export const Faq = () => {
    const {connectInformation} = useContext(AuthContext);

    useEffect(() => {}, [connectInformation]);

    return(
        <div>
            <Header/>
            <div>
                <div className="sm:w-[12em] bg-[#5D5D5D] left-0 border-t border-black h-full fixed"></div>
                {connectInformation ?
                <div className="sm:ml-[12em]">
                    <DisplayPageFaq/>
                    
                </div>
                :null}
            </div>
        </div>
    )
};