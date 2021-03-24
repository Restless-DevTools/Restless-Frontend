import React from 'react';
import {
  Button, Col, FormGroup, Input, Label, Row,
} from 'reactstrap';
import './styles.css';

const GroupForm = () => (
  <div className="form-page">
    <Row>
      <Col md="6">
        <FormGroup>
          <Label for="name">Name:</Label>
          <Input
            id="name"
            placeholder="Select a name for your group"
            type="text"
          />
        </FormGroup>
      </Col>
    </Row>

    <div className="action-pane">
      <Row>
        <Col md="6">
          <Button color="success" type="button">
            Save
          </Button>
          <Button color="danger" type="button">
            Discard
          </Button>
        </Col>
      </Row>
    </div>

  </div>
);

export default GroupForm;
