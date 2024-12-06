import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { DeleteFaq } from "./DeleteFaq";
import { NavLink } from "react-router-dom";


// Composant qui affiche toutes les questions / réponses
export const DisplayAllFaq = ({infoModifyFaq, handleClickFaq, data, getDataFaq }) => {
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [messageDelete, setMessageDelete] = useState('');
    const [displayDeleteDiv, setDisplayDeleteDiv] = useState(false);
    const [infoForDeleteFaq, setInfoForDeleteFaq] = useState({});
    


    const displayDeletePage = (boolean)=>{
        setDisplayDeleteDiv(boolean);
    }

    const handleDeleteFaq = (faq) => {
        setInfoForDeleteFaq(faq);
    };



    const handleDelete = async () => {
        const id = infoForDeleteFaq.id;

        try{
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/informations/deleteFaq`, {id});
            if(response.data.status){
                setMessageDelete(response.data.message);
                setIsSuccess(true);
                setTimeout(()=>{
                    displayDeletePage(false);
                    handleClickFaq(0);
                    getDataFaq();
                }, 2000);
            }

        }catch(error){
            if(error.response){
                setMessageDelete(error.response.data.message);
                setIsSuccess(false);}
        }
    };



    return(
        <div className="" >
            <h2 className="text-white text-[1.5rem] text-center mt-5">Questions / réponses</h2>
            <div className=" m-3 flex flex-col gap-3 items-center sm:flex-wrap sm:flex-row sm:justify-center ">
                {data ?
                data.map((item, index) =>{
                    return(
                        <div key={index} className="border m-4 p-2 rounded-md w-full flex flex-col justify-between gap-5 items-center sm:w-[25em] sm:h-[25em]">
                            <div className="flex flex-col gap-2 w-full">
                                <p className="text-white underline text-[1.3rem]">Question:</p>
                                <p className="text-white">{item.question}</p>
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <p className="text-white underline text-[1.3rem]">Réponse:</p>
                                <p className="text-white">{item.reponse}</p>
                            </div>
                            <div className="flex gap-4 mt-2 sm:p-2">
                                <div className="flex items-center">
                                    <NavLink to='/ModifyFaqPage' state={item} className="text-white w-[6em] bg-[#023E33] p-2 mb-4 rounded-md text-center" onClick={()=>infoModifyFaq(item)}  >Modifier</NavLink>
                                </div>
                        
                                <div>
                                    <button className="text-white w-[6em] bg-red-600 p-2 mb-4 rounded-md" onClick={()=>{displayDeletePage(true); handleDeleteFaq(item)}} >Supprimer</button>
                                </div> 
                            </div>
                        </div>
                    )
                }) : null}

            </div>
            {displayDeleteDiv &&
                <div >
                    <div className="fixed top-0 z-10 bg-black border w-full h-[100%] opacity-80 "></div>
                    <div className="z-20 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <DeleteFaq displayDeletePage={displayDeletePage} messageDelete={messageDelete} isSuccess={isSuccess} handleDelete={handleDelete} />
                    </div>
                    
                </div>}
        </div>
    )
};