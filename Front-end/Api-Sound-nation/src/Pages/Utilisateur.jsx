import react from "react";
import { useState, useContext,useEffect } from "react";
import axios from "axios";
import { Header } from "../Components/Header";
import { DisplayAllUsersByCat } from "../Components/DisplayAllUsersByCat";
import { AuthContext } from "../Context/AuthContext";
import { DeleteAccount } from "../Components/DeleteAccount";
import { ModifyRole } from "../Components/ModifyRole";
import { NavLink } from "react-router-dom";
import { SearchUser } from "../Components/SearchUser";

// Page qui permet d'afficher la liste des utilisateurs en fonction de leur rôle
export const Utilisateur = () => {
    const [data, setData] = useState([]);
    const [message, setMessage] = useState('');
    const [userRoleAdmin, setUserRoleAdmin] = useState([]);
    const [userRoleUser, setUserRoleUser] = useState([]);
    const {connectInformation} = useContext(AuthContext);
    const [messageDeleteAccount, setMessageDeleteAccount] = useState('');
    const [messageModifyRole, setMessageModifyRole] = useState('');
    const [deleteDiv, setDeleteDiv] = useState(false);
    const [modifyDiv, setModifyDiv] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [emailToDelete, setEmailToDelete] = useState('');
    const [emailToModify, setEmailToModify] = useState('');
    const [newRole, setNewRole] = useState('');
    const [role, setRole] = useState('');

    useEffect(()=>{
        handleAllUsers();
    },[connectInformation]);

    const handleDeleteDiv =  (boolean, email) => {
        setDeleteDiv(boolean);
        setEmailToDelete(email);
    };

    const handleModifyDiv = (boolean, role, email) => {
        setModifyDiv(boolean);
        setEmailToModify(email);
        setRole(role);
        if(role === 'admin'){
            setNewRole('user');
        }else{
            setNewRole('admin');
        } 
    }

    

    const handleAllUsers = async ()=>{
        try{
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/`, { withCredentials: true });
            if(response.data.status){
                setData(response.data.data);
                setUserRoleAdmin(response.data.data.filter(user=>user.user_role === 'admin'));
                setUserRoleUser(response.data.data.filter(user=>user.user_role === 'user'));
            }
        }catch(error){
            if(error.response){
                setMessage(error.response.data.message);
            }
        }
    }

    



    const handleDelete = async (email) => {
        try{
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/deleteAccount/${email}`, {withCredentials: true});
            if(response.data.status){
                setMessageDeleteAccount(response.data.message);
                setIsSuccess(true);
                setTimeout(()=>{
                    handleAllUsers();
                    setDeleteDiv(false);
                    setMessageDeleteAccount('');
                },2000);
            } else{
                setMessageDeleteAccount(response.data.message);
                setIsSuccess(false);
            }
        } catch(error){
            setMessageDeleteAccount("Erreur serveur merci d'essayer ultérieurement");
            setIsSuccess(false);
        }
    };

    const handleModify = async (emailToModify, newRole) => {
        try{
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/modifyRole`, {newRole, emailToModify}, {withCredentials: true});
            
            if(response.data.status){
                setMessageModifyRole(response.data.message);
                setIsSuccess(true);
                setTimeout(()=>{
                    handleAllUsers();
                    setModifyDiv(false);
                    setMessageModifyRole('');
                },2000);
            }
        }catch(error){
            if(error.response){
                setMessageModifyRole(error.response.data.message);
                setIsSuccess(false);
            } 
        }
    };


    return (
        <div>
            <Header/>
            <div className="sm:w-[12em] bg-[#5D5D5D] left-0 border-t border-black h-full fixed">
            <NavLink to='/AddUser' className='text-white border p-1 rounded-md fixed left-6 mt-5 hidden sm:flex hover:opacity-80'>Créer un compte</NavLink>
                </div>
            <div className="sm:ml-[12em] sm:p-4">
                <h1 className="text-white text-center text-[1.5rem] p-2">Utilisateurs</h1>
                <div className="bg-[#5D5D5D] w-full flex justify-around p-2 sm:hidden ">
                    <NavLink to='/AddUser' className='text-white border p-1 rounded-md'>Créer un utilisateur</NavLink>
                </div>
                <SearchUser data={data} handleDeleteDiv={handleDeleteDiv} handleModifyDiv={handleModifyDiv} handleDelete={handleDelete} handleModify={handleModify}/>
                {connectInformation && connectInformation.user_role === 'adminSys' ? 
                <div className="p-4">
                    <div className="mb-6 flex flex-col gap-2">
                    <h2 className="text-white text-[1.2rem]">Administrateurs</h2>
                    <DisplayAllUsersByCat data={userRoleAdmin} handleDelete={handleDelete} handleDeleteDiv={handleDeleteDiv} handleModifyDiv={handleModifyDiv} />
                    </div>
                    <div className="mb-6 flex flex-col gap-2">
                        <h2 className="text-white text-[1.2rem]">Utilisateurs</h2>
                        <DisplayAllUsersByCat data={userRoleUser} handleDelete={handleDelete} handleDeleteDiv={handleDeleteDiv} handleModifyDiv={handleModifyDiv}/>
                    </div>
                </div> : 
                <div className="mb-6 flex flex-col gap-2">
                <h2 className="text-white text-[1.2rem]">Utilisateurs</h2>
                <DisplayAllUsersByCat data={userRoleUser} handleDelete={handleDelete} handleDeleteDiv={handleDeleteDiv}/>
            </div>} 
            </div>
            {deleteDiv &&
                        <div >
                            <div className="fixed top-0 left-0 z-10 bg-black border w-[100%] h-[100vh] opacity-80 "></div>
                                <div className="z-20 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <DeleteAccount handleDeleteDiv={handleDeleteDiv} messageDeleteAccount={messageDeleteAccount} handleDelete={handleDelete} isSuccess={isSuccess} emailToDelete={emailToDelete}/>
                            </div>
                        </div>}
            {modifyDiv &&
            <div >
                <div className="fixed top-0 left-0 z-10 bg-black border w-[100%] h-[100vh] opacity-80 "></div>
                <div className="z-20 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <ModifyRole handleModifyDiv={handleModifyDiv} messageModifyRole={messageModifyRole} handleModify={handleModify} isSuccess={isSuccess} newRole={newRole} role={role} emailToModify={emailToModify}/>
            </div>
        </div>}
        </div>
        
    );
};