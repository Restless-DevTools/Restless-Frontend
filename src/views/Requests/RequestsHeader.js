import React, { useState } from 'react';
import Select from 'react-select';
import {
  Button,
  Col, Container, FormGroup, Row,
} from 'reactstrap';
import DefaultModal from '../../components/DefaultModal/DefaultModal';
import CollectionForm from './CollectionForm';
import './styles.css';

const RequestsHeader = () => {
  const [collection, setCollection] = useState(1);
  const [collectionModal, setCollectionModal] = useState(false);

  const [collections] = useState([
    { label: 'Coleção 1', value: 1 },
    { label: 'Coleção 2', value: 2 },
  ]);

  return (
    <>
      <div className="header bg-default py-3">
        <Container fluid>
          <Row className="align-items-center">
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
          </Row>
        </Container>
      </div>
      <DefaultModal
        isOpen={collectionModal}
        title="New Collection"
        className="default-modal"
        toggleModal={setCollectionModal}
      >
        <CollectionForm />
      </DefaultModal>
    </>
  );
};

export default RequestsHeader;
