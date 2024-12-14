import React from "react";
import { DisplayPageGroup } from "../Components/groupe/DisplayPageGroup";
import { Header } from "../Components/Header";
import { useContext,useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";


export const Groupe = () => {
    const {connectInformation} = useContext(AuthContext);

    useEffect(() => {}, [connectInformation]);
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
                    <DisplayPageGroup/>
                </div>
                :null}   
            </div>
        </div>
        
    )
}