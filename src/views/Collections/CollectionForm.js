import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import {
  Button, Col, Form, FormGroup, Input, Label, Row,
} from 'reactstrap';
import useApp from '../../contexts/ApplicationContext';
import useGlobal from '../../contexts/GlobalContext';

const CollectionForm = (props) => {
  const { toggleModal, loadData } = props;
  const { openSuccessNotification, openErrorNotification, openInfoNotification } = useGlobal();
  const { requests } = useApp();

  const [permission, setPermission] = useState(null);
  const [collectionName, setCollectionName] = useState('');
  const [collectionDescription, setCollectionDescription] = useState('');
  const [teams, setTeams] = useState([]);
  const [team, setTeam] = useState(null);

  const [permissions] = useState([
    { label: 'Private', value: 'PRIVATE' },
    { label: 'Public', value: 'PUBLIC' },
    { label: 'Team', value: 'TEAM' },
  ]);

  const getAllTeams = async () => {
    try {
      const { data } = await requests.getAllTeams();

      if (data.length) {
        setTeams(data);
      }
    } catch (error) {
      openErrorNotification('Can not fetch the records in backend.', 'Teams');
    }
  };

  const createCollection = async (userData) => {
    try {
      const { data } = await requests.createCollection(userData);

      if (!data.status && !data.id) {
        return { isValid: false, message: data.message };
      }

      return { isValid: true, collection: data };
    } catch (error) {
      return { isValid: false, message: error.response.data.message };
    }
  };

  const handleSaveCollection = async (e) => {
    e.preventDefault();

    if (!permission) {
      openInfoNotification('The permission field must be filled', 'Collection');
      return;
    }

    if (permission && permission.value === 'TEAM') {
      if (!team) {
        openInfoNotification('The permission field must be filled', 'Collection');
        return;
      }
    }

    const sendObject = {
      name: collectionName,
      description: collectionDescription,
      permissionType: permission.value,
    };

    if (team) {
      sendObject.teamId = team.id;
    }

    const collectionInfo = await createCollection(sendObject);

    if (collectionInfo.isValid) {
      openSuccessNotification('Collection successfully created', 'Collection');
      toggleModal();
      loadData(collectionInfo.collection);
    } else {
      openErrorNotification(collectionInfo.message, 'Collection');
    }
  };

  useEffect(() => {
    getAllTeams();
  }, []);

  return (
    <Form className="form-page" onSubmit={handleSaveCollection}>
      <Row>
        <Col>
          <FormGroup>
            <Label for="collection-name">Name:</Label>
            <Input
              id="collection-name"
              placeholder="Write a name for your collection"
              onChange={(e) => { setCollectionName(e.target.value); }}
              type="text"
              required
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup>
            <Label for="collection-description">Description:</Label>
            <Input
              id="collection-description"
              placeholder="Write a description for this collection"
              onChange={(e) => { setCollectionDescription(e.target.value); }}
              type="text"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup>
            <Label for="permission">Permission:</Label>
            <Select
              options={permissions}
              getOptionLabel={(perm) => perm.label}
              getOptionValue={(perm) => perm.value}
              onChange={(value) => setPermission(value)}
              placeholder="Select the permission type"
              defaultValue={permission}
              value={permission}
              name="permission"
              isClearable
            />
          </FormGroup>
        </Col>
      </Row>
      {(permission && permission.value === 'TEAM') && (
        <Row>
          <Col>
            <FormGroup>
              <Label for="team">Teams:</Label>
              <Select
                options={teams}
                getOptionLabel={(value) => value.name}
                getOptionValue={(value) => value.id}
                onChange={(value) => setTeam(value)}
                placeholder="Select the team"
                defaultValue={team}
                value={team}
                name="team"
                isClearable
              />
            </FormGroup>
          </Col>
        </Row>
      )}

      <footer className="action-pane">
        <Row>
          <Col>
            <Button color="success" type="submit">
              Save
            </Button>
            <Button onClick={toggleModal} color="danger" type="button">
              Discard
            </Button>
          </Col>
        </Row>
      </footer>
    </Form>
  );
};

export default CollectionForm;
