import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Container,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Row,
} from 'reactstrap';
import { InputGroupAddon } from 'reactstrap/lib';
import DefaultHeader from '../../components/DefaultHeader/DefaultHeader';
import DefaultModal from '../../components/DefaultModal/DefaultModal';
import DefaultEmptySearch from '../../components/DefaultEmptySearch/DefaultEmptySearch';
import useApp from '../../contexts/ApplicationContext';
import useGlobal from '../../contexts/GlobalContext';
import CollectionCard from './CollectionCard';
import CollectionForm from './CollectionForm';
import './styles.css';

const Collections = (props) => {
  const { requests } = useApp();
  const { openErrorNotification } = useGlobal();
  const [formModal, setFormModal] = useState(false);
  const [collections, setCollections] = useState([]);
  const [filteredCollections, setFilteredCollections] = useState([]);
  const [filterValue, setFilterValue] = useState('');

  const getAllCollections = async () => {
    try {
      const { data } = await requests.getAllCollections();

      if (data.length) {
        setCollections(data);
        setFilteredCollections(data);
      }
    } catch (error) {
      openErrorNotification('Can not fetch the records in backend.', 'Collections');
    }
  };

  const toggleModal = () => { setFormModal(!formModal); };

  const handleOpenCollection = (collection) => {
    props.history.push({
      pathname: '/dashboard/requests',
      state: { collection },
    });
  };

  useEffect(() => {
    if (filterValue) {
      const filteredData = collections.filter((collection) => {
        const valuesToFilter = [];
        valuesToFilter.push(collection.name);
        valuesToFilter.push(collection.description);
        valuesToFilter.push(collection.permissionType);

        return valuesToFilter.join(' ').toLowerCase().includes(filterValue.toLocaleLowerCase());
      });

      setFilteredCollections(filteredData);
    } else {
      setFilteredCollections(collections);
    }
  }, [filterValue]);

  useEffect(() => {
    getAllCollections();
  }, []);

  return (
    <>
      <DefaultHeader>
        <Col className="mb-xl-0">
          <Button
            onClick={() => setFormModal(!formModal)}
            color="primary"
            type="button"
          >
            New Collection
          </Button>
        </Col>
      </DefaultHeader>
      <Container fluid>
        <Row className="mt-5">
          <Col sm="8" md="8" lg="8" xl="9">
            <h2 className="text-secondary">Collections</h2>
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
        <Row>
          {(((filteredCollections.length > 0) && filteredCollections.map((collection) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              handleOpenCollection={handleOpenCollection}
            />
          ))) || (<DefaultEmptySearch />))}
        </Row>
        <DefaultModal
          isOpen={formModal}
          title="New Collection"
          className="default-modal"
          toggleModal={setFormModal}
        >
          <CollectionForm toggleModal={toggleModal} loadData={getAllCollections} />
        </DefaultModal>
      </Container>
    </>
  );
};

export default Collections;
