import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';

import './assets/vendor/nucleo/css/nucleo.css';
import './assets/vendor/font-awesome/css/font-awesome.min.css';
import './assets/scss/argon-design-system-react.scss';
import './assets/css/custom.css';

import Index from './views/Index';
import Landing from './views/examples/Landing';
import Login from './views/Login/Login';
import Profile from './views/examples/Profile';
import Register from './views/Register/Register';
import Snippets from './views/Snippets/Snippets';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route
        path="/"
        exact
        render={(props) => <Index {...props} />}
      />
      <Route
        path="/landing-page"
        exact
        render={(props) => <Landing {...props} />}
      />
      <Route
        path="/login-page"
        exact
        render={(props) => <Login {...props} />}
      />
      <Route
        path="/profile-page"
        exact
        render={(props) => <Profile {...props} />}
      />
      <Route
        path="/register-page"
        exact
        render={(props) => <Register {...props} />}
      />
      <Route
        path="/snippets"
        exact
        render={(props) => <Snippets {...props} />}
      />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root'),
);
