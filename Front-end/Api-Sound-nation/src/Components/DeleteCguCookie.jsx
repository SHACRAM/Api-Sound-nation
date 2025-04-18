import React from "react";
// Composant qui affiche la fenêtre de confirmation de suppression 
export const DeleteCguCookie = ({messageDelete, isSuccess, handleDeleteDiv,handleDelete, itemToDelete })=>{
    return(
        <div className="bg-black border flex flex-col items-center w-[20em] p-3 gap-[5em] ">
            <p className="text-white text-[1.1rem]">Voulez-vous supprimer cette Faq?</p>
            <div className="text-white flex justify-between w-[10em] ">
                <button className="text-[1.2rem] p-1 rounded-md w-[3em] hover:bg-white hover:text-black " onClick={()=>handleDeleteDiv(false)} >Non</button>
                <button className="text-[1.2rem] p-1 rounded-md w-[3em] hover:bg-white hover:text-black" onClick={()=>handleDelete(itemToDelete)} >Oui</button>
            </div>
            {messageDelete && (
                    <p className={`flex justify-center w-[80%] p-3 ${isSuccess ? 'bg-green-500 text-black' : 'bg-red-600 text-white'} md:w-[15em]`}>
                        {messageDelete}
                    </p>
                )}
        </div>)







}