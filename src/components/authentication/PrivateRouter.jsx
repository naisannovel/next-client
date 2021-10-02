import React from 'react';
import { Redirect, Route } from 'react-router';

const PrivateRouter = ({ children, ...rest }) => {
    
    return (
        <Route
      {...rest}
      render={({ location }) =>
      true ? (
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