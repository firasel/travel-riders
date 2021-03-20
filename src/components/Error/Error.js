import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div>
            <h1 style={{color:'red',textAlign:'center'}}>Please Try again, <Link to="/login"><small>LogIn</small></Link></h1>
        </div>
    );
};

export default Error;