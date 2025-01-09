import React from "react";
import { useLocation, useNavigate,NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

import {Header} from "../components/Header";
import { DisplayModifyCguCookie } from "../components/DisplayModifyCguCookie";


export const ModifyCguCookie = ()=>{
    const location = useLocation();
    const item = location.state;
    
    

    

    return(
        <div>
            <Header/>
            <div>
                <div className="sm:w-[12em] bg-[#5D5D5D] left-0 border-t border-black h-full fixed"></div>
                <div className="hidden sm:flex sm:flex-col sm:fixed sm:left-0 sm:gap-[3em] sm:ml-2 sm:mt-[1em] sm:text-[1rem] border rounded-md">
                    <NavLink to='/CguCookie' state={true} className='text-white flex justify-center rounded hover:bg-[#858383] w-[11em] pl-1'>Ajouter une CGU ou un cookie</NavLink>
                </div>
                {item ?
                <div className="sm:ml-[12em]">
                    <DisplayModifyCguCookie item={item} />
                </div>
                :null}
            </div>
            
    </div>    
    )
}