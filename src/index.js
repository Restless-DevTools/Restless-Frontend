import React from 'react';
import ReactDOM from 'react-dom';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import {
  BrowserRouter, Redirect, Route, Switch,
} from 'react-router-dom';
import './assets/scss/argon-dashboard-react.scss';
import { AuthenticationProvider } from './contexts/AuthenticationContext';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/dashboard" render={(props) => <DashboardLayout {...props} />} />
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
      <Redirect from="/" to="/auth" />
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(
  <>
    <AuthenticationProvider>
      <App />
    </AuthenticationProvider>
    <NotificationContainer />
  </>,
  document.getElementById('root'),
);
