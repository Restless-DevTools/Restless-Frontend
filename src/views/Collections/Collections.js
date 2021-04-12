import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Container,
  Row,
} from 'reactstrap';
import DefaultHeader from '../../components/DefaultHeader/DefaultHeader';
import DefaultModal from '../../components/DefaultModal/DefaultModal';
import useApp from '../../contexts/ApplicationContext';
import CollectionCard from './CollectionCard';
import CollectionForm from './CollectionForm';
import './styles.css';

const Collections = (props) => {
  const { requests } = useApp();
  const [formModal, setFormModal] = useState(false);
  const [collections, setCollections] = useState([]);

  const getAllCollections = async () => {
    const { data } = await requests.getAllCollections();

    if (data.length) {
      setCollections(data);
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
          <Col md="12">
            <h2 className="text-secondary">Collections</h2>
          </Col>
          {collections.map((collection) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              handleOpenCollection={handleOpenCollection}
            />
          ))}
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
