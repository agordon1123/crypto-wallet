import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';

const Login = props => {
    console.log(props);

    const history = useHistory();

    const [creds, setCreds] = useState({
        username: '',
        password: ''
    })

    const handleChange = e => {
        setCreds({
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = props => {
        // handle axios call
        // set id to localStorage upon success
        localStorage.setItem('id', creds.username);
        history.push('/')
    }

    return (
        <div className='Login'>
            <p>Login.js</p>
            <input
                type='text'
                name='username'
                onChange={handleChange}
                placeholder='username'
            />
            <p>This will be your unique ID</p>
            
            <input
                type='text'
                name='password'
                onChange={handleChange}
                placeholder='password'
            />

            <button
                type='submit'
                onClick={() => handleSubmit('state')}
            >
                Submit
            </button>

            <p>New here? 
                <Link to='/register'>
                    Register
                </Link>
            </p>
        </div>
    );
}

export default Login;
