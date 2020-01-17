import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Moment from 'react-moment';
import axios from 'axios';

console.log(Moment)
const Dashboard = props => {
    console.log(props);
    // deconstruct props

    const [userData, setUserData] = useState({
        id: '',
        balance: 0,
        transactions: [],
        lastBlock: {}
    });

    const [mining, setMining] = useState(false);

    console.log(userData);

    const history = useHistory();

    useEffect(() => {
        const id = localStorage.getItem('id')

        // get list of transactions on mount
        axios.get('http://localhost:5000/chain')
            .then(res => {
                console.log(res);
                let chain = res.data.chain;
                
                // parse data to create total for user
                let count = 0;
                chain.map((block, i) => {
                    if (block.transactions) {
                        block.transactions.map((el, i) => {
                            if (el.recipient === id) {
                                count += parseInt(el.amount)
                            }
                            if (el.sender === id) {
                                count -= parseInt(el.amount)
                            }
                        })
                    }
                });

                // parse data to create list of transactions for user
                let transactions = [];
                chain.map((block, i) => {
                    if (block.transactions) {
                        block.transactions.map((el, i) => {
                            if (el.recipient === id) {
                                // add to transactions
                                console.log(block)
                                el.timestamp = block.timestamp;
                                transactions.push(el)
                            }
                        })
                    }
                })
                
                // set to state
                const lastBlock = chain[chain.length - 1]
                setUserData({
                    ...userData,
                    id: id,
                    balance: count,
                    transactions: transactions,
                    lastBlock: lastBlock,
                })
            })
            .catch(err => {
                console.log(err);
            })
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
                    <p>Balance: {userData.balance}</p>
                    <button onClick={() => setMining(true)}>Mine</button>                
                </>
            )}

            {userData.transactions && (
                <>
                    <p>Transactions:</p>
                    {
                        userData.transactions.map((el, i) => {
                            console.log(el)
                            let date = Date(el.timestamp);
                            console.log(date)
                            if (el.sender === "0") {
                                // mined => blue
                                return (
                                    <p style={{ color: 'blue' }}>Mined ${el.amount} on {date}</p>
                                )
                            } 
                            if (el.recipient === userData.id) {
                                // received => green
                                return (
                                <p style={{ color: 'green' }}>Received ${el.amount} from {el.sender} on {date}</p>
                                )
                            }
                            if (el.sender === userData.id) {
                                // sent => red
                                return (
                                    <p style={{ color: 'red' }}>Sent ${el.amount} to {el.recipient} on {date}</p>
                                )
                            }
                        })
                    }
                </>
            )}
        </div>
    );
}

export default Dashboard;
