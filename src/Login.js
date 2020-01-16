import React, { useState } from 'react';
import axios from 'axios';

const Login = props => {
    console.log(props);

    const handleChange = e => {
        // setState
    }

    const handleSubmit = props => {
        // handle axios call
        // set id to localStorage upon success
    }

    return (
        <div className='Login'>
            <p>Login.js</p>
        </div>
    );
}

export default Login;
