import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import Register from './Register';
import EditName from './EditName';
import PrivateRoute from './PrivateRoute';
import './App.css';

// TODO:
// [ ] style app
// [ ] create back-end applation with User class and auth
// [ ] incorporate checks in login, register, and edit name
// [ ] finish mining function

const App = () => {
  return (
    <div className="App">
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <PrivateRoute exact path='/' component={Dashboard} />
      <PrivateRoute path='/edit' component={EditName} />
    </div>
  );
}

export default App;
