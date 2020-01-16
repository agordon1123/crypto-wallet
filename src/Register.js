import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';

const Register = props => {
    console.log(props);

    const history = useHistory();

    const [creds, setCreds] = useState({
        username: '',
        password: ''
    })

    const handleChange = e => {
        setCreds({
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = props => {
        // handle axios call
        // set id to localStorage upon success
        if (creds.username !== '') {
            localStorage.setItem('id', creds.username);
            history.push('/');
        } else {
            // error state
        }
    }

    return (
        <div className='Register'>
            <p>Register.js</p>
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

            <p>Already have an account? 
                <Link to='/login'>
                    Login
                </Link>
            </p>
        </div>
    );
}

export default Register;
