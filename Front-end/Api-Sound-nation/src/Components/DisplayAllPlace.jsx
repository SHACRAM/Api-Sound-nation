import React from "react";
import { useState, useEffect } from "react";
import { DisplayPlaceByCategory } from "./DisplayPlaceByCategory";

// Composant qui affiche tous les lieux
export const DisplayAllPlace = ({dataPlace, placeCategory, messageDisplayPlace, isLoaded, handleAllPlace, setInfoModifyPlace}) => {


    return(
    <div>
        {isLoaded ? <DisplayPlaceByCategory dataPlace={dataPlace} placeCategory={placeCategory} handleAllPlace={handleAllPlace} setInfoModifyPlace={setInfoModifyPlace} /> : <p className="text-white">{messageDisplayPlace}</p>}
    </div>)
}