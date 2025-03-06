import React, {useEffect } from "react";
import { DisplayAccueil } from "../components/DisplayAccueil";
import { Header } from "../components/Header";
import axios from "axios";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
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
                <div className="sm:w-[12em] bg-[#5D5D5D] left-0 border-t border-black sm:h-full fixed">
                    <div className="bg-[#5D5D5D] w-[100vw] h-3em flex justify-around p-2 sm:hidden ">
                        <NavLink to='https://sound-nation.vercel.app/InformationsFaq' className='text-white border p-1 rounded-md' target="blank">Accéder au site</NavLink>
                    </div>
                     <div className="hidden sm:flex sm:flex-col sm:fixed sm:left-0 sm:gap-[3em] sm:ml-2 sm:mt-[6em] sm:text-[1.2rem] border rounded-md">
                        <NavLink to='https://sound-nation.vercel.app/InformationsFaq' className='text-white flex justify-center rounded hover:bg-[#858383] w-[9em] pl-1' target="blank">Accéder au site</NavLink>
                    </div>
                </div>
                <div className=" mt-5 sm:ml-[12em]">
                    <DisplayAccueil/>
                </div>
            </div>
        </div>
    );
};
