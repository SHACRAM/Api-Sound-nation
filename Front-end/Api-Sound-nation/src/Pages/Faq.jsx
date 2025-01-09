import React from "react";
import {Header} from "../components/Header";
import { useLocation } from "react-router-dom";
import { useContext,useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { DisplayPageFaq } from "../components/DisplayPageFaq";




export const Faq = () => {
    const {connectInformation} = useContext(AuthContext);
    const location = useLocation();
    const {state}= location;

    useEffect(() => {}, [connectInformation]);

    return(
        <div>
            <Header/>
            <div>
                <div className="sm:w-[12em] bg-[#5D5D5D] left-0 border-t border-black h-full fixed"></div>
                {connectInformation ?
                <div className="sm:ml-[12em]">
                    <DisplayPageFaq isComingFromModifyFaq={state}/>
                    
                </div>
                :null}
            </div>
        </div>
    )
};