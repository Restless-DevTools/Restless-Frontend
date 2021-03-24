/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Select from 'react-select';
import {
  Button, Col, FormGroup, Input, Label, Row,
} from 'reactstrap';
import './styles.css';

const CollectionForm = () => {
  const [visibility, setVisibility] = useState('private');
  const [permission, setPermission] = useState(1);

  const [permissions] = useState([
    { label: 'Can only see', value: 1 },
    { label: 'Can view and edit', value: 2 },
    { label: 'Can view, edit and create', value: 3 },
    { label: 'Can view, edit, create and delete', value: 4 },
  ]);

  const [visibilityOptions] = useState([
    { label: 'Private', value: 'private' },
    { label: 'Public', value: 'public' },
    { label: 'Shared', value: 'shared' },
  ]);

  return (
    <div className="form-page">
      <Row>
        <Col md="6">
          <FormGroup>
            <Label for="name">Name:</Label>
            <Input
              id="name"
              placeholder="Select a name for your collection"
              type="text"
            />
          </FormGroup>
        </Col>
        <Col md="6">
          {visibilityOptions && (
            <>
              <Label>Visibility:</Label>
              <Row>
                {visibilityOptions.map((option) => (
                  <Col key={option.value}>
                    <FormGroup className="custom-control custom-control-alternative custom-radio mb-3">
                      <Input
                        id={option.value}
                        type="radio"
                        name="custom-radio-1"
                        className="custom-control-input"
                        defaultChecked={visibility === option.value}
                        defaultValue={visibility}
                        onClick={(evt) => { setVisibility(evt.target.id); }}
                      />
                      <Label className="custom-control-label" for={option.value}>{option.label}</Label>
                    </FormGroup>
                  </Col>
                ))}
              </Row>
            </>
          )}
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <FormGroup>
            <Label for="description">Description:</Label>
            <Input
              id="description"
              placeholder="Write a description for your colleagues understand what you wrote!"
              type="text"
            />
          </FormGroup>
        </Col>
        <Col md="6">
          {visibility !== 'private' && (
            <FormGroup>
              <Label for="description">Link:</Label>
              <Input
                id="link"
                value="https://restless.dev/restless/1"
                type="text"
              />
            </FormGroup>
          )}
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <FormGroup>
            <Label for="share">Permissions:</Label>
            <Select
              options={permissions}
              onChange={(evt) => setPermission(evt.value)}
              placeholder="Share Snippet"
              value={permissions.filter((opt) => opt.value === permission)}
              name="share"
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
};

export default CollectionForm;
