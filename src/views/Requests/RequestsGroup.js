import React, { useState } from 'react';
import {
  Badge,
  Button,
  Card,
  CardBody,

  CardHeader,

  Col,
  Collapse,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,

  Row,
} from 'reactstrap';
import DefaultModal from '../../components/DefaultModal/DefaultModal';
import GroupForm from './GroupForm';
import RequestForm from './RequestForm';
import './styles.css';

const RequestsGroup = () => {
  const [formModal, setFormModal] = useState(false);
  const [requestModal, setRequestModal] = useState(false);
  const [requestModalTitle, setRequestModalTitle] = useState('');

  const [group, setGroup] = useState(1);

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
    }]);

  const toggleGroup = (id) => {
    if (id === group) {
      setGroup('');
    } else {
      setGroup(id);
    }
  };

  const renderRequestGroup = (requestGroup) => (
    <div key={requestGroup.id}>
      <Row className="m-0 align-items-center">
        <Col md="12" className="text-center px-0">
          <Button
            block
            onClick={() => { toggleGroup(requestGroup.id); }}
            className="btn-icon mb-1 text-left"
            color="primary"
            type="button"
          >
            <span>
              <i className={group === requestGroup.id ? 'fa fa-arrow-down' : 'fa fa-arrow-right'} />
            </span>
            <span className="btn-inner--text">{requestGroup.name}</span>
            <Badge color="dark">{requestGroup.requests.length}</Badge>
          </Button>
        </Col>
      </Row>
      {requestGroup.requests && (
      <Collapse isOpen={group === requestGroup.id}>
        {requestGroup.requests.map((request) => (
          <Card key={request.id} className="mb-1">
            <CardBody className="p-2">
              <Row className="align-items-center">
                <Col>
                  <h3>{request.name}</h3>
                </Col>
                <Col className="text-right">
                  <Button
                    onClick={() => {
                      setRequestModalTitle('Request');
                      setRequestModal(!requestModal);
                    }}
                    className="btn-icon"
                    color="primary"
                    type="button"
                  >
                    <span>
                      <i className="fa fa-edit" />
                    </span>
                  </Button>
                  <Button className="btn-icon" color="danger" type="button">
                    <span>
                      <i className="fa fa-trash" />
                    </span>
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        ))}
      </Collapse>
      )}
    </div>
  );

  return (
    <>
      <Col xl="4">
        <Card className="shadow">
          <CardHeader className="border-0 bg-default">
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
            {groups && (
              groups.map((requestGroup) => renderRequestGroup(requestGroup))
            )}
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
