import React, { useEffect, useRef } from 'react';
import {
  Redirect, Route, Switch, useLocation,
} from 'react-router-dom';
import { Container, Row } from 'reactstrap';
import DefaultFooter from '../components/Footers/DefaultFooter';
import routes from '../routes';

const AuthLayout = () => {
  const mainContent = useRef(null);
  const location = useLocation();

  useEffect(() => {
    document.body.classList.add('bg-default');
    return () => {
      document.body.classList.remove('bg-default');
    };
  }, []);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = () => routes.map((prop) => {
    if (prop.layout === '/auth') {
      return (
        <Route
          path={prop.layout + prop.path}
          component={prop.component}
          key={prop.path}
        />
      );
    }
    return null;
  });

  return (
    <div className="min-vh-100 d-flex flex-column">
      <div className="main-content flex-fill" ref={mainContent}>
        <div className="header py-7 py-lg-8" />
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Switch>
              {getRoutes(routes)}
              <Redirect from="*" to="/auth/login" />
            </Switch>
          </Row>
        </Container>
      </div>
      <DefaultFooter />
    </div>
  );
};

export default AuthLayout;
