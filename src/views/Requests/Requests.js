import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import {
  Button,
  Col,
  Container,
  FormGroup,
  Row,
} from 'reactstrap';
import useGlobal from '../../contexts/GlobalContext';
import DefaultHeader from '../../components/DefaultHeader/DefaultHeader';
import DefaultModal from '../../components/DefaultModal/DefaultModal';
import useApp from '../../contexts/ApplicationContext';
import CollectionForm from '../Collections/CollectionForm';
import RequestsForm from './RequestsForm';
import RequestsGroup from './RequestsGroup';

const Requests = (props) => {
  const { requests } = useApp();
  const { openErrorNotification } = useGlobal();
  const [collection, setCollection] = useState();
  const [formModal, setFormModal] = useState(false);
  const [collections, setCollections] = useState([]);

  const getAllCollections = async () => {
    try {
      const { data } = await requests.getAllCollections();

      if (data.length) {
        setCollections(data);
      }
    } catch (error) {
      openErrorNotification('Can not fetch the records in backend.', 'Collections');
    }
  };

  const toggleModal = () => { setFormModal(!formModal); };

  const handleSelectChange = (value) => {
    setCollection(value);
  };

  useEffect(() => {
    getAllCollections();
  }, []);

  useEffect(() => {
    const { state } = props.location;

    if (state && state.collection) {
      const { collection: selectedCollection } = state;
      handleSelectChange(selectedCollection);
    }
  }, [props.location]);

  return (
    <>
      <DefaultHeader>
        <Col xs="9" sm="9" md="6" lg="3" className="xs-m-0 ml-auto">
          <FormGroup className="m-0">
            <Select
              options={collections}
              getOptionLabel={(col) => col.name}
              getOptionValue={(col) => col.id}
              onChange={handleSelectChange}
              placeholder="Select collection"
              defaultValue={collection}
              value={collection}
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
            onClick={() => { toggleModal(); }}
          >
            <span>
              <i className="fa fa-plus" />
            </span>
          </Button>
        </Col>
      </DefaultHeader>
      <Container fluid>
        <Row className="mt-5">
          <RequestsForm collection={collection} requests={requests} />
          <RequestsGroup collection={collection} requests={requests} />
        </Row>
      </Container>
      <DefaultModal
        isOpen={formModal}
        title="New Collection"
        className="default-modal"
        toggleModal={setFormModal}
      >
        <CollectionForm toggleModal={toggleModal} />
      </DefaultModal>
    </>
  );
};

export default Requests;
