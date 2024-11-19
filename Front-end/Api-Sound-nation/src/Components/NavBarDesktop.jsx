import react from 'react';
import { NavLink } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

// Menu de navigation pour les écrans supérieurs à 640px
export const NavBarDesktop = ({handleLogOut}) => {
    const {connectInformation} = useContext(AuthContext);

    useEffect(()=>{},[connectInformation]);

    return(<div>
        <div className='bg-[#5D5D5D] h-fit p-8 w-fit fixed left-0'>
        <NavLink to="/DisplayMainContent"><img src="src/images/Logo.png" alt="Image du logo du festival" className="w-[5em] sm:w-[8em]" /></NavLink>
        </div>
        <div className='absolute top-O right-0 flex flex-col p-3 gap-2'>
            <div className='flex gap-2'>
                <img className='w-6 h-6' src="src/Images/User.png" alt="Logo d'un utilisateur" />
                <p className='text-white'>{connectInformation.user_name}</p>
            </div>
            
            <button onClick={()=>handleLogOut()} className='text-white active:opacity-80'>Se deconnecter</button>
        </div>

        <div className='bg-black flex gap-[4em] justify-center h-[11em] items-end pb-2 ml-[10em]'>
            <NavLink className='text-white text-[1.5rem] p-2 hover:bg-[#023E33] focus:bg-[#023E33] rounded-md' to='/Groupe'>Groupes</NavLink>
            <NavLink className='text-white text-[1.5rem] p-2 hover:bg-[#023E33] rounded-md focus:bg-[#023E33]' to='/Partenaire'>Partenaires</NavLink>
            <NavLink className='text-white text-[1.5rem] p-2 hover:bg-[#023E33] rounded-md focus:bg-[#023E33]' to='/Carte'>Carte</NavLink>
        </div>
        

    </div>)
};