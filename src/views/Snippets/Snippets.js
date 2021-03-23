import React, { useState } from 'react';
import {
  Card, Col, Container, Row, Button,
} from 'reactstrap';
import SnippetForm from './SnippetForm';
import DefaultModal from '../../components/DefaultModal/DefaultModal';
import './styles.css';

function Snippets() {
  const [formModal, setFormModal] = useState(false);

  console.log(formModal);
  return (
    <Container className="pt-8" fluid>
      <Row>
        <Col className="mb-5 mb-xl-0">
          <Card className="shadow" />
          <Button onClick={() => setFormModal(!formModal)}>New Snippet</Button>
          <DefaultModal
            isOpen={formModal}
            title="New Snippet"
            className="snippet-modal"
            toggleModal={setFormModal}
          >
            <SnippetForm />
          </DefaultModal>
        </Col>
      </Row>
    </Container>
  );
}

export default Snippets;
