import React, { useState, useEffect } from 'react';
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
import DefaultCollapse from '../../components/DefaultCollapse/GroupCollapse';
import DefaultModal from '../../components/DefaultModal/DefaultModal';
import GroupForm from './GroupForm';
import RequestForm from './RequestForm';
import './styles.css';

const RequestsGroup = (props) => {
  const {
    collection, requests, openSuccessNotification, openErrorNotification,
  } = props;
  const [groupModal, setGroupModal] = useState(false);
  const [requestModal, setRequestModal] = useState(false);
  const [requestModalTitle, setRequestModalTitle] = useState('');
  const [edit, setEdit] = useState(false);

  const [selectedGroup, setSelectedGroup] = useState(1);
  const [requestSelected, setRequestSelected] = useState({});

  const [groups, setGroups] = useState([]);

  const getGroups = async () => {
    try {
      if (collection) {
        const { data } = await requests.getGroupsByCollection({ collectionId: collection.id });
        if (data) {
          setGroups(data);
        }
      }
    } catch (error) {
      setGroups([]);
    }
  };

  useEffect(() => {
    getGroups();
  }, [collection]);

  const toggleGroup = (id) => {
    if (id === selectedGroup) {
      setSelectedGroup('');
    } else {
      setSelectedGroup(id);
    }
  };

  const toggleRequestModal = (shouldEdit) => {
    setRequestModalTitle(shouldEdit ? 'Request' : 'New Request');
    setRequestModal(!requestModal);
  };

  const createRequest = () => {
    toggleRequestModal();
    setEdit(false);
    setRequestSelected({});
  };

  const handleEdit = async (requestId) => {
    const { data } = await requests.getRequest(requestId);
    if (data) {
      setEdit(true);
      setRequestSelected(data);
      toggleRequestModal(true);
    } else {
      openErrorNotification('Can\'t find request', 'Request');
    }
  };

  const toggleGroupModal = () => { setGroupModal(!groupModal); };

  const handleDeleteRequest = async (requestId) => {
    // TODO add a confirm
    const { data } = await requests.deleteRequest(requestId);
    if (data.status) {
      openSuccessNotification('Request deleted successfully', 'Request');
      getGroups();
    } else {
      openErrorNotification('Can\'t delete request.', 'Request');
    }
  };

  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (searchValue) {
      const newGroups = groups.filter((group) => group.name.includes(searchValue));
      setGroups(newGroups);
    } else {
      getGroups();
    }
  }, [searchValue]);

  const [groupSelected, setGroupSelected] = useState({});

  const newGroup = () => {
    setEdit(false);
    setGroupSelected({});
    toggleGroupModal();
  };

  const editGroup = (groupId) => {
    const group = groups.find((g) => g.id === groupId);
    setEdit(true);
    setGroupSelected(group);
    toggleGroupModal();
  };

  const deleteGroup = async (groupId) => {
    const { data } = await requests.deleteGroup(groupId);
    if (data.status) {
      openSuccessNotification('Group deleted successfully', 'Group');
      getGroups();
    }
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
                    <Input className="w-50" placeholder="Search" type="text" onChange={(e) => setSearchValue(e.target.value)} />
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
                  onClick={() => createRequest()}
                  className="btn-icon"
                  color="primary"
                  type="button"
                >
                  <span>
                    <i className="fa fa-send" />
                  </span>
                  <span className="btn-inner--text">New Request</span>
                </Button>
              </Col>
              <Col>
                <Button
                  onClick={() => { newGroup(); }}
                  className="btn-icon"
                  color="success"
                  type="button"
                  block
                >
                  <span>
                    <i className="fa fa-layer-group" />
                  </span>
                  <span className="btn-inner--text">New Group</span>
                </Button>
              </Col>
            </Row>
            {groups && groups.map((group) => (
              <DefaultCollapse
                key={group.id}
                group={group}
                selectedGroup={selectedGroup}
                toggleGroup={toggleGroup}
                badgeCount={(group.requests && group.requests.length) ? group.requests.length : 0}
                editGroup={editGroup}
                deleteGroup={deleteGroup}
              >
                { group.requests && group.requests.length > 0 && (
                  <DefaultCardList
                    list={group.requests}
                    requestModal={requestModal}
                    edit={handleEdit}
                    remove={handleDeleteRequest}
                  />
                )}
              </DefaultCollapse>
            ))}
          </CardBody>
        </Card>
      </Col>
      <DefaultModal
        isOpen={groupModal}
        title="New Request Group"
        className="default-small-modal"
        toggleModal={setGroupModal}
      >
        <GroupForm
          toggleModal={toggleGroupModal}
          collection={collection}
          getGroups={getGroups}
          groupSelected={groupSelected}
          edit={edit}
        />
      </DefaultModal>
      <DefaultModal
        isOpen={requestModal}
        title={requestModalTitle}
        className="default-small-modal"
        toggleModal={setRequestModal}
      >
        <RequestForm
          toggleModal={toggleRequestModal}
          collection={collection}
          requests={requests}
          getGroups={getGroups}
          requestSelected={requestSelected}
          edit={edit}
        />
      </DefaultModal>
    </>
  );
};

export default RequestsGroup;
