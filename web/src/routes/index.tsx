import React from 'react';
import { Switch } from 'react-router-dom';

import CustomRoute from './Route';

import Dashboard from '../pages/Dashboard';
import Import from '../pages/Import';
import Single from '../pages/Single';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const Routes: React.FC = () => (
  <Switch>
    <CustomRoute path="/" exact component={SignIn} />
    <CustomRoute path="/signup" component={SignUp} />
    <CustomRoute isPrivate path="/dashboard" component={Dashboard} />
    <CustomRoute isPrivate path="/import" component={Import} />
    <CustomRoute isPrivate path="/create" component={Single} />
  </Switch>
);

export default Routes;
