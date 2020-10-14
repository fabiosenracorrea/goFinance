import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface CustomRoutesProps extends RouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const CustomRoute: React.FC<CustomRoutesProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();
  const isLogged = !!user;

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isPrivate === isLogged ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default CustomRoute;
