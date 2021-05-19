import React from 'react';
import {
  Button, Col, FormGroup, Input, Row,
} from 'reactstrap';

const DefaultDynamicForm = (props) => {
  const { inputs, setInputs, inputIdentifier } = props;

  const handleAddInputGroup = () => {
    setInputs([
      ...inputs,
      { id: inputs.length, name: '', value: '' },
    ]);
  };

  const handleRemoveInputGroup = (id) => {
    const updatedHeaderInputs = inputs.filter((input) => input.id !== id);
    setInputs(updatedHeaderInputs);
  };

  const handleInputChange = (event, id) => {
    const updatedHeaderInputs = inputs.map((input) => {
      if (input.id === id) {
        const valueToUpdate = event.target.value;
        const fieldToUpdate = event.target.name.includes('Name') ? 'name' : 'value';

        return {
          ...input,
          [fieldToUpdate]: valueToUpdate,
        };
      }

      return input;
    });

    setInputs(updatedHeaderInputs);
  };

  return (
    inputs.map((input) => (
      <Row key={`input${inputIdentifier}${input.id}`} className="align-items-center">
        <Col xs="5" md="5">
          <FormGroup>
            <Input
              id={`input${inputIdentifier}Name${input.id}`}
              name={`input${inputIdentifier}Name${input.id}`}
              placeholder="Name"
              type="text"
              defaultValue={input.name}
              onChange={(e) => { handleInputChange(e, input.id); }}
            />
          </FormGroup>
        </Col>
        <Col xs="5" md="5">
          <FormGroup>
            <Input
              id={`input${inputIdentifier}Value${input.id}`}
              name={`input${inputIdentifier}Value${input.id}`}
              placeholder="Value"
              type="text"
              defaultValue={input.value}
              onChange={(e) => { handleInputChange(e, input.id); }}
            />
          </FormGroup>
        </Col>
        <Col xs="1" md="1" className="min-width-460-md">
          <FormGroup>
            <Button
              onClick={() => {
                handleAddInputGroup();
              }}
              className="btn-icon"
              color="success"
              type="button"
              size="sm"
            >
              <span><i className="fa fa-plus" /></span>
            </Button>
          </FormGroup>
        </Col>
        {(input.id !== 0) && (
          <Col xs="1" md="1">
            <FormGroup>
              <Button
                onClick={() => {
                  handleRemoveInputGroup(input.id);
                }}
                className="btn-icon"
                color="danger"
                type="button"
                size="sm"
              >
                <span><i className="fa fa-trash" /></span>
              </Button>
            </FormGroup>
          </Col>
        )}
      </Row>
    ))
  );
};

export default DefaultDynamicForm;
