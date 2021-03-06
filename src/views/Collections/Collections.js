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
import InfiniteScroll from 'react-infinite-scroll-component';
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
  const { openErrorNotification, openSuccessNotification } = useGlobal();
  const [formModal, setFormModal] = useState(false);
  const [filterValue, setFilterValue] = useState('');
  const [activeTab, setActiveTab] = useState('user');
  const [collections, setCollections] = useState([]);
  const [sharedCollections, setSharedCollections] = useState([]);
  const [publicCollections, setPublicCollections] = useState([]);
  const [filteredCollections, setFilteredCollections] = useState([]);
  const [filteredSharedCollections, setFilteredSharedCollections] = useState([]);
  const [filteredPublicCollections, setFilteredPublicCollections] = useState([]);
  const [hasMoreCollections, setHasMoreCollections] = useState(true);
  const [offset, setOffset] = useState(0);
  const [edit, setEdit] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(1);
  const [collectionModalTitle, setCollectionModalTitle] = useState('');

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
      } else {
        setCollections([]);
        setSharedCollections([]);

        setFilteredCollections([]);
        setFilteredSharedCollections([]);
      }
    } catch (error) {
      openErrorNotification('Can not fetch the records in backend.', 'Collections');
    }
  };

  const getAllPublicCollections = async () => {
    if (!hasMoreCollections) {
      return;
    }

    try {
      const { data } = await requests.getPublicCollections(20, offset);

      if (data.rows) {
        let collectionsConcat = [];
        if (offset !== 0) collectionsConcat = collectionsConcat.concat(publicCollections);
        collectionsConcat = collectionsConcat.concat(data.rows);

        setPublicCollections(collectionsConcat);
        setFilteredPublicCollections(collectionsConcat);
        setHasMoreCollections(data.rows.length < data.count);
        setOffset(offset + data.rows.length);
      }
    } catch (error) {
      console.log(error);
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

  const toggleCollectionModal = (shouldEdit) => {
    if (!shouldEdit) {
      setSelectedCollection(null);
    }

    setCollectionModalTitle(shouldEdit ? 'Edit Collection' : 'New Collection');
    setFormModal(!formModal);
  };

  const handleEdit = async (collectionId) => {
    const collection = collections.find((c) => c.id === collectionId);

    if (collection) {
      setEdit(true);
      setSelectedCollection(collection);
      toggleCollectionModal(true);
    } else {
      openErrorNotification('Can\'t find request', 'Request');
    }
  };

  const handleDelete = async (collectionId) => {
    const { data } = await requests.deleteCollection(collectionId);
    if (data.status) {
      openSuccessNotification('Collection deleted successfully', 'Collection');
      getAllCollections();
    } else {
      openErrorNotification('Can\'t delete collection.', 'Collection');
    }
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
            onClick={() => toggleCollectionModal(false)}
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
        <Row className="mt-5 mb-4">
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
                  My Collections
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
            <FormGroup className="navbar-search navbar-search-dark mb-0">
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
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    canEdit
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
              {(filteredPublicCollections.length > 0) ? (
                <InfiniteScroll
                  style={{ overflow: 'visible' }}
                  dataLength={publicCollections.length}
                  next={getAllPublicCollections}
                  hasMore={hasMoreCollections}
                  loader={(
                    <div className="text-center text-white">
                      <i className="fas fa-circle-notch fa-spin" />
                      <p>
                        <b>Loading</b>
                      </p>
                    </div>
                  )}
                  endMessage={(
                    <div className="text-center text-white">
                      <i className="fas fa-check-circle" />
                      <p>
                        <b>Yay! You have seen it all</b>
                      </p>
                    </div>
                )}
                >
                  <div className="collections">
                    {filteredPublicCollections.map((collection) => (
                      <CollectionCard
                        key={collection.id}
                        collection={collection}
                        handleOpenCollection={handleOpenCollection}
                      />
                    ))}
                  </div>
                </InfiniteScroll>
              ) : (<DefaultEmptySearch />)}
            </Row>
          </TabPane>
        </TabContent>
        <DefaultModal
          isOpen={formModal}
          title={collectionModalTitle}
          className="default-small-modal"
          toggleModal={setFormModal}
        >
          <CollectionForm
            toggleModal={toggleModal}
            loadData={getAllCollections}
            collection={selectedCollection}
            edit={edit}
          />
        </DefaultModal>
      </Container>
    </>
  );
};

export default Collections;
