import React from 'react';
import {
  Col, Card,
} from 'reactstrap';
import SnippetForm from './SnippetForm';
import './styles.css';

function Snippets() {
  return (
    <main>
      <section className="section">
        <Col md="12">
          <Card>
            <h1 className="display-4 view-tittle">Snippets</h1>
            <SnippetForm />
          </Card>
        </Col>
      </section>
    </main>
  );
}

export default Snippets;
