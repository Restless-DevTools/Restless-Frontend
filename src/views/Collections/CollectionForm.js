import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import {
  Button, Col, Form, FormGroup, Input, Label, Row,
} from 'reactstrap';
import useApp from '../../contexts/ApplicationContext';
import useGlobal from '../../contexts/GlobalContext';

const CollectionForm = (props) => {
  const {
    toggleModal, loadData, edit, collection,
  } = props;
  const { openSuccessNotification, openErrorNotification, openInfoNotification } = useGlobal();
  const { requests } = useApp();

  const [sharedPermissionsOptions] = useState([
    { label: 'Can only see and execute', value: 'READ' },
    { label: 'Can see and edit', value: 'WRITE' },
    { label: 'Can see, edit and delete', value: 'DELETE' },
  ]);

  const [shareOptions] = useState([
    { label: 'Private', value: 'PRIVATE' },
    { label: 'Public', value: 'PUBLIC' },
    { label: 'Team', value: 'TEAM' },
  ]);

  const [collectionName, setCollectionName] = useState(
    collection && collection.name
      ? collection.name : '',
  );
  const [collectionDescription, setCollectionDescription] = useState(
    collection && collection.description ? collection.description : '',
  );
  const [shareOption, setShareOption] = useState(
    collection && collection.shareOption
      ? shareOptions.find((o) => o.value === collection.shareOption)
      : null,
  );
  const [sharedPermissions, setSharedPermissions] = useState(
    collection && collection.sharedPermissions
      ? sharedPermissionsOptions.filter((o) => o.value === collection.sharedPermissions)
      : null,
  );

  const [team, setTeam] = useState(null);
  const [teams, setTeams] = useState([]);

  const handleDefaultTeam = () => {
    if (collection && collection.teamId) {
      setTeam(teams.find((t) => t.id === collection.teamId));
    }
  };

  const printSuccessMessage = () => {
    if (!edit) {
      return openSuccessNotification('Collection created successfully', 'Collection');
    }

    return openSuccessNotification('Collection updated successfully', 'Collection');
  };

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

  const submitCollection = async (collectionData) => {
    try {
      const request = !edit
        ? requests.createCollection(collectionData)
        : requests.editCollection(collection.id, collectionData);

      const { data } = await request;

      if (!data.status && !data.id) {
        return { isValid: false, message: data.message };
      }

      return { isValid: true, collection: data };
    } catch (error) {
      return { isValid: false, message: error.response.data.message };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!shareOption) {
      openInfoNotification('The share option field must be filled', 'Collection');
      return;
    }

    if (!sharedPermissions && shareOption.value !== 'PRIVATE') {
      openInfoNotification('The shared permissions field must be filled', 'Collection');
      return;
    }

    if (shareOption && shareOption.value === 'TEAM') {
      if (!team) {
        openInfoNotification('The team field must be filled', 'Collection');
        return;
      }
    }

    const sendObject = {
      name: collectionName,
      description: collectionDescription,
      shareOption: shareOption.value,
      sharedPermissions: shareOption.value === 'PRIVATE'
        ? 'DELETE'
        : sharedPermissions.value,
      teamId: team ? team.id : null,
    };

    const collectionInfo = await submitCollection(sendObject);

    if (collectionInfo.isValid) {
      loadData();
      toggleModal();
      printSuccessMessage();
    } else {
      openErrorNotification('Something went wrong', 'Collection');
    }
  };

  useEffect(() => {
    getAllTeams();
  }, []);

  useEffect(() => {
    if (teams && teams.length) {
      handleDefaultTeam();
    }
  }, [teams]);

  useEffect(() => {
    if (shareOption && shareOption !== 'TEAM') {
      setTeam(null);
    }
  }, [shareOption]);

  const checkSharedPermissions = () => {
    if (!shareOption) {
      return false;
    }

    if (shareOption.value === 'PUBLIC' || shareOption.value === 'TEAM') {
      return true;
    }

    return false;
  };

  return (
    <Form className="form-page" onSubmit={handleSubmit}>
      <Row>
        <Col>
          <FormGroup>
            <Label for="collection-name">Name:</Label>
            <Input
              id="collection-name"
              placeholder="Write a name for your collection"
              onChange={(e) => { setCollectionName(e.target.value); }}
              defaultValue={collectionName}
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
              defaultValue={collectionDescription}
              type="text"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup>
            <Label for="shareOption">Share Option:</Label>
            <Select
              options={shareOptions}
              getOptionLabel={(perm) => perm.label}
              getOptionValue={(perm) => perm.value}
              onChange={(value) => setShareOption(value)}
              placeholder="Select the share option"
              defaultValue={shareOption}
              value={shareOption}
              name="shareOption"
              isClearable
            />
          </FormGroup>
        </Col>
      </Row>
      {(shareOption && shareOption.value === 'TEAM') && (
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

      {checkSharedPermissions() && (
        <Row>
          <Col>
            <FormGroup>
              <Label for="sharedPermissions">Shared Permissions:</Label>
              <Select
                options={sharedPermissionsOptions}
                getOptionLabel={(value) => value.label}
                getOptionValue={(value) => value.value}
                onChange={(value) => setSharedPermissions(value)}
                placeholder="Select the shared permissions"
                defaultValue={shareOption}
                value={sharedPermissions}
                name="sharedPermissions"
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
