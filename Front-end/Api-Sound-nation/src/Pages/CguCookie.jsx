import React from "react";
import {Header} from "../components/Header";
import { DisplayPageCguCookie } from "../components/DisplayPageCguCookie";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation } from "react-router-dom";

export const CguCookie = () => {
    const {connectInformation} = useContext(AuthContext);
    const location = useLocation();
    const fromModifyPage = location.state;

    useEffect(() => {}, [connectInformation]);

    return(
        <div>
            <Header/>
            <div>
                <div className="sm:w-[12em] bg-[#5D5D5D] left-0 border-t border-black h-full fixed"></div>
                {connectInformation ?
                <div className="sm:ml-[12em]">
                    <DisplayPageCguCookie fromModifyPage={fromModifyPage}/>
                </div>
                :null}
            </div>
        </div>
    )
};