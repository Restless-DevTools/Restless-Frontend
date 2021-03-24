import React from 'react';
import {
  Container,
  Row,
} from 'reactstrap';
import RequestsHeader from './RequestsHeader';
import RequestsForm from './RequestsForm';
import RequestsGroup from './RequestsGroup';

const Requests = () => (
  <>
    <RequestsHeader />
    <Container fluid>
      <Row className="mt-5">
        <RequestsForm />
        <RequestsGroup />
      </Row>
    </Container>
  </>
);

export default Requests;
