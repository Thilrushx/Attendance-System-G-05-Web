import React from 'react';
import Navbar from '../components/navbar';

const header = ({whichversion}) => {
    return (
        <div>
            <Navbar whichversion={whichversion}/>
        </div>
    );
};

export default header;