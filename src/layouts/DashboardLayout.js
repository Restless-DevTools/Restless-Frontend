import React, { useEffect, useRef } from 'react';
import {
  Redirect, Route, Switch, useLocation,
} from 'react-router-dom';
import { Container } from 'reactstrap';
import DashboardFooter from '../components/Footers/DashboardFooter';
import DashboardNavbar from '../components/Navbars/DashboardNavbar';
import routes from '../routes';

const DashboardLayout = (props) => {
  const mainContent = useRef(null);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = () => routes.map((prop) => {
    if (prop.layout === '/dashboard') {
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

  const getBrandText = () => {
    for (let i = 0; i < routes.length; i += 1) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path)
        !== -1
      ) {
        return routes[i].name;
      }
    }
    return 'Brand';
  };

  return (
    <div className="main-content" ref={mainContent}>
      <DashboardNavbar
        {...props}
        brandText={getBrandText(props.location.pathname)}
      />
      <Switch>
        {getRoutes(routes)}
        <Redirect from="*" to="/dashboard/requests" />
      </Switch>
      <Container fluid>
        <DashboardFooter />
      </Container>
    </div>
  );
};

export default DashboardLayout;
