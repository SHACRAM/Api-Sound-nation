import React from "react";
//Composent permettant de changer le role d'un utilisateur
export const ModifyRole = ({messageModifyRole, handleModifyDiv, handleModify, isSuccess, newRole, role, emailToModify}) => {
    return(
    <div className="bg-black border flex flex-col items-center w-[20em] p-3 gap-[5em] md:w-[30em] ">
        <p className="text-white text-[1.1rem]">êtes vous sur de vouloir effectuer ce changement?</p>
        <div className="flex gap-3">
            <div className="flex flex-col items-center">
                <p className="text-gray-500">Rôle actuel</p>
                <p className="text-white">{role}</p>
            </div>
            <img src="src/images/flecheDroite2.png" alt="Image d'une flèche vers la droite" />
            <div className="flex flex-col items-center">
                <p className="text-gray-500">Nouveau rôle</p>
                <p  className="text-white">{newRole}</p>
            </div>
        </div>
        <div className="text-white flex justify-between w-[10em] ">
            <button className="text-[1.2rem] p-1 rounded-md w-[3em] hover:bg-white hover:text-black " onClick={()=>handleModifyDiv(false)}>Non</button>
            <button className="text-[1.2rem] p-1 rounded-md w-[3em] hover:bg-white hover:text-black" onClick={()=>handleModify(emailToModify, newRole)} >Oui</button>
        </div>
        {messageModifyRole && (
                <p className={`flex justify-center w-[80%] p-3 ${isSuccess ? 'bg-green-500 text-black' : 'bg-red-600 text-white'} md:w-[15em]`}>
                    {messageModifyRole}
                </p>
            )}
    </div>)
}