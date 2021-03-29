import React from 'react';
import { Container, Row } from 'reactstrap';

const DefaultHeader = ({ children }) => (
  <div className="header bg-dracula-secondary py-3">
    <Container fluid>
      <Row className="align-items-center">
        {children}
      </Row>
    </Container>
  </div>
);

export default DefaultHeader;
