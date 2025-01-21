import react from 'react';
import { NavLink } from 'react-router-dom';
import { Header } from '../components/Header';
import {AddNewCguCookie} from '../components/AddNewCguCookie';


export const AddCguCookie = () => {
    return(
        <div>
            <Header/>
                <div>
                    <div className="sm:w-[12em] bg-[#5D5D5D] left-0 border-t border-black h-full fixed"></div>
                    <div className="hidden sm:flex sm:flex-col sm:fixed sm:left-0 sm:gap-[3em] sm:ml-2 sm:mt-[1em] sm:text-[1rem] border rounded-md">
                        <NavLink to='/CguCookie' className='text-white flex justify-center rounded hover:bg-[#858383] w-[11em] pl-1'>Ajouter un groupe</NavLink>
                    </div>
                </div>
                <div className="sm:ml-[12em]">
                    <AddNewCguCookie/>
            </div>
        </div>
    )
};