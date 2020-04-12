import React from 'react';
import Tilt from 'react-tilt';
import detect from './face-detection.png';

const Logo = () => {
    return (
        <div className='ma4 mt0 center'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner pa3"><img style={{ paddingTop: '5px', color: 'white' }} src={detect} alt="logo"/></div>
            </Tilt>
        </div>
    );
}

export default Logo;