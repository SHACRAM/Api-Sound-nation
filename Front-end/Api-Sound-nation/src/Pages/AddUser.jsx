import React from "react";
import { AddUserComponent } from "../Components/AddUserComponent";
import { Header } from "../Components/Header";

export const AddUser = () => {
    return(
        <div>
            <Header/>
            <div className="sm:w-[12em] bg-[#5D5D5D] left-0 border-t border-black h-full fixed"></div>
            <div className="sm:ml-[12em]">
                <AddUserComponent />
            </div>
            
        </div>
        
    
    )
};