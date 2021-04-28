import React, { useState, useEffect } from 'react';
import {
  FormGroup, Row, Col, Input, Label, Button, Form,
} from 'reactstrap';
import Select from 'react-select';

function TeamsForm(props) {
  const {
    toggleModal, requests, useGlobal, getTeams, teamSelected, edit,
  } = props;
  const { openSuccessNotification, openErrorNotification } = useGlobal();

  const [users, setUsers] = useState([]);

  const handleDefaultIntegrants = () => {
    if (teamSelected.integrants && teamSelected.integrants.length > 0) {
      return teamSelected.integrants
        .map((user) => ({ value: user.id, label: user.username, info: { ...user } }));
    }

    return [];
  };

  const [integrants, setIntegrants] = useState(handleDefaultIntegrants());

  const getUsers = async () => {
    const { data } = await requests.getAllUsers();
    setUsers(data.map((user) => ({ value: user.id, label: user.username, info: { ...user } })));
  };

  useEffect(() => {
    getUsers();
  }, []);

  const [name, setName] = useState(teamSelected.name || '');
  const [description, setDescription] = useState(teamSelected.description || '');

  const finishProccess = () => {
    toggleModal(false);
    getTeams();
    openSuccessNotification('Team created successfully', 'Teams');
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const sendObject = {
        name,
        integrants: integrants.map((integrant) => ({ userId: integrant.value })),
        description,
      };

      if (edit) {
        await requests.editTeam(teamSelected.id, sendObject);
        finishProccess();
      } else {
        const { data } = await requests.createTeam(sendObject);
        if (data.id) {
          finishProccess();
        }
      }
    } catch (error) {
      console.log(error);
      openErrorNotification('Something went wrong', 'Teams');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md="6">
          <FormGroup>
            <Label for="name">Name:</Label>
            <Input
              id="name"
              placeholder="Select a criative name for your team"
              onChange={(evt) => setName(evt.target.value)}
              defaultValue={name}
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
              defaultValue={description}
              onChange={(evt) => setDescription(evt.target.value)}
            />
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup>
            <Label for="integrants">Integrants:</Label>
            <Select
              options={users}
              placeholder="Select Integrants"
              name="integrants"
              isMulti
              onChange={(evt) => setIntegrants(evt)}
              value={users.filter((user) => integrants
                .some((integrant) => integrant.value === user.value))}
            />
          </FormGroup>
        </Col>
      </Row>

      <div className="action-pane">
        <Row>
          <Col md="6">
            <Button color="success" type="submit">
              Save
            </Button>
            <Button onClick={toggleModal} color="danger" type="button">
              Discard
            </Button>
          </Col>
        </Row>
      </div>
    </Form>
  );
}

export default TeamsForm;
