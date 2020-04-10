import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = props => {
    const { userData, setUserData } = props;

    useEffect(() => {
        const id = localStorage.getItem('id')

        // get blockchain on mount
        axios.get('http://localhost:5000/chain')
            .then(res => {
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
    
    return (
        <div className='Dashboard'>
            {userData.id && (
                <div className='userData'>
                    <p>Welcome, {userData.id}!</p>
                    <p>The current chain has {userData.chainLength} blocks.</p>
                    <p>Balance: ${userData.balance}</p>    
                </div>
            )}

            {userData.transactions && (
                < div className='transactions'>
                    <p>Transactions:</p>
                    {
                        userData.transactions.map((el, i) => {
                            let date = Date(el.timestamp);
                            
                            if (el.sender === '0') {
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
