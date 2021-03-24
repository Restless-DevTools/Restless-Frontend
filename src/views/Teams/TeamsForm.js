import React from 'react';
import {
  FormGroup, Row, Col, Input, Label, Button,
} from 'reactstrap';
import Select from 'react-select';

function TeamsForm() {
  const userOptions = [{ value: 'francisco', label: '@Francisco' }, { value: 'mateus', label: '@Mateus' }];

  return (
    <>
      <Row>
        <Col md="6">
          <FormGroup>
            <Label for="name">Name:</Label>
            <Input
              id="name"
              placeholder="Select a criative name for your team"
              type="text"
            />
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup>
            <Label for="description">Description:</Label>
            <Input
              id="description"
              placeholder="Write a good description for your team, remember they are awesome!"
              type="text"
            />
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup>
            <Label for="integrants">Integrants:</Label>
            <Select
              options={userOptions}
              placeholder="Select Integrants"
              name="integrants"
              isMulti
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
    </>
  );
}

export default TeamsForm;
