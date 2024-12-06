import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import { Header } from "../Components/Header";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ModifyFaq } from "../Components/ModifyFaq";

export const ModifyFaqPage = () => {
    const {connectInformation} = useContext(AuthContext);
    const location = useLocation();
    const infoFaq = location.state;


    return(
        <div>
            <Header/>
            <div>
                <div className="sm:w-[12em] bg-[#5D5D5D] left-0 border-t border-black h-full fixed"></div>
                <div className="hidden sm:flex sm:flex-col sm:fixed sm:left-0 sm:gap-[3em] sm:ml-2 sm:mt-[1em] sm:text-[1rem] border rounded-md">
                    <NavLink to='/InfoPratique' state={true} className='text-white flex justify-center rounded hover:bg-[#858383] w-[11em] pl-1'>Ajouter une Faq</NavLink>
                </div>
                {infoFaq ?
                <div className="sm:ml-[12em]">
                    <ModifyFaq data={infoFaq} />
                </div>
                :null}
            </div>
        </div>
    )
}