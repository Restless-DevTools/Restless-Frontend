import React, { useState } from 'react';
import {
  Button, Col, FormGroup, Input, Label, Row,
} from 'reactstrap';
import useAppContext from '../../contexts/ApplicationContext';
import useGlobal from '../../contexts/GlobalContext';
import './styles.css';

const GroupForm = (props) => {
  const { requests } = useAppContext();
  const { openSuccessNotification, openErrorNotification } = useGlobal();
  const { toggleModal, collection, getGroups } = props;
  const [name, setName] = useState('');

  const handleSubmit = async () => {
    if (!collection) {
      openErrorNotification('First, select a collection', 'Group');
      return;
    }
    const sendObject = {
      name,
      collectionId: collection.id,
    };

    try {
      const { data } = await requests.createGroup(sendObject);
      if (data.id) {
        toggleModal();
        getGroups();
        openSuccessNotification('Group created successfully', 'Group');
      } else {
        openErrorNotification('Something went wrong', 'Group');
      }
    } catch (error) {
      console.log(error);
      openErrorNotification('Something went wrong', 'Group');
    }
  };

  return (
    <div className="form-page">
      <Row>
        <Col md="6">
          <FormGroup>
            <Label for="name">Name:</Label>
            <Input
              id="name"
              placeholder="Select a name for your group"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>
        </Col>
      </Row>

      <div className="action-pane">
        <Row>
          <Col md="6">
            <Button color="success" type="button" onClick={() => handleSubmit()}>
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

export default GroupForm;
