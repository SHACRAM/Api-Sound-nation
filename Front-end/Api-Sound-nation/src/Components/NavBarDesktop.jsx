import react from 'react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
// Menu de navigation pour les écrans supérieurs à 640px
export const NavBarDesktop = ({setActiveDiv, userName, handleLogOut, isAuthenticated}) => {



    const handleclick = (number) => {
        switch(number){
            case 0:
                return () => {setActiveDiv(0);};
            case 1:
                return () => {setActiveDiv(1);}
            case 2:
                return () => {setActiveDiv(2);}
            case 3:
                return () => {setActiveDiv(3);}
            default:
                return () => {setActiveDiv(0);}
        }
    };



    return(<div>
        <div className='bg-[#5D5D5D] h-fit p-8 w-fit fixed left-0'>
        <NavLink onClick={handleclick(0)} to="/DisplayMainContent"><img src="src/images/Logo.png" alt="Image du logo du festival" className="w-[5em] sm:w-[8em]" /></NavLink>
        </div>
        <div className='fixed right-0 flex flex-col p-3 gap-2'>
            <div className='flex gap-2'>
                <img className='w-6 h-6' src="src/Images/User.png" alt="Logo d'un utilisateur" />
                <p className='text-white'>{userName}</p>
            </div>
            
            <button onClick={()=>handleLogOut()} className='text-white'>Se deconnecter</button>
        </div>

        <div className='bg-black flex gap-[4em] justify-center h-[11em] items-end pb-2 ml-[10em]'>
            <NavLink onClick={handleclick(1)} className='text-white text-[1.5rem] p-2 hover:bg-[#023E33] focus:bg-[#023E33] rounded-md'>Groupes</NavLink>
            <NavLink onClick={handleclick(2)} className='text-white text-[1.5rem] p-2 hover:bg-[#023E33] rounded-md focus:bg-[#023E33]'>Partenaires</NavLink>
            <NavLink onClick={handleclick(3)} className='text-white text-[1.5rem] p-2 hover:bg-[#023E33] rounded-md focus:bg-[#023E33]'>Carte</NavLink>
        </div>
        

    </div>)
};