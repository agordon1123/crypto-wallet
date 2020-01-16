import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import Register from './Register';

const App = () => {
  return (
    <div className="App">
      <Route path='/' component={Dashboard} />
      <Route path='/login' component={Login} />
      <Route path='register' component={Register} />
    </div>
  );
}

export default App;
