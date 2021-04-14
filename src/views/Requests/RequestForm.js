import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import {
  Button, Col, FormGroup, Input, Label, Row,
} from 'reactstrap';
import useGlobal from '../../contexts/GlobalContext';
import './styles.css';

const RequestForm = (props) => {
  const {
    toggleModal, collection, requests, getGroups,
  } = props;
  const { openSuccessNotification, openErrorNotification } = useGlobal();

  const [method, setMethod] = useState({ value: 'GET', label: 'GET' });
  const [format, setFormat] = useState({ value: 'JSON', label: 'JSON' });
  const [group, setGroup] = useState();

  const [name, setName] = useState('');

  const [methods] = useState([
    { label: 'GET', value: 'GET' },
    { label: 'POST', value: 'POST' },
    { label: 'PUT', value: 'PUT' },
    { label: 'DELETE', value: 'DELETE' },
  ]);

  const [formats] = useState([
    { label: 'JSON', value: 'JSON' },
    { label: 'NO BODY', value: 'NO BODY' },
  ]);

  const [groups, setGroups] = useState([]);

  const getGroupsWithOutRequests = async () => {
    if (collection) {
      const { data } = await requests.getAllGroups({ collectionId: collection.id });
      if (data) {
        const groupsMapped = data.map((g) => ({ value: g.id, label: g.name, info: { ...g } }));
        setGroups(groupsMapped);
      }
    }
  };

  useEffect(() => {
    getGroupsWithOutRequests();
  }, [collection]);

  const handleSubmit = async () => {
    console.log(method);
    if (!group) {
      openErrorNotification('Group not selected', 'Group');
      return;
    }

    if (!method) {
      openErrorNotification('Method not selected', 'Method');
      return;
    }

    if (!format) {
      openErrorNotification('Format not selected', 'Format');
      return;
    }
    const sendObject = {
      method,
      name,
      format,
      groupId: group,
    };

    const { data } = await requests.createRequest(sendObject);

    if (data.id) {
      openSuccessNotification('Request created Successfully', 'Request');
      getGroups();
      toggleModal();
    } else {
      openErrorNotification('Something went wrong', 'Request');
    }
  };

  return (
    <div className="form-page">
      <Row>
        <Col>
          <FormGroup>
            <Label for="name">Name:</Label>
            <Input
              id="name"
              placeholder="Select a name for your request"
              type="text"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup>
            <Label for="method">Method:</Label>
            <Select
              options={methods}
              onChange={(evt) => setMethod(evt.value)}
              placeholder="Select a Method"
              value={methods
                .find((opt) => opt.value === method)}
              name="method"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup>
            <Label for="format">Format:</Label>
            <Select
              options={formats}
              onChange={(evt) => setFormat(evt.value)}
              placeholder="Select Format"
              defaultValue={formats
                .find((opt) => opt.value === format)}
              name="format"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup>
            <Label for="group">Group:</Label>
            <Select
              options={groups}
              onChange={(evt) => setGroup(evt.value)}
              placeholder="Select Group"
              defaultValue={groups
                .find((opt) => opt.value === group)}
              name="group"
            />
          </FormGroup>
        </Col>
      </Row>

      <div className="action-pane">
        <Row>
          <Col>
            <Button
              color="success"
              type="button"
              onClick={() => handleSubmit()}
            >
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
