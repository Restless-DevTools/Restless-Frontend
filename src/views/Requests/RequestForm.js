import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import {
  Button, Col, FormGroup, Input, Label, Row, Form,
} from 'reactstrap';
import useGlobal from '../../contexts/GlobalContext';
import './styles.css';

const RequestForm = (props) => {
  const {
    toggleModal, collection, requests, getGroups, requestSelected, edit,
  } = props;
  const { openSuccessNotification, openErrorNotification } = useGlobal();

  const [method, setMethod] = useState(requestSelected.method || 'GET');
  const [format, setFormat] = useState(requestSelected.format || 'JSON');
  const [group, setGroup] = useState();

  const [name, setName] = useState(requestSelected.name || '');
  const [link, setLink] = useState(requestSelected.link || '');

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
        if (requestSelected && requestSelected.groupId) {
          const groupSelected = groupsMapped
            .find((groupMp) => groupMp.value === requestSelected.groupId);
          setGroup(groupSelected.value);
        }
      }
    }
  };

  useEffect(() => {
    getGroupsWithOutRequests();
  }, [collection]);

  const printSuccessMessage = () => {
    if (!edit) {
      return openSuccessNotification('Request created Successfully', 'Request');
    }

    return openSuccessNotification('Request updated Successfully', 'Request');
  };

  const handleSubmit = async () => {
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
      link,
    };

    const request = edit
      ? requests.editRequest(requestSelected.id, sendObject)
      : requests.createRequest(sendObject);

    const { data } = await request;

    if (data.id) {
      printSuccessMessage();
      getGroups();
      toggleModal();
    } else {
      openErrorNotification('Something went wrong', 'Request');
    }
  };

  return (
    <Form className="form-page" onSubmit={handleSubmit}>
      <Row>
        <Col>
          <FormGroup>
            <Label for="name">Link:</Label>
            <Input
              id="name"
              placeholder="https://restlessdevtools.com"
              type="text"
              onChange={(e) => setLink(e.target.value)}
              required
              defaultValue={link}
            />
          </FormGroup>
        </Col>
      </Row>
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
              defaultValue={name}
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
              defaultValue={methods
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
              value={groups
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
              type="submit"
            >
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
};

export default RequestForm;
