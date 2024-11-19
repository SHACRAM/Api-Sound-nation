import React from "react";
import { DisplayPageGroup } from "../Components/DisplayPageGroup";
import { Header } from "../Components/Header";


export const Groupe = () => {
    return (
        <div className="flex flex-col">
            <div>
                <Header />
            </div>
            <div>
                <div className="sm:w-[12em] bg-[#5D5D5D] left-0 border-t border-black h-full fixed">
                </div>
                <div className="sm:ml-[12em]">
                    <DisplayPageGroup/>
                </div>
            </div>
        </div>
        
    )
}