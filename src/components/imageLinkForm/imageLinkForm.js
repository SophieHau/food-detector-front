import React from 'react';


const ImageLinkForm = ({ onInputChange, onSubmit }) => {
    return (
        <div className='ma4 mt0'>
            <p className="f3">
                {'This will detect faces in pictures'}
            </p>
            <div className="center">
                <div className="pa4 br3 shadow-5">
                    <input className="f4 pa2 w-70 center" type='text' onChange={onInputChange}/>
                    <button className="w-30 mt3 grow f4 link ph3 pv2 dib dark-grey bg-light-grey" onClick={onSubmit}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;
