/*eslint-disable*/
import React from "react";
// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

class SimpleFooter extends React.Component {
  render() {
    return (
      <>
        <footer className="footer">
          <Container>
            <div className="copyright text-right">
              © {new Date().getFullYear()}{" "}
              <a
                href="https://github.com/Restless-DevTools"
                target="_blank"
              >
                Restless DevTools
                  </a>
                  .
            </div>
          </Container>
        </footer>
      </>
    );
  }
}

export default SimpleFooter;
