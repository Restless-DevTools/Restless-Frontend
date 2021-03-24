import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container, DropdownItem, DropdownMenu,
  DropdownToggle,

  Media, Nav, Navbar, NavbarBrand, UncontrolledDropdown,
} from 'reactstrap';
import Logo from '../Logo/Logo';

const DashboardNavbar = () => (
  <>
    <Navbar className="navbar-top navbar-dark bg-primary">
      <Container fluid>

        <Link
          className="h4 mb-0 text-white text-uppercase d-inline-block mr-3"
          to="/dashboard/index"
        >
          Requests
        </Link>
        <Link
          className="h4 mb-0 text-white text-uppercase d-inline-block"
          to="/dashboard/snippets"
        >
          Snippets
        </Link>
        <NavbarBrand className="d-none d-sm-flex m-auto" href="/dashboard">
          <Logo width="200" />
        </NavbarBrand>
        <Nav className="align-items-center d-none d-flex" navbar>
          <UncontrolledDropdown nav>
            <DropdownToggle className="pr-0" nav>
              <Media className="align-items-center">
                <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
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
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">Welcome!</h6>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="fas fa-user" />
                <span>My profile</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-settings-gear-65" />
                <span>Settings</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-calendar-grid-58" />
                <span>Activity</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-support-16" />
                <span>Support</span>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="/auth/login">
                <i className="ni ni-user-run" />
                <span>Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Container>
    </Navbar>
  </>
);

export default DashboardNavbar;
