import React from 'react';
import { Redirect, Route } from 'react-router';
import { isAuthenticated } from '../../utilities/authUtilities';

const PrivateRouter = ({ children, ...rest }) => {
    
    return (
        <Route
      {...rest}
      render={({ location }) =>
      isAuthenticated(null) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
    );
};

export default PrivateRouter;