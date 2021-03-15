import React from "react";
// nodejs library that concatenates classes
import classnames from "classnames";
// reactstrap components
import { NavItem, NavLink, Nav, Col } from "reactstrap";

class Index extends React.Component {
  state = {
    circledNavPills: 1
  };
  toggleNavs = (e, state, index) => {
    e.preventDefault();
    this.setState({
      [state]: index
    });
  };
  render() {
    return (
      <>
        <Col lg="5">
          <h3 className="h4 text-success font-weight-bold mb-5">
            Navigation Pills
          </h3>
          <Nav className="nav-pills-circle" id="tabs_2" pills role="tablist">
            <NavItem>
              <NavLink
                aria-selected={this.state.circledNavPills === 1}
                className={classnames("rounded-circle", {
                  active: this.state.circledNavPills === 1
                })}
                onClick={e => this.toggleNavs(e, "circledNavPills", 1)}
                href="#pablo"
                role="tab"
              >
                <span className="nav-link-icon d-block">
                  <i className="ni ni-atom" />
                </span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                aria-selected={this.state.circledNavPills === 2}
                className={classnames("rounded-circle", {
                  active: this.state.circledNavPills === 2
                })}
                onClick={e => this.toggleNavs(e, "circledNavPills", 2)}
                href="#pablo"
                role="tab"
              >
                <span className="nav-link-icon d-block">
                  <i className="ni ni-chat-round" />
                </span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                aria-selected={this.state.circledNavPills === 3}
                className={classnames("rounded-circle", {
                  active: this.state.circledNavPills === 3
                })}
                onClick={e => this.toggleNavs(e, "circledNavPills", 3)}
                href="#pablo"
                role="tab"
              >
                <span className="nav-link-icon d-block">
                  <i className="ni ni-cloud-download-95" />
                </span>
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
      </>
    );
  }
}

export default Index;
