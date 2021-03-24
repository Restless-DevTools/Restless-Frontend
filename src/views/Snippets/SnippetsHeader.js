import React, { useState } from 'react';
import {
  Button,
  Col, Container, Row,
} from 'reactstrap';
import DefaultModal from '../../components/DefaultModal/DefaultModal';
import SnippetForm from './SnippetForm';
import './styles.css';

const SnippetsHeader = () => {
  const [formModal, setFormModal] = useState(false);

  return (
    <>
      <div className="header bg-default py-3">
        <Container fluid>
          <Row className="align-items-center">
            <Col className="mb-xl-0">
              <Button
                onClick={() => setFormModal(!formModal)}
                color="primary"
                type="button"
              >
                New Snippet
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      <DefaultModal
        isOpen={formModal}
        title="New Snippet"
        className="snippet-modal"
        toggleModal={setFormModal}
      >
        <SnippetForm />
      </DefaultModal>
    </>
  );
};

export default SnippetsHeader;
