import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const history = useHistory();

    const [userData, setUserData] = useState({
        id: '',
        balance: 0,
        transactions: [],
        lastBlock: {},
        chainLength: 0
    });

    const [mining, setMining] = useState(false);
    const [proof, setProof] = useState('');

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
                    chainLength: chain.length
                })
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const handleProofChange = e => {
        setProof(e.target.value);
    }

    const handleLogout = () => {
        localStorage.removeItem('id');
        history.push('/login');
    }

    const CancelToken = axios.CancelToken;
    let cancel;

    const mine = proof => {
        // get last block
        // run a proof of work
        // submit when true
        // setting canceling up to test
        
        axios.post('http://localhost:5000/mine', {
              id: userData.id, proof: proof 
            }, { 
              cancelToken: new CancelToken(function executor(c){
                  cancel = c;
              }) 
            }
        )
        .then(res => {
            alert(res.data.message)
        })
        .catch(err => {
            setMining(false);
            alert(err)
        })
    }

    return (
        <div className='Dashboard'>
            {userData.id && (
                <div className='userData'>
                    <button onClick={() => handleLogout()}>
                        Logout
                    </button>
                    <Link to='/edit'>Edit Name</Link>
                    <p>Welcome, {userData.id}!</p>
                    <p>The current chain has {userData.chainLength} blocks.</p>
                    <p>Balance: ${userData.balance}</p>
                    {!mining && (
                        // if setting up a proof of work on client side
                        // <button onClick={() => mine()}>Mine</button>
                        <button onClick={() => setMining(true)}>Mine</button>                
                    )}
                    {mining && (
                        <>
                            <p>...</p>
                            <input
                                type='text'
                                onChange={handleProofChange}
                            />
                            <button onClick={() => mine(proof)}>Submit</button>
                            <button onClick={() => setMining(false)}>Cancel</button>
                            {/* connected to axios request */}
                            {/* <button onClick={() =>  cancel()}>Cancel</button> */}
                        </>
                    )}
                </div>
            )}

            {userData.transactions && (
                < div className='transactions'>
                    <p>Transactions:</p>
                    {
                        userData.transactions.map((el, i) => {
                            let date = Date(el.timestamp);
                            
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
                </div>
            )}
        </div>
    );
}

export default Dashboard;
