import React, { useState } from 'react';
import Select from 'react-select';
import {
  Button, Col, FormGroup, Input, Label, Row,
} from 'reactstrap';
import './styles.css';

const RequestForm = (props) => {
  const { toggleModal } = props;

  const [method, setMethod] = useState(1);
  const [format, setFormat] = useState(1);
  const [group, setGroup] = useState(1);

  const [methods] = useState([
    { label: 'GET', value: 1 },
    { label: 'POST', value: 2 },
    { label: 'UPDATE', value: 3 },
    { label: 'DELETE', value: 4 },
  ]);

  const [formats] = useState([
    { label: 'JSON', value: 1 },
    { label: 'NO BODY', value: 2 },
  ]);

  const [groups] = useState([
    { label: 'Users', value: 1 },
    { label: 'Teams', value: 2 },
    { label: 'Requests', value: 3 },
  ]);

  return (
    <div className="form-page">
      <Row>
        <Col md="6">
          <FormGroup>
            <Label for="name">Name:</Label>
            <Input
              id="name"
              placeholder="Select a name for your request"
              type="text"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <FormGroup>
            <Label for="method">Method:</Label>
            <Select
              options={methods}
              onChange={(evt) => setMethod(evt.value)}
              placeholder="Select Collection"
              value={methods
                .filter((opt) => opt.value === method)}
              name="method"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <FormGroup>
            <Label for="format">Format:</Label>
            <Select
              options={formats}
              onChange={(evt) => setFormat(evt.value)}
              placeholder="Select Format"
              value={formats
                .filter((opt) => opt.value === format)}
              name="format"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <FormGroup>
            <Label for="group">Group:</Label>
            <Select
              options={groups}
              onChange={(evt) => setGroup(evt.value)}
              placeholder="Select Group"
              value={groups
                .filter((opt) => opt.value === group)}
              name="group"
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
            <Button onClick={toggleModal} color="danger" type="button">
              Discard
            </Button>
          </Col>
        </Row>
      </div>

    </div>
  );
};

export default RequestForm;
