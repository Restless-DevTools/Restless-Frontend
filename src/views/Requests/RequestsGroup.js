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
import DefaultCollapse from '../../components/DefaultCollapse/DefaultCollapse';
import DefaultModal from '../../components/DefaultModal/DefaultModal';
import GroupForm from './GroupForm';
import RequestForm from './RequestForm';
import './styles.css';

const RequestsGroup = (props) => {
  const { collection, requests } = props;
  const [groupModal, setGroupModal] = useState(false);
  const [requestModal, setRequestModal] = useState(false);
  const [requestModalTitle, setRequestModalTitle] = useState('');

  const [selectedGroup, setSelectedGroup] = useState(1);

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

  const toggleRequestModal = (edit) => {
    setRequestModalTitle(edit ? 'Request' : 'New Request');
    setRequestModal(!requestModal);
  };

  const handleEdit = () => {
    toggleRequestModal(true);
  };

  const toggleGroupModal = () => { setGroupModal(!groupModal); };

  const handleDelete = () => {
    // TODO
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
                  onClick={() => { toggleRequestModal(); }}
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
                  onClick={() => { toggleGroupModal(); }}
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
              >
                { group.requests && group.requests.length > 0 && (
                  <DefaultCardList
                    list={group.requests}
                    requestModal={requestModal}
                    edit={handleEdit}
                    remove={handleDelete}
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
        className="default-modal"
        toggleModal={setGroupModal}
      >
        <GroupForm
          toggleModal={toggleGroupModal}
          collection={collection}
          getGroups={getGroups}
        />
      </DefaultModal>
      <DefaultModal
        isOpen={requestModal}
        title={requestModalTitle}
        className="default-modal"
        toggleModal={setRequestModal}
      >
        <RequestForm toggleModal={toggleRequestModal} />
      </DefaultModal>
    </>
  );
};

export default RequestsGroup;
