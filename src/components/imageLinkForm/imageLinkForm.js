import React from 'react';


const ImageLinkForm = ({ onInputChange, onSubmit }) => {
    return (
        <div className='ma4 mt0'>
            <p className="f3">
                {'Enter a picture url and I will tell you what food it is!'}
            </p>
            <div className="center">
                <div className="pa4 br3 shadow-5">
                    <div><input className="f4 pa2 w-70 center" type='text' onChange={onInputChange}/></div>
                    <button className="pointer mt3 grow f4 link ph3 pv2 dib dark-grey bg-light-grey" onClick={onSubmit}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;
