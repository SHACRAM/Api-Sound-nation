import React from "react";
import { Header } from "../Components/Header";
import { DisplayPageCarte } from "../Components/DisplayPageCarte";

export const Carte = () => {
    return (
        <div className="flex flex-col">
            <div>
                <Header />
            </div>
            <div>
                <div className="sm:w-[12em] bg-[#5D5D5D] left-0 border-t border-black h-full fixed">
                </div>
                <div className="sm:ml-[12em]">
                    <DisplayPageCarte/>
                </div>
            </div>
        </div>
        
    )
}