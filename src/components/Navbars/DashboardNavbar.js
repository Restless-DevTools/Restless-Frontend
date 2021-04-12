import React from 'react';
import {
  Container, DropdownItem, DropdownMenu,
  DropdownToggle,

  Media, Nav, Navbar, NavbarBrand, NavItem, NavLink, UncontrolledDropdown,
} from 'reactstrap';
import useAuth from '../../contexts/AuthenticationContext';
import Logo from '../Logo/Logo';

const DashboardNavbar = (props) => {
  const { logout } = useAuth();

  return (
    <Navbar className="navbar-top navbar-dark bg-dracula-primary">
      <Container fluid>
        <Nav className="col">
          <NavItem className="h4 text-uppercase d-inline-block mr-3">
            <NavLink
              href="/dashboard/collections"
              className="text-primary"
            >
              Collections
            </NavLink>
          </NavItem>
          <NavItem className="h4 text-uppercase d-inline-block mr-3">
            <NavLink
              href="/dashboard/requests"
              className="text-primary"
            >
              Requests
            </NavLink>
          </NavItem>
          <NavItem className="h4 text-uppercase d-inline-block mr-3">
            <NavLink
              href="/dashboard/snippets"
              className="text-primary"
            >
              Snippets
            </NavLink>
          </NavItem>
          <NavItem className="h4 text-uppercase d-inline-block mr-3">
            <NavLink
              href="/dashboard/teams"
              className="text-primary"
            >
              Teams
            </NavLink>
          </NavItem>
        </Nav>
        <NavbarBrand className="col d-none d-sm-flex m-auto justify-content-center" href="/dashboard">
          <Logo width="200" />
        </NavbarBrand>
        <Nav className="col align-items-end d-none d-flex" navbar>
          <UncontrolledDropdown nav>
            <DropdownToggle className="pr-0" nav>
              <Media className="align-items-center">
                <div className="icon icon-shape bg-primary text-white rounded-circle shadow">
                  <i className="fas fa-user" />
                </div>
                <Media className="ml-2 d-none d-lg-block">
                  <span className="mb-0 text-sm font-weight-bold">
                    User
                  </span>
                </Media>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem onClick={() => { logout(); props.history.push('/auth/login'); }}>
                <i className="fa fa-sign-out-alt" />
                <span>Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default DashboardNavbar;
