import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import Register from './Register';
import EditName from './EditName';
import PrivateRoute from './PrivateRoute';
import './App.css';
import Footer from './Footer';
import Mine from './Mine';
import Nav from './Nav';
import Transactions from './Transactions';

// TODO:
// [ ] style app
// [ ] create back-end applation with User class and auth
// [ ] incorporate checks in login, register, and edit name
// [ ] finish mining function
// [ ] fix private route render function

const App = () => {
  const [userData, setUserData] = useState({
    id: '',
    balance: 0,
    transactions: [],
    lastBlock: {},
    chainLength: 0
  });

  console.log(userData);

  return (
    <div className="App">
      <Nav />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <Route exact path='/' render={() => <Dashboard userData={userData} setUserData={setUserData} />} />
      <Route path='/account' component={EditName} />
      <Route path='/transactions' component={Transactions} />
      <Route path='/mine' render={() => <Mine userData={userData} setUserData={setUserData} />} />
      <Footer />
    </div>
  );
}

export default App;
