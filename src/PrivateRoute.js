import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log(Component)
  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem('id')) {
          // if id is in localstorage, render the given component
          return <Component {...props} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default PrivateRoute;