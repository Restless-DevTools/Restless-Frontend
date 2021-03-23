import React from 'react';
import {
  Card, Col, Container, Row,
} from 'reactstrap';
import SnippetForm from './SnippetForm';
import './styles.css';

function Snippets() {
  return (
    <Container fluid>
      <Row>
        <Col className="mb-5 mb-xl-0">
          <Card className="shadow">
            <SnippetForm />
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Snippets;
