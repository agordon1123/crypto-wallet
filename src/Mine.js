import React, { useState } from 'react';
import axios from 'axios';
import { sha256 } from 'js-sha256';

const Mine = props => {

    const { userData, setUserData } = props;

    const [mining, setMining] = useState(false);
    
    const CancelToken = axios.CancelToken;
    let cancel;
    
    const mine = () => {
        let proof = proofOfWork(userData.lastBlock);
        
        axios.post('http://localhost:5000/mine', {
              id: userData.id, proof: proof 
            }, { 
              cancelToken: new CancelToken(function executor(c){
                  cancel = c;
              }) 
            }
        )
        .then(res => {
            setMining(false)
            alert(res.data.message)
        })
        .catch(err => {
            setMining(false);
            alert(err)
        })
    }

    const proofOfWork = block => {
        let blockString = JSON.stringify(block);
        let proof = 0;
        while (validProof(blockString, proof) === false) {
            proof += 1;
        }
        return proof;
    }

    const validProof = (blockString, proof) => {
        let guess = `${blockString}${proof}`;
        let encodedGuess = encodeURIComponent(guess);
        let re = /^[A-Z]/;
        let te = /[%]/;
        let newBlockString = '';

        if (re.test(encodedGuess) || te.test(encodedGuess)) {
            for (let i = 0; i < encodedGuess.length; i++) {
                if (re.test(encodedGuess[i])) {
                  newBlockString += 'x';
                  newBlockString += encodedGuess[i].toLocaleLowerCase();
                } else if (te.test(encodedGuess[i])) {
                  newBlockString += '\\';
                } else {
                  newBlockString += encodedGuess[i]
                }
            }
        }

        let hash = sha256.create();
        let guessHash = hash.update(encodedGuess).hex();
        let leadingZeros = guessHash.substr(0, 4);

        if (leadingZeros == '0000') {
            return true;
        } else {
            return false;
        }
    }

    return (
        <div className='Mine'>
            <p>MINE</p>
            {!mining && (
                <button onClick={() => {
                    setMining(true)
                    mine()
                }}>Mine</button>
            )}
        </div>
    );
};

export default Mine;