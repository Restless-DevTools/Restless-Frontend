import React, { useState } from 'react';
import {
  Button, Col, Form, FormGroup, Input, Label, Row,
} from 'reactstrap';
import useAppContext from '../../contexts/ApplicationContext';
import useGlobal from '../../contexts/GlobalContext';
import './styles.css';

const GroupForm = (props) => {
  const {
    toggleModal, collection, getGroups, groupSelected, edit,
  } = props;
  const { requests } = useAppContext();
  const { openSuccessNotification, openErrorNotification } = useGlobal();
  const [name, setName] = useState(groupSelected.name || '');

  const printSuccessMessage = () => {
    if (!edit) {
      return openSuccessNotification('Group created successfully', 'Group');
    }

    return openSuccessNotification('Group updated successfully', 'Group');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!collection) {
      openErrorNotification('First, select a collection', 'Group');
      return;
    }
    const sendObject = {
      name,
      collectionId: collection.id,
    };

    try {
      const request = edit
        ? requests.editGroup(groupSelected.id, sendObject)
        : requests.createGroup(sendObject);
      const { data } = await request;
      if (data.id) {
        toggleModal();
        getGroups();
        printSuccessMessage();
      } else {
        openErrorNotification('Something went wrong', 'Group');
      }
    } catch (error) {
      console.log(error);
      openErrorNotification('Something went wrong', 'Group');
    }
  };

  return (
    <Form className="form-page" onSubmit={handleSubmit}>
      <Row>
        <Col>
          <FormGroup>
            <Label for="name">Name:</Label>
            <Input
              id="name"
              defaultValue={name}
              placeholder="Select a name for your group"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>
        </Col>
      </Row>

      <div className="action-pane">
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
      </div>
    </Form>
  );
};

export default GroupForm;
