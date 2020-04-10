import React from 'react';


const FoodRecognition = ({ imageUrl }) => {
    return (
        <div className="center ma">
            <div className="absolute mt2 mb5">
                <img src={imageUrl} alt="" width="500px" height="auto" id="inputImage"/>
            </div>
        </div>
    );
}

export default FoodRecognition;