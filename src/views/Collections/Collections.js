import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Container,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from 'reactstrap';
import { InputGroupAddon } from 'reactstrap/lib';
import DefaultEmptySearch from '../../components/DefaultEmptySearch/DefaultEmptySearch';
import DefaultHeader from '../../components/DefaultHeader/DefaultHeader';
import DefaultModal from '../../components/DefaultModal/DefaultModal';
import useApp from '../../contexts/ApplicationContext';
import useGlobal from '../../contexts/GlobalContext';
import CollectionCard from './CollectionCard';
import CollectionForm from './CollectionForm';
import './styles.css';

const Collections = (props) => {
  const { requests } = useApp();
  const { openErrorNotification } = useGlobal();
  const [formModal, setFormModal] = useState(false);
  const [filterValue, setFilterValue] = useState('');
  const [activeTab, setActiveTab] = useState('user');
  const [collections, setCollections] = useState([]);
  const [sharedCollections, setSharedCollections] = useState([]);
  const [publicCollections, setPublicCollections] = useState([]);
  const [filteredCollections, setFilteredCollections] = useState([]);
  const [filteredSharedCollections, setFilteredSharedCollections] = useState([]);
  const [filteredPublicCollections, setFilteredPublicCollections] = useState([]);

  const getAllCollections = async () => {
    try {
      const { data } = await requests.getAllCollections();

      if (data.length) {
        const user = data.filter((collection) => !collection.shared);
        const shared = data.filter((collection) => collection.shared);

        setCollections(user);
        setSharedCollections(shared);

        setFilteredCollections(user);
        setFilteredSharedCollections(shared);
      }
    } catch (error) {
      openErrorNotification('Can not fetch the records in backend.', 'Collections');
    }
  };

  const getAllPublicCollections = async () => {
    try {
      const { data } = await requests.getAllPublicCollections();

      if (data.length) {
        setPublicCollections(data);
        setFilteredPublicCollections(data);
      }
    } catch (error) {
      openErrorNotification('Can not fetch the records in backend.', 'Collections');
    }
  };

  const toggleModal = () => { setFormModal(!formModal); };

  const toggleActiveTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const handleOpenCollection = (collection) => {
    props.history.push({
      pathname: '/dashboard/requests',
      state: { collection },
    });
  };

  useEffect(() => {
    if (filterValue) {
      const dataToFilter = ((activeTab === 'user') && collections)
        || ((activeTab === 'shared') && sharedCollections)
        || ((activeTab === 'explore') && publicCollections);

      const filteredData = dataToFilter.filter((collection) => {
        const valuesToFilter = [];
        valuesToFilter.push(collection.name);
        valuesToFilter.push(collection.description);
        valuesToFilter.push(collection.permissionType);

        return valuesToFilter.join(' ').toLowerCase().includes(filterValue.toLocaleLowerCase());
      });

      if (activeTab === 'user') {
        setFilteredCollections(filteredData);
      } else if (activeTab === 'shared') {
        setFilteredSharedCollections(filteredData);
      } else if (activeTab === 'explore') {
        setFilteredPublicCollections(filteredData);
      }
    } else if (activeTab === 'user') {
      setFilteredCollections(collections);
    } else if (activeTab === 'shared') {
      setFilteredSharedCollections(sharedCollections);
    } else if (activeTab === 'explore') {
      setFilteredPublicCollections(publicCollections);
    }
  }, [filterValue]);

  useEffect(() => {
    if (activeTab === 'user' || activeTab === 'shared') {
      getAllCollections();
    }

    if (activeTab === 'explore') {
      getAllPublicCollections();
    }
  }, [activeTab]);

  return (
    <>
      <DefaultHeader>
        <Col className="mb-xl-0">
          <Button
            onClick={() => setFormModal(!formModal)}
            color="primary"
            type="button"
          >
            <i className="fas fa-bars" />
            {' '}
            New Collection
          </Button>
        </Col>
      </DefaultHeader>
      <Container fluid>
        <Row className="mt-5">
          <Col sm="8" md="8" lg="8" xl="9">
            <Nav>
              <NavItem className="h2">
                <NavLink
                  onClick={() => { toggleActiveTab('user'); }}
                  className={`pl-0 ${activeTab === 'user' ? 'text-primary' : 'text-secondary'}`}
                  style={{
                    pointerEvents: activeTab === 'user' && 'none',
                    cursor: activeTab !== 'user' && 'pointer',
                  }}
                >
                  Your Collections
                </NavLink>
              </NavItem>
              <NavItem className="h2">
                <NavLink
                  onClick={() => { toggleActiveTab('shared'); }}
                  className={`${activeTab === 'shared' ? 'text-primary' : 'text-secondary'}`}
                  style={{
                    pointerEvents: activeTab === 'shared' && 'none',
                    cursor: activeTab !== 'shared' && 'pointer',
                  }}
                >
                  Shared With Me
                </NavLink>
              </NavItem>
              <NavItem className="h2">
                <NavLink
                  onClick={() => { toggleActiveTab('explore'); }}
                  className={`${activeTab === 'explore' ? 'text-primary' : 'text-secondary'}`}
                  style={{
                    pointerEvents: activeTab === 'explore' && 'none',
                    cursor: activeTab !== 'explore' && 'pointer',
                  }}
                >
                  Explore
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col sm="4" md="4" lg="4" xl="3">
            <FormGroup className="navbar-search navbar-search-dark">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fa fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  className="w-50"
                  type="text"
                  placeholder="Search"
                  value={filterValue}
                  onChange={(evt) => { setFilterValue(evt.target.value); }}
                />
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="user">
            <Row>
              {(filteredCollections.length > 0)
                ? filteredCollections.map((collection) => (
                  <CollectionCard
                    key={collection.id}
                    collection={collection}
                    handleOpenCollection={handleOpenCollection}
                  />
                ))
                : (<DefaultEmptySearch />)}
            </Row>
          </TabPane>
          <TabPane tabId="shared">
            <Row>
              {(filteredSharedCollections.length > 0)
                ? filteredSharedCollections.map((collection) => (
                  <CollectionCard
                    key={collection.id}
                    collection={collection}
                    handleOpenCollection={handleOpenCollection}
                  />
                ))
                : (<DefaultEmptySearch />)}
            </Row>
          </TabPane>
          <TabPane tabId="explore">
            <Row>
              {(filteredPublicCollections.length > 0)
                ? filteredPublicCollections.map((collection) => (
                  <CollectionCard
                    key={collection.id}
                    collection={collection}
                    handleOpenCollection={handleOpenCollection}
                  />
                ))
                : (<DefaultEmptySearch />)}
            </Row>
          </TabPane>
        </TabContent>
        <DefaultModal
          isOpen={formModal}
          title="New Collection"
          className="default-small-modal"
          toggleModal={setFormModal}
        >
          <CollectionForm toggleModal={toggleModal} loadData={getAllCollections} />
        </DefaultModal>
      </Container>
    </>
  );
};

export default Collections;
