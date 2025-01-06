import { NavLink } from 'react-router-dom';
import { useEffect, useContext,useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';

// Menu de navigation pour les écrans supérieurs à 640px
export const NavBarDesktop = ({handleLogOut, isInfoClicked, setIsInfoClicked}) => {
    const {connectInformation} = useContext(AuthContext);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    
    useEffect(() => {
    }, [connectInformation]);


    return(<div>
        <div className='bg-[#5D5D5D] h-fit p-8 w-fit fixed left-0'>
        <NavLink to="/DisplayMainContent"><img src="src/images/Logo.png" alt="Image du logo du festival" className="w-[5em] sm:w-[8em]" /></NavLink>
        </div>
        <div className='absolute top-O right-0 flex p-3 gap-8'>
            <div className='flex gap-2'>
                <img className='w-6 h-6' src="src/Images/User.png" alt="Logo d'un utilisateur" />
                {connectInformation ? <p className='text-white'>{connectInformation.user_name}</p>:null}
            </div>
            
            <button onClick={()=>handleLogOut()} className='text-white active:opacity-80'>Se deconnecter</button>
        </div>
        <div className='bg-black flex flex-col justify-end items-end ml-[12em] mr-2 h-[8em]'>
            <div>
                <NavLink className='text-white text-[1.2rem] p-2 hover:bg-[#023E33] focus:bg-[#023E33] rounded-md md:text-[1.4rem]' to='/Groupe'>Groupes</NavLink>
                <NavLink className='text-white text-[1.2rem] p-2 hover:bg-[#023E33] rounded-md focus:bg-[#023E33] md:text-[1.4rem]' to='/Partenaire'>Partenaires</NavLink>
                <NavLink className='text-white text-[1.2rem] p-2 hover:bg-[#023E33] rounded-md focus:bg-[#023E33] md:text-[1.4rem]' to='/Carte'>Carte</NavLink>
                <NavLink className='text-white text-[1.2rem] p-2 hover:bg-[#023E33] rounded-md focus:bg-[#023E33] md:text-[1.4rem]' to='/Utilisateur'>Utilisateurs</NavLink>
                <NavLink className='text-white text-[1.2rem] p-2 hover:bg-[#023E33] rounded-md focus:bg-[#023E33] md:text-[1.4rem]' onMouseLeave={()=>setIsMenuVisible(false)} onMouseEnter={()=>setIsMenuVisible(true)}>Informations</NavLink>
            </div>
        </div>
        
        <div className='flex justify-end mr-2'>
                    {isMenuVisible &&
                    <div className='flex bg-[#5D5D5D] rounded-b-md rounded-tl-md p-1' onMouseLeave={()=>setIsMenuVisible(false)} onMouseEnter={()=>setIsMenuVisible(true)}>
                        <NavLink className='text-white text-[1.2rem] p-2 hover:bg-[#023E33] rounded-md focus:bg-[#023E33] md:text-[1.2rem]' to='/Faq'>FAQ</NavLink>
                        <NavLink className='text-white text-[1.2rem] p-2 hover:bg-[#023E33] rounded-md focus:bg-[#023E33] md:text-[1.2rem]' to='/InfoPratique'>Infos pratiques</NavLink>
                        <NavLink className='text-white text-[1.2rem] p-2 hover:bg-[#023E33] rounded-md focus:bg-[#023E33] md:text-[1.2rem]' to='/CguCookie'>CGU & cookies</NavLink>
                    </div>
                    }
            </div>
    </div>)
};