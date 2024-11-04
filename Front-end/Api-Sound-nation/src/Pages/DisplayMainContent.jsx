import React, { useState, useEffect } from "react";
import { DisplayAccueil } from "../Components/DisplayAccueil";
import { Header } from "../Components/Header";
import { DisplayPageGroup } from "../Components/DisplayPageGroup";
import { DisplayPageCarte } from "../Components/DisplayPageCarte";
import { DisplayPagePartner } from "../Components/DisplayPagePartner";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
axios.defaults.withCredentials = true;

export const DisplayMainContent = () => {
    const [activeDiv, setActiveDiv] = useState(0);
    const [isAuthenticated, setIsAuthenticated] = useState(null); 
    const navigate = useNavigate();
    const location = useLocation();
    const [userName, setUserName]= useState(location.state?.userName || "")
    

    const checkAuth = async () => {
        try {
            await axios.get("http://localhost:3000/api/authentication/verify-auth", { withCredentials: true });
            setIsAuthenticated(true);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setIsAuthenticated(false);
                navigate("/");
            }
        }
    };

    useEffect(() => {
        checkAuth();
        const interval = setInterval(checkAuth, 120000);
        return () => clearInterval(interval);
    }, [navigate]);


    const pages = [
        <div className="sm:ml-[12em]"><DisplayAccueil/></div>,
        <div className="sm:ml-[12em]"><DisplayPageGroup /></div>,
        <div className="sm:ml-[12em]"><DisplayPagePartner/></div>,
        <div className="sm:ml-[12em]"><DisplayPageCarte/></div>
    ];

    return (
        <div className="flex flex-col">
            <div>
                <Header setActiveDiv={setActiveDiv} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} userName={userName} />
            </div>
            <div>
                <div className="sm:w-[12em] bg-[#5D5D5D] left-0 border-t border-black h-full fixed">
                </div>
                <div>
                    {pages[activeDiv]}  
                </div>
            </div>
        </div>
    );
};
