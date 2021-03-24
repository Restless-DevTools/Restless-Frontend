import React from 'react';
import {
  Button,
  Col, Container, Row,
} from 'reactstrap';
import './styles.css';

const SnippetsHeader = (props) => (
  <>
    <div className="header bg-default py-3">
      <Container fluid>
        <Row className="align-items-center">
          <Col className="mb-xl-0">
            <Button
              onClick={() => props.setFormModal(!props.formModal)}
              color="primary"
              type="button"
            >
              New Snippet
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  </>
);

export default SnippetsHeader;
