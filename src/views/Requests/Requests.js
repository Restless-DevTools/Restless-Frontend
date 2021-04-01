import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Container,
  FormGroup,
  Row,
} from 'reactstrap';
import Select from 'react-select';
import useApp from '../../contexts/ApplicationContext';
import DefaultHeader from '../../components/DefaultHeader/DefaultHeader';
import DefaultModal from '../../components/DefaultModal/DefaultModal';
import RequestsForm from './RequestsForm';
import RequestsGroup from './RequestsGroup';
import CollectionForm from './CollectionForm';

const Requests = () => {
  const { requests } = useApp();
  const [collection, setCollection] = useState(1);
  const [collectionModal, setCollectionModal] = useState(false);
  const [collections, setCollections] = useState([]);

  const getAllCollections = async () => {
    const { data } = await requests.getAllCollections();

    if (data.length) {
      setCollections(data);
    }
  };

  useEffect(() => {
    getAllCollections();
  }, []);

  return (
    <>
      <DefaultHeader>
        <Col xs="9" sm="9" md="6" lg="3" className="xs-m-0 ml-auto">
          <FormGroup className="m-0">
            <Select
              options={collections}
              onChange={(evt) => setCollection(evt ? evt.value : '')}
              placeholder="Select Collection"
              value={collections
                .filter((opt) => opt.value === collection)}
              name="collection"
              isClearable
            />
          </FormGroup>
        </Col>
        <Col xs="1" sm="1" md="1" lg="1" className="mr-auto">
          <Button
            className="btn-icon"
            color="primary"
            type="button"
            onClick={() => setCollectionModal(!collectionModal)}
          >
            <span>
              <i className="fa fa-plus" />
            </span>
          </Button>
        </Col>
      </DefaultHeader>
      <Container fluid>
        <Row className="mt-5">
          <RequestsForm />
          <RequestsGroup />
        </Row>
      </Container>
      <DefaultModal
        isOpen={collectionModal}
        title="Collection"
        className="default-modal"
        toggleModal={setCollectionModal}
      >
        <CollectionForm />
      </DefaultModal>
    </>
  );
};

export default Requests;
