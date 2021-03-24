import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';

import './assets/scss/argon-dashboard-react.scss';

import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/dashboard" render={(props) => <DashboardLayout {...props} />} />
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
      <Redirect from="/" to="/auth" />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root'),
);
