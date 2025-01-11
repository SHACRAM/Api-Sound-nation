import React, {useEffect } from "react";
import { DisplayAccueil } from "../components/DisplayAccueil";
import { Header } from "../components/Header";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { use } from "react";
axios.defaults.withCredentials = true;

export const DisplayMainContent = () => { 
    const navigate = useNavigate();
    
    
    const checkAuth = async () => {
        try {
            await axios.get(`${import.meta.env.VITE_API_URL}/api/authentication/verify-auth`, { withCredentials: true });
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.log(error);
                navigate("/");
            }
        }
    };

    useEffect(() => {
        checkAuth();
        const interval = setInterval(checkAuth, 120000);
        return () => clearInterval(interval);
    }, [navigate]);
    

    return (
        <div className="flex flex-col">
            <div>
                <Header />
            </div>
            <div>
                <div className="sm:w-[12em] bg-[#5D5D5D] left-0 border-t border-black h-full fixed">
                </div>
                <div className="sm:ml-[12em]">
                    <DisplayAccueil/>
                </div>
            </div>
        </div>
    );
};
