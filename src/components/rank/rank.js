import React from 'react';


const Rank = ({ food }) => {
    return (
        <div>
            <div className='f1 orange'>
                {food}
            </div>
            <br />
            <div className='f3'>
                {'Sophie, your current rank is...'}{'5'}
            </div>
        </div>
    );
}

export default Rank;