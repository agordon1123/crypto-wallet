import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Dashboard = props => {
    console.log(props);
    // deconstruct props

    const [userData, setUserData] = useState({
        id: '',
        balance: '',
        transactions: ''
    });

    const history = useHistory();

    useEffect(() => {
        const id = localStorage.getItem('id')
        setUserData({...userData, id: id});

        // get list of transactions on mount
        // parse data to create list of transactions for user
        // parse data to create total for user
    }, []);

    const handleChange = e => {
        // setState for changing ID
        // have input pop in with editing state
        // input new ID twice

        // parse data to see if ID exists already ?
        // TODO: how will we handle previous ledger changes when new ID??? It must be immutable...

        // we'll probably just start out with changing it in the localStorag and worrying about users when we impliment a login system...
    }

    const handleLogout = () => {
        localStorage.removeItem('id')
        history.push('/login')
    }

    return (
        <div className='Dashboard'>
            <p>Dashboard.js</p>
            {userData.id && (
                <>
                    <button onClick={() => handleLogout()}>
                        Logout
                    </button>
                <p>Welcome {userData.id}...</p>
                </>
            )}
        </div>
    );
}

export default Dashboard;
