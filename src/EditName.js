import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const EditName = () => {
    const [newName, setNewName] = useState({
        prevName: '',
        newName: ''
    });

    const history = useHistory();

    const handleChange = e => {
        setNewName({
            ...newName,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = newName => {
        if (localStorage.getItem('id') === newName.prevName) {
            localStorage.setItem('id', newName.newName)
            history.push('/')
        } else {
            alert("Incorrect previous name")
        }
    }


    return (
        <div className='EditName'>
            <p>Warning, this will erase all ledger history for your account on this Blockchain</p>
            <input
                type='text'
                name='prevName'
                placeholder='current name'
                onChange={handleChange}
            />
            <input
                type='text'
                name='newName'
                placeholder='new name'
                onChange={handleChange}
            />
            <button onClick={() => handleSubmit(newName)}>
                Submit
            </button>
        </div>
    );
}

export default EditName;
