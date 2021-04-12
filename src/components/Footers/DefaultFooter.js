import React from 'react';
import { Col, Container, Row } from 'reactstrap';

const DashboardFooter = () => (
  <footer className="py-5">
    <Container fluid>
      <Row className="align-items-center justify-content-xl-between">
        <Col xl="12">
          <div className="copyright text-center text-xl-right text-muted">
            ©
            {' '}
            {new Date().getFullYear()}
            {' '}
            <a
              className="font-weight-bold ml-1"
              href="https://github.com/Restless-DevTools"
              rel="noopener noreferrer"
              target="_blank"
            >
              Restless DevTools
            </a>
          </div>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default DashboardFooter;
