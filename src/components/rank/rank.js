import React from 'react';


const Rank = ({ food, name, entries }) => {
    return (
        <div>
            <div className='f1 orange'>
                {food}
            </div>
            <br />
            <div className='f3'>
                {`Hi ${name}, your current entry count is ${entries}.`}
            </div>
        </div>
    );
}

export default Rank;