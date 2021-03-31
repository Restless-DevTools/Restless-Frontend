import React, { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,

  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from 'reactstrap';
import DefaultCardList from '../../components/DefaultCardList/DefaultCardList';
import DefaultCollapse from '../../components/DefaultCollapse/DefaultCollapse';
import DefaultModal from '../../components/DefaultModal/DefaultModal';
import GroupForm from './GroupForm';
import RequestForm from './RequestForm';
import './styles.css';

const RequestsGroup = () => {
  const [formModal, setFormModal] = useState(false);
  const [requestModal, setRequestModal] = useState(false);
  const [requestModalTitle, setRequestModalTitle] = useState('');

  const [selectedGroup, setSelectedGroup] = useState(1);

  const [groups] = useState([
    {
      id: 1,
      name: 'Users',
      requests: [
        { id: 1, name: 'Get All' },
        { id: 2, name: 'Create' },
        { id: 3, name: 'Update' },
        { id: 4, name: 'Delete' },
      ],
    }, {
      id: 2,
      name: 'Teams',
      requests: [
        { id: 5, name: 'Get All' },
        { id: 6, name: 'Create' },
        { id: 7, name: 'Update' },
        { id: 8, name: 'Delete' },
      ],
    }, {
      id: 3,
      name: 'Requests',
      requests: [
        { id: 9, name: 'Get All' },
        { id: 10, name: 'Create' },
        { id: 11, name: 'Update' },
        { id: 12, name: 'Delete' },
      ],
    },
  ]);

  const toggleGroup = (id) => {
    if (id === selectedGroup) {
      setSelectedGroup('');
    } else {
      setSelectedGroup(id);
    }
  };

  const handleEdit = () => {
    setRequestModalTitle('Request');
    setRequestModal(!requestModal);
  };

  const handleDelete = () => {
    // TODO
  };

  return (
    <>
      <Col xl="4">
        <h2 className="text-secondary">Groups</h2>
        <Card className="shadow">
          <CardHeader className="border-0 bg-dracula-secondary">
            <Row className="align-items-center">
              <Col className="align-items-center">
                <FormGroup className="navbar-search navbar-search-dark mb-0">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fa fa-search" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input className="w-50" placeholder="Search" type="text" />
                  </InputGroup>
                </FormGroup>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Row className="mb-3">
              <Col>
                <Button
                  block
                  onClick={() => {
                    setRequestModalTitle('New request');
                    setRequestModal(!requestModal);
                  }}
                  className="btn-icon"
                  color="primary"
                  type="button"
                >
                  <span>
                    <i className="fa fa-send" />
                  </span>
                  <span className="btn-inner--text">New request</span>
                </Button>
              </Col>
              <Col>
                <Button
                  onClick={() => setFormModal(!formModal)}
                  className="btn-icon"
                  color="success"
                  type="button"
                  block
                >
                  <span>
                    <i className="fa fa-layer-group" />
                  </span>
                  <span className="btn-inner--text">New group</span>
                </Button>
              </Col>
            </Row>
            {groups && groups.map((group) => (
              <DefaultCollapse
                key={group.id}
                group={group}
                selectedGroup={selectedGroup}
                toggleGroup={toggleGroup}
                badgeCount={group.requests.length}
              >
                <DefaultCardList
                  list={group.requests}
                  setRequestModal={setRequestModal}
                  setRequestModalTitle={setRequestModalTitle}
                  requestModal={requestModal}
                  edit={handleEdit}
                  remove={handleDelete}
                />
              </DefaultCollapse>
            ))}
          </CardBody>
        </Card>
      </Col>
      <DefaultModal
        isOpen={formModal}
        title="New request group"
        className="default-modal"
        toggleModal={setFormModal}
      >
        <GroupForm />
      </DefaultModal>
      <DefaultModal
        isOpen={requestModal}
        title={requestModalTitle}
        className="default-modal"
        toggleModal={setRequestModal}
      >
        <RequestForm />
      </DefaultModal>
      <DefaultModal
        isOpen={requestModal}
        title={requestModalTitle}
        className="default-modal"
        toggleModal={setRequestModal}
      >
        <RequestForm />
      </DefaultModal>
    </>
  );
};

export default RequestsGroup;
