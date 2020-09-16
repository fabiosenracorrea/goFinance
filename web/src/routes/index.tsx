import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Import from '../pages/Import';
import Single from '../pages/Single';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/import" component={Import} />
    <Route path="/create" component={Single} />
  </Switch>
);

export default Routes;
